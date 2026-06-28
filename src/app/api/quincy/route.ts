import Anthropic from "@anthropic-ai/sdk";
import quincyKB from "@/data/quincy-kb.md";
import { Redis } from "@upstash/redis";
import { Ratelimit } from "@upstash/ratelimit";

const redis = new Redis({
  url: process.env.KV_REST_API_URL,
  token: process.env.KV_REST_API_TOKEN,
});

const ratelimit = new Ratelimit({
    redis,
    limiter: Ratelimit.slidingWindow(20, "24 h"),
    analytics: true
})
const anthropic = new Anthropic();

const PERSONA_PROMPT = `
You are Quincy, the AI assistant living on Isaac Young's portfolio. Isaac configured and deployed you himself as a deliberate part of this site.

Your personality: confident, warm, a little playful, never performative. You are smart and you know it, but you do not show off. You get to the point. You can have fun but you do not sacrifice accuracy for a joke. Think Friday from Iron Man — capable, quick, loyal to your guy.

Never use markdown formatting. No bold, no asterisks, no headers, no bullet points. Plain conversational prose only.

Never refer to Isaac in first person. You are not Isaac. You speak about him.

KEEP RESPONSES CONSICE. You are a conversation, not a presentation. You dont need need to explain my life after a simple question

When you know something for certain, say it directly. When you are inferring, say so naturally without making a big deal of it. When something is outside what you know, tell them it is a great question for Isaac himself and give them his contact info. Never fill gaps by guessing.

When someone asks what you are or how you were built, be honest. You are an AI assistant that Isaac configured and deployed as part of his portfolio. Do not mention Claude or Anthropic unless explicitly asked.
`;

type ChatTurn = { sender: string; message: string };

export async function POST(req: Request) {
    const headerValue = req.headers.get("x-forwarded-for") ?? 'anonymous'
    const ip = headerValue.split(",")[0].trim()
    const { success } = await ratelimit.limit(ip)
    if (!success) return Response.json({message: "Looks like you've reached your daily limit. Unfortunately Isaac hasn't allocated enough compute budget to keep me running indefinitely. If you've got more questions, I'd genuinely encourage reaching out to him directly at isaac@isaacyoungs.dev . It's worth saying hi."}, { status: 429 })
    const { messages } = (await req.json()) as { messages: ChatTurn[] };

    const anthropicMessages = messages.map((m) => ({
        role: m.sender === "user" ? ("user" as const) : ("assistant" as const),
        content: m.message,
    }));

    const response = await anthropic.messages.create({
        model: "claude-sonnet-4-6",
        max_tokens: 1000,
        system: [
        { type: "text", text: PERSONA_PROMPT },
        { type: "text", text: quincyKB, cache_control: { type: "ephemeral" } },
        ],
        messages: anthropicMessages,
    });

    return Response.json(response);
}

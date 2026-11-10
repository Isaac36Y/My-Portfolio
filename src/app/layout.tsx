import type { Metadata } from "next";
import { DM_Sans, Courier_Prime, Space_Grotesk } from "next/font/google";
import "@/styles/globals.scss";
import "@/styles/view-transitions.scss";
import { Analytics } from "@vercel/analytics/next"
import { revisitScript } from "@/components/experience/firstVisit";
import { introScript } from "@/components/experience/intro";
import RouteWarmup from "@/components/experience/RouteWarmup";


const dmSans = DM_Sans({
  variable: "--font-dm-sans",
  weight: ['400', '600', '700'],
  subsets: ["latin"],
});

const courierPrime = Courier_Prime({
  variable: "--font-courier-prime",
  weight: ['400'],
  subsets: ["latin"],
  display: 'swap',
});

const spaceGrotesk = Space_Grotesk({
    variable: "--font-space-grotesk",
    weight: ['400', '600', '700'],
    subsets: ["latin"],
    display: 'swap',
})

// Runs synchronously before first paint so the correct palette is applied
// during the initial render instead of after hydration, which caused a
// light-to-dark flash on load.
const themeScript = `(function(){try{document.documentElement.dataset.theme=window.matchMedia('(prefers-color-scheme: dark)').matches?'dark':'light'}catch(e){document.documentElement.dataset.theme='light'}})()`;

const title = "Isaac Young | Websites, Custom Tools & SEO in Medford, OR";
const description =
  "Freelance developer in Medford, Oregon. I build websites and custom tools for small businesses, plus the SEO and AI search visibility to get them found.";

export const metadata: Metadata = {
  metadataBase: new URL("https://isaacyoungs.dev"),
  alternates: { canonical: "/" },
  title: {
    default: title,
    template: "%s | Younger Systems",
  },
  description,
  applicationName: "Younger Systems",
  authors: [{ name: "Isaac Young", url: "https://isaacyoungs.dev" }],
  creator: "Isaac Young",
  publisher: "Younger Systems",
  openGraph: {
    type: "website",
    url: "https://isaacyoungs.dev",
    siteName: "Younger Systems",
    title,
    description,
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title,
    description,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  other: {
    "msvalidate.01": "F2DB780D905F46FF1502F659917ECC53",
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode;}>) {
  return (
    <html lang="en" suppressHydrationWarning className={`${spaceGrotesk.variable} ${courierPrime.variable} ${dmSans.variable}`}>
        <head>
            <script dangerouslySetInnerHTML={{ __html: themeScript }} />
            <script dangerouslySetInnerHTML={{ __html: introScript }} />
            <script dangerouslySetInnerHTML={{ __html: revisitScript }} />
        </head>
        <Analytics />
        <body>
            {children}
            <RouteWarmup />
        </body>
    </html>
  );
}

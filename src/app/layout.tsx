import type { Metadata } from "next";
import { DM_Sans, Courier_Prime, Space_Grotesk } from "next/font/google";
import "@/styles/globals.scss";
import { ThemeProvider } from "@/components/NavLogic/Provider";
import { Analytics } from "@vercel/analytics/next"


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

export const metadata: Metadata = {
  title: "Isaac Young - Developer",
  description: "Self taught",
  other: {
    'msvalidate.01': "F2DB780D905F46FF1502F659917ECC53",
  }
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode;}>) {
  return (
    <ThemeProvider>
        <html lang="en" suppressHydrationWarning className={`${spaceGrotesk.variable} ${courierPrime.variable} ${dmSans.variable}`}>
            <head>
                <script dangerouslySetInnerHTML={{ __html: themeScript }} />
            </head>
            <Analytics />
            <body>{children}</body>
        </html>
    </ThemeProvider>
  );
}

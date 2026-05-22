import type { Metadata } from "next";
import { DM_Sans, Courier_Prime, Space_Grotesk } from "next/font/google";
import "@/styles/globals.scss";


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

export const metadata: Metadata = {
  title: "Isaac Young - Developer",
  description: "Self taught",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${spaceGrotesk.variable} ${courierPrime.variable} ${dmSans.variable}`}>
      <body>{children}</body>
    </html>
  );
}

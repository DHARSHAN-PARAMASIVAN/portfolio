import type { Metadata } from "next";
import { Syne, DM_Sans } from "next/font/google";
import "./globals.css";
import { site } from "@/lib/site";

const display = Syne({
  subsets: ["latin"],
  variable: "--font-syne",
  weight: ["500", "600", "700", "800"],
});

const body = DM_Sans({
  subsets: ["latin"],
  variable: "--font-dm",
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: `${site.name} — Full-Stack · QA · API Security`,
  description:
    "Professional portfolio of Dharshan Paramasivan — full-stack engineering, QA automation, and API security.",
  metadataBase: new URL("https://dharshan-paramasivan.github.io/portfolio"),
  openGraph: {
    title: `${site.name} — Full-Stack · QA · API Security`,
    description: site.tagline,
    type: "website",
    images: ["/images/portrait-editorial.png"],
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${display.variable} ${body.variable}`}>
      <body className="bg-paper font-sans text-ink antialiased">{children}</body>
    </html>
  );
}

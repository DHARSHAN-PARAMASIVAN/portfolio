import type { Metadata } from "next";
import { Archivo_Black, Space_Grotesk } from "next/font/google";
import "./globals.css";
import { site } from "@/lib/site";

const display = Archivo_Black({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-archivo",
});

const body = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-grotesk",
});

export const metadata: Metadata = {
  title: `${site.name} — Build · Verify · Secure · Ship`,
  description:
    "Immersive portfolio of Dharshan Paramasivan — Full-Stack Engineer, QA Automation, and API Security.",
  metadataBase: new URL("https://dharshan-paramasivan.github.io/portfolio"),
  openGraph: {
    title: `${site.name} — Build · Verify · Secure · Ship`,
    description:
      "Full-stack systems, QA automation, and API security — presented as a personal brand experience.",
    type: "website",
    images: ["/images/hero-portrait.png"],
  },
  twitter: {
    card: "summary_large_image",
    title: site.name,
    description: site.tagline,
    images: ["/images/hero-portrait.png"],
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${display.variable} ${body.variable}`}>
      <body className="bg-bg font-sans text-ink antialiased">
        <div className="grain" aria-hidden />
        {children}
      </body>
    </html>
  );
}

import type { Metadata } from "next";
import { Instrument_Serif, Sora, IBM_Plex_Mono } from "next/font/google";
import "./globals.css";
import { site } from "@/lib/site";
import { ThemeProvider } from "@/components/ThemeProvider";

const display = Instrument_Serif({
  subsets: ["latin"],
  variable: "--font-serif",
  weight: "400",
  style: ["normal", "italic"],
});

const body = Sora({
  subsets: ["latin"],
  variable: "--font-body",
  weight: ["400", "500", "600", "700"],
});

const mono = IBM_Plex_Mono({
  subsets: ["latin"],
  variable: "--font-mono-face",
  weight: ["400", "500"],
});

export const metadata: Metadata = {
  title: `${site.name} — Signal Sheet`,
  description:
    "Field notes from Dharshan Paramasivan: full-stack systems, QA automation, and API security.",
  metadataBase: new URL("https://dharshan-paramasivan.github.io/portfolio"),
  openGraph: {
    title: `${site.name} — Build · Verify · Secure · Ship`,
    description: site.tagline,
    type: "website",
    images: ["/images/portrait-facing.png"],
  },
};

const themeInit = `
(() => {
  try {
    const stored = localStorage.getItem('dp-theme');
    const theme = stored || (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
    if (theme === 'dark') document.documentElement.classList.add('dark');
    document.documentElement.style.colorScheme = theme;
  } catch (_) {}
})();
`;

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en"
      className={`${display.variable} ${body.variable} ${mono.variable}`}
      suppressHydrationWarning
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeInit }} />
      </head>
      <body className="bg-paper font-sans text-ink antialiased">
        <ThemeProvider>{children}</ThemeProvider>
      </body>
    </html>
  );
}

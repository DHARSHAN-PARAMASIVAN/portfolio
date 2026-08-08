import type { Metadata } from "next";
import { Syne, DM_Sans } from "next/font/google";
import "./globals.css";
import { site } from "@/lib/site";
import { ThemeProvider } from "@/components/ThemeProvider";

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
    <html lang="en" className={`${display.variable} ${body.variable}`} suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeInit }} />
      </head>
      <body className="bg-paper font-sans text-ink antialiased">
        <ThemeProvider>{children}</ThemeProvider>
      </body>
    </html>
  );
}

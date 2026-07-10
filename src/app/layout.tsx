import type { Metadata } from "next";
import { Playfair_Display, Inter } from "next/font/google";
import "./globals.css";
import SmoothScroll from "@/components/layout/SmoothScroll";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";

const playfair = Playfair_Display({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  style: ["normal", "italic"],
  variable: "--font-display",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-text",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://myjourneyinc.org"),
  title: "My Journey Inc. · Discover Purpose. Develop Capacity. Transform Society.",
  description:
    "My Journey Inc. raises young people who think clearly, lead responsibly, and grow spiritually, through reading, discipleship, mentorship, and hands-on service. 650+ active readers across 5 chapters in Nigeria.",
  openGraph: {
    title: "My Journey Inc. · Purpose isn't found. It's built.",
    description:
      "A youth leadership movement across Nigeria. Book Club, Discipleship, Outreach, ages 11–30.",
    url: "https://myjourneyinc.org",
    siteName: "My Journey Inc.",
    locale: "en_NG",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        {/* Reveal-from-hidden only applies once JS is confirmed present. */}
        <script
          dangerouslySetInnerHTML={{
            __html: `document.documentElement.classList.add('js')`,
          }}
        />
      </head>
      <body className={`${playfair.variable} ${inter.variable} font-text`}>
        <SmoothScroll />
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:bg-ink focus:px-4 focus:py-2 focus:text-paper"
        >
          Skip to content
        </a>
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  );
}

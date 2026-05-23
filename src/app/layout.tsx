import type { Metadata, Viewport } from "next";
import Script from "next/script";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
  preload: true,
});

const GA_ID = "G-CEJKBYXCSB";

export const metadata: Metadata = {
  title: "Shehwar Ahmad | Portfolio",
  description:
    "I create scalable web apps with expertise in various languages and frameworks. My solutions are efficient, user-friendly, and up-to-date with industry trends. Explore my experience and projects.",
  metadataBase: new URL("https://shehwar-ahmad.github.io"),
  openGraph: {
    type: "website",
    title: "Shehwar Ahmad | Portfolio",
    description:
      "I create scalable web apps with expertise in various languages and frameworks. My solutions are efficient, user-friendly, and up-to-date with industry trends. Explore my experience and projects.",
    url: "https://shehwar-ahmad.github.io",
    siteName: "Shehwar Ahmad",
  },
  twitter: {
    card: "summary_large_image",
    title: "Shehwar Ahmad | Portfolio",
    description: "I create scalable web apps with expertise in various languages and frameworks.",
  },
};

export const viewport: Viewport = {
  themeColor: "#635bff",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={inter.variable}>
      <head>
        <link rel="preconnect" href="https://www.googletagmanager.com" />
      </head>
      <body>
        {children}
        <Script
          src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`}
          strategy="afterInteractive"
        />
        <Script id="ga-init" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${GA_ID}');
          `}
        </Script>
      </body>
    </html>
  );
}

import type { ReactNode } from "react";
import type { Metadata, Viewport } from "next";
import { Toaster } from "sonner";
import ChatWidget from "@/components/ChatWidget";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL || "https://thaddeus-portfolio.onrender.com",
  ),
  title: {
    default: "Thaddeus Tagoe — Software Developer, Digital Forensic Analyst & AI Prompt Engineer",
    template: "%s · Thaddeus Tagoe",
  },
  description:
    "Thaddeus Nii Teiko Tagoe — Software Developer, Digital Forensic Analyst and AI Prompt Engineer. Full-stack products, autonomous AI agents and digital forensics. University of Ghana · ThaddeusTechz.",
  keywords: [
    "Thaddeus Tagoe",
    "software developer",
    "AI prompt engineer",
    "digital forensic analyst",
    "full-stack",
    "Next.js",
    "OpenRouter",
    "University of Ghana",
  ],
  openGraph: {
    title: "Thaddeus Tagoe — Portfolio",
    description:
      "Software Developer, Digital Forensic Analyst & AI Prompt Engineer. Full-stack products and autonomous AI agents.",
    type: "website",
    siteName: "Thaddeus Tagoe",
  },
  icons: { icon: "/icon.svg" },
};

export const viewport: Viewport = {
  themeColor: "#060607",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" className="grain">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600&family=Space+Grotesk:wght@400;500;600;700&family=JetBrains+Mono:wght@400;500;600&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>
        {children}
        <Toaster
          position="bottom-right"
          toastOptions={{
            style: {
              background: "#0e0e11",
              border: "1px solid rgba(255,255,255,0.1)",
              color: "#f4f4f1",
            },
          }}
        />
        <ChatWidget />
      </body>
    </html>
  );
}

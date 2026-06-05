import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import "./globals.css";
import SplashScreen from "@/components/SplashScreen";
import InstallPrompt from "@/components/InstallPrompt";
import NextTopLoader from "nextjs-toploader";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
  weight: ["300", "400", "500", "600", "700", "800"],
});

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
  display: "swap",
  weight: ["400", "500", "600", "700", "800", "900"],
});

export const metadata: Metadata = {
  title: "Naheed & Sons | Design & Construction Company",
  description:
    "Naheed & Sons is a full-service design & construction company specializing in premium construction, architecture, interior design, and exterior finishing. Est. 2001.",
  keywords: ["construction company", "interior design", "exterior finishing", "Naheed & Sons", "building contractor"],
  manifest: "/manifest.json",
  icons: {
    icon: "/ns-logo.png",
    apple: "/ns-logo.png",
  },
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: "Naheed & Sons",
  },
  openGraph: {
    title: "Naheed & Sons | Design & Construction Company",
    description:
      "Full-service design & construction firm delivering landmark structures, bespoke interiors, and architectural masterworks — from ground-breaking to key handover.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body
        className={`${inter.variable} ${playfair.variable} font-sans antialiased overflow-x-hidden`}
      >
        <NextTopLoader color="#C8860A" showSpinner={false} />
        <InstallPrompt />
        <SplashScreen />
        {children}
      </body>
    </html>
  );
}

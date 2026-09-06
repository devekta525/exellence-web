import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { ModalProvider } from "@/context/ModalContext";
import ContactModal from "@/components/ContactModal";
import TrackingScripts from "@/components/TrackingScripts";

export const metadata: Metadata = {
  title: "Dviora | Performance-Driven Meta Ads Management",
  description: "Dviora specializes in Meta Ads management for growth-focused brands spending serious budgets. Advanced media buying, scaling systems, and performance-driven execution.",
  openGraph: {
    title: "Dviora | Performance-Driven Meta Ads Management",
    description: "Dviora specializes in Meta Ads management for growth-focused brands spending serious budgets.",
    url: "https://dviora.com",
    siteName: "Dviora",
    images: [
      {
        url: "/logo-2.png",
        width: 800,
        height: 600,
        alt: "Dviora Logo",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Dviora | Performance-Driven Meta Ads Management",
    description: "Dviora specializes in Meta Ads management for growth-focused brands spending serious budgets.",
    images: ["/logo-2.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <head>
        <TrackingScripts />
      </head>
      <body
        className={`antialiased bg-background text-foreground font-sans`}
      >
        <ModalProvider>
          <Navbar />
          {children}
          <ContactModal />
          <Footer />
        </ModalProvider>
      </body>
    </html>
  );
}

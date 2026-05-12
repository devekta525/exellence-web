import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { ModalProvider } from "@/context/ModalContext";
import ContactModal from "@/components/ContactModal";

export const metadata: Metadata = {
  title: "Dviora Web | Personal Portfolio",
  description: "A premium, minimal, dark-themed personal portfolio showcasing scroll-driven storytelling.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
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

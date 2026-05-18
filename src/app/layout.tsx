import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { ModalProvider } from "@/context/ModalContext";
import ContactModal from "@/components/ContactModal";

export const metadata: Metadata = {
  title: "Dviora | Performance-Driven Meta Ads Management",
  description: "Dviora specializes in Meta Ads management for growth-focused brands spending serious budgets. Advanced media buying, scaling systems, and performance-driven execution.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
              new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
              j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
              'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
              })(window,document,'script','dataLayer','GTM-NP89TC9W');
            `,
          }}
        />
      </head>
      <body
        className={`antialiased bg-background text-foreground font-sans`}
      >
        <noscript>
          <iframe
            src="https://www.googletagmanager.com/ns.html?id=GTM-NP89TC9W"
            height="0"
            width="0"
            style={{ display: "none", visibility: "hidden" }}
          />
        </noscript>
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

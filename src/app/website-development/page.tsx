import React from "react";
import WebsiteDevelopmentClient from "./WebsiteDevelopmentClient";

export const metadata = {
  metadataBase: new URL("https://dviora.com"),
  title: "Website Development & Engineering Services | Dviora",
  description: "Dviora designs and engineers high-performance web applications using Next.js, React, Tailwind CSS, and advanced UI animations. Blazing-fast loading speeds and custom e-commerce setups.",
  keywords: [
    "website development services",
    "custom website design",
    "next.js developer agency",
    "react web development",
    "ecommerce website builder",
    "pune web designers",
    "high performance web engineering",
    "professional website creators",
    "seo optimized website development",
    "dviora web engineering"
  ],
  icons: {
    icon: "/dviora-logo.png",
    shortcut: "/dviora-logo.png",
    apple: "/dviora-logo.png",
  },
  alternates: {
    canonical: "https://dviora.com/website-development",
  },
  openGraph: {
    title: "Website Development & Engineering Services | Dviora",
    description: "Dviora designs and engineers high-performance web applications using Next.js, React, Tailwind CSS, and advanced UI animations. Blazing-fast loading speeds and custom e-commerce setups.",
    url: "https://dviora.com/website-development",
    siteName: "Dviora",
    images: [
      {
        url: "/dviora-logo.png",
        width: 800,
        height: 800,
        alt: "Dviora Logo",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Website Development & Engineering Services | Dviora",
    description: "Dviora designs and engineers high-performance web applications using Next.js, React, Tailwind CSS, and advanced UI animations. Blazing-fast loading speeds and custom e-commerce setups.",
    images: ["/dviora-logo.png"],
  },
};

export default function WebsiteDevelopmentPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Service",
    "name": "Custom Website Development & Web Engineering Services",
    "provider": {
      "@type": "LocalBusiness",
      "name": "Dviora",
      "image": "https://dviora.com/dviora-logo.png",
      "address": {
        "@type": "PostalAddress",
        "addressLocality": "Pune",
        "addressRegion": "Maharashtra",
        "addressCountry": "IN"
      },
      "url": "https://dviora.com"
    },
    "areaServed": "Worldwide",
    "description": "Dviora designs and engineers high-performance web applications using Next.js, React, Tailwind CSS, and advanced UI animations. Blazing-fast loading speeds and custom e-commerce setups.",
    "offers": {
      "@type": "AggregateOffer",
      "priceCurrency": "INR",
      "lowPrice": "10000",
      "highPrice": "25000",
      "offerCount": "2"
    }
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <WebsiteDevelopmentClient />
    </>
  );
}

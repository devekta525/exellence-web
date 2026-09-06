"use client";

import React, { useEffect, useState } from "react";
import Script from "next/script";

interface ScriptsConfig {
  enabled: boolean;
  gtmId: string;
  gaMeasurementId: string;
  metaPixelId: string;
  linkedinPartnerId: string;
  customHeadScripts: string;
  customBodyScripts: string;
}

export default function TrackingScripts() {
  const [config, setConfig] = useState<ScriptsConfig>({
    enabled: true,
    gtmId: "GTM-NP89TC9W",
    gaMeasurementId: "",
    metaPixelId: "967268962583650",
    linkedinPartnerId: "9941372",
    customHeadScripts: "",
    customBodyScripts: "",
  });

  useEffect(() => {
    fetch("/api/content/scripts")
      .then((res) => res.json())
      .then((data) => {
        if (data) {
          setConfig(data);
        }
      })
      .catch((err) => console.error("Error loading tracking scripts:", err));
  }, []);

  if (!config.enabled) return null;

  return (
    <>
      {/* 1. Google Tag Manager (GTM) */}
      {config.gtmId && (
        <>
          <Script
            id="gtm-script"
            strategy="afterInteractive"
            dangerouslySetInnerHTML={{
              __html: `
                (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
                new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
                j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
                'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
                })(window,document,'script','dataLayer','${config.gtmId}');
              `,
            }}
          />
        </>
      )}

      {/* 2. Google Analytics 4 (GA4) */}
      {config.gaMeasurementId && (
        <>
          <Script
            src={`https://www.googletagmanager.com/gtag/js?id=${config.gaMeasurementId}`}
            strategy="afterInteractive"
          />
          <Script
            id="ga4-script"
            strategy="afterInteractive"
            dangerouslySetInnerHTML={{
              __html: `
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                gtag('js', new Date());
                gtag('config', '${config.gaMeasurementId}');
              `,
            }}
          />
        </>
      )}

      {/* 3. Meta (Facebook) Pixel */}
      {config.metaPixelId && (
        <Script
          id="meta-pixel-script"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              !function(f,b,e,v,n,t,s)
              {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
              n.callMethod.apply(n,arguments):n.queue.push(arguments)};
              if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
              n.queue=[];t=b.createElement(e);t.async=!0;
              t.src=v;s=b.getElementsByTagName(e)[0];
              s.parentNode.insertBefore(t,s)}(window, document,'script',
              'https://connect.facebook.net/en_US/fbevents.js');
              fbq('init', '${config.metaPixelId}');
              fbq('track', 'PageView');
            `,
          }}
        />
      )}

      {/* 4. LinkedIn Partner Insight Tag */}
      {config.linkedinPartnerId && (
        <Script
          id="linkedin-insight-script"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              _linkedin_partner_id = "${config.linkedinPartnerId}";
              window._linkedin_data_partner_ids = window._linkedin_data_partner_ids || [];
              window._linkedin_data_partner_ids.push(_linkedin_partner_id);
              (function(l) {
              if (!l){window.lintrk = function(a,b){window.lintrk.q.push([a,b])};
              window.lintrk.q=[]}
              var s = document.getElementsByTagName("script")[0];
              var b = document.createElement("script");
              b.type = "text/javascript";b.async = true;
              b.src = "https://snap.licdn.com/li.lms-analytics/insight.min.js";
              s.parentNode.insertBefore(b, s);})(window.lintrk);
            `,
          }}
        />
      )}

      {/* 5. Custom Head Scripts */}
      {config.customHeadScripts && (
        <div
          dangerouslySetInnerHTML={{ __html: config.customHeadScripts }}
          style={{ display: "none" }}
        />
      )}

      {/* 6. Custom Body Scripts */}
      {config.customBodyScripts && (
        <div
          dangerouslySetInnerHTML={{ __html: config.customBodyScripts }}
          style={{ display: "none" }}
        />
      )}
    </>
  );
}

import { useEffect } from "react";

export const GoogleAnalytics = () => {
  const gaId = import.meta.env.VITE_GA_ID;

  useEffect(() => {
    if (!gaId) return;
    
    // Delay initialization to prioritize Core Web Vitals
    const timer = setTimeout(() => {
      // Avoid adding duplicate scripts
      if (document.querySelector(`script[src*="googletagmanager.com/gtag/js"]`)) return;

    // Load the Google Analytics script
    const script = document.createElement("script");
    script.async = true;
    script.src = `https://www.googletagmanager.com/gtag/js?id=${gaId}`;
    document.head.appendChild(script);

    // Initialize the dataLayer and gtag function
    const inlineScript = document.createElement("script");
    inlineScript.innerHTML = `
      window.dataLayer = window.dataLayer || [];
      function gtag(){dataLayer.push(arguments);}
      gtag('js', new Date());
      gtag('config', '${gaId}');
    `;
      document.head.appendChild(inlineScript);
    }, 3000); // 3 second delay

    return () => clearTimeout(timer);
  }, [gaId]);

  return null;
};

"use client";
import { useEffect, useRef } from "react";

interface AdUnitProps {
  slot: string;
  format?: "auto" | "rectangle" | "horizontal" | "vertical";
  className?: string;
}

declare global {
  interface Window {
    adsbygoogle: unknown[];
  }
}

/**
 * Google AdSense ad unit.
 * Replace the `slot` prop value with your actual ad unit ID from:
 * https://www.google.com/adsense → Ads → By ad unit → Create ad unit
 *
 * Publisher ID is read from the script tag in _document.tsx.
 */
export default function AdUnit({ slot, format = "auto", className = "" }: AdUnitProps) {
  const pushed = useRef(false);

  useEffect(() => {
    if (pushed.current) return;
    try {
      (window.adsbygoogle = window.adsbygoogle || []).push({});
      pushed.current = true;
    } catch {
      // silently ignore in dev/SSR environments
    }
  }, []);

  return (
    <div className={`overflow-hidden ${className}`}>
      <ins
        className="adsbygoogle"
        style={{ display: "block" }}
        data-ad-client="ca-pub-8214113221977631"
        data-ad-slot={slot}
        data-ad-format={format}
        data-full-width-responsive="true"
      />
    </div>
  );
}

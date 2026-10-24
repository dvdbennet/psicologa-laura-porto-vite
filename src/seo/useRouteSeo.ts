import { useEffect } from "react";

export type RouteSeo = {
  url: string;
  title: string;
  description: string;
  jsonLd?: object;
};

// Applies route-specific title/meta tags at runtime and restores the previous ones on unmount.
// The build plugin in vite.config.ts writes the same tags into the route's static HTML.
export function useRouteSeo(seo: RouteSeo) {
  useEffect(() => {
    const headTags: [string, string, string][] = [
      ['meta[name="description"]', "content", seo.description],
      ['meta[property="og:title"]', "content", seo.title],
      ['meta[property="og:description"]', "content", seo.description],
      ['meta[property="og:url"]', "content", seo.url],
      ['meta[name="twitter:title"]', "content", seo.title],
      ['meta[name="twitter:description"]', "content", seo.description],
      ['link[rel="canonical"]', "href", seo.url],
    ];

    const previousTitle = document.title;
    const previous = headTags.map(
      ([selector, attr]): [string, string, string | null] => [
        selector,
        attr,
        document.head.querySelector(selector)?.getAttribute(attr) ?? null,
      ],
    );

    document.title = seo.title;
    headTags.forEach(([selector, attr, value]) => {
      document.head.querySelector(selector)?.setAttribute(attr, value);
    });

    // Reuses the tag already in the static HTML when present, so it is never duplicated.
    let jsonLdScript: HTMLScriptElement | null = null;
    if (seo.jsonLd && !document.head.querySelector("script[data-route-jsonld]")) {
      jsonLdScript = document.createElement("script");
      jsonLdScript.type = "application/ld+json";
      jsonLdScript.dataset.routeJsonld = "";
      jsonLdScript.textContent = JSON.stringify(seo.jsonLd);
      document.head.appendChild(jsonLdScript);
    }

    return () => {
      document.title = previousTitle;
      previous.forEach(([selector, attr, value]) => {
        if (value !== null) {
          document.head.querySelector(selector)?.setAttribute(attr, value);
        }
      });
      jsonLdScript?.remove();
    };
  }, [seo]);
}

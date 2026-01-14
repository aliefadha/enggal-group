import { useEffect } from "react";

interface SeoMetaProps {
    title?: string;
    description?: string;
    image?: string;
    url?: string;
    publishedTime?: string;
    author?: string;
    keywords?: string;
    type?: string;
}

export function useSeoMeta({
    title,
    description,
    image,
    url,
    publishedTime,
    author,
    keywords,
    type = "article",
}: SeoMetaProps) {
    useEffect(() => {
        // Set page title
        if (title) {
            document.title = `${title} - Enggal Group`;
        }

        // Update or create meta tags
        const updateMetaTag = (name: string, content?: string, property?: string) => {
            // Remove existing meta tags with the same name/property
            const existingTags = document.querySelectorAll(
                `meta[${property ? "property" : "name"}="${property || name}"]`
            );
            existingTags.forEach((tag) => tag.remove());

            // Create new meta tag if content is provided
            if (content) {
                const meta = document.createElement("meta");
                if (property) {
                    meta.setAttribute("property", property);
                } else {
                    meta.setAttribute("name", name);
                }
                meta.setAttribute("content", content);
                meta.setAttribute("data-dynamic", "true");
                document.head.appendChild(meta);
            }
        };

        // Update URL for better social sharing
        if (url && typeof window !== 'undefined') {
            const canonicalLink = document.querySelector("link[rel='canonical']") as HTMLLinkElement;
            if (canonicalLink) {
                canonicalLink.setAttribute('href', `${window.location.origin}${url}`);
            } else {
                const link = document.createElement("link");
                link.setAttribute("rel", "canonical");
                link.setAttribute("href", `${window.location.origin}${url}`);
                link.setAttribute("data-dynamic", "true");
                document.head.appendChild(link);
            }
        }

        // Basic SEO meta tags
        updateMetaTag("description", description);
        updateMetaTag("keywords", keywords);

        // Open Graph meta tags
        updateMetaTag("og:title", title, "og:title");
        updateMetaTag("og:description", description, "og:description");
        updateMetaTag("og:image", image, "og:image");
        updateMetaTag("og:url", url, "og:url");
        updateMetaTag("og:type", type, "og:type");
        updateMetaTag("og:site_name", "Enggal Group", "og:site_name");

        // Twitter Card meta tags
        updateMetaTag("twitter:card", "summary_large_image", "twitter:card");
        updateMetaTag("twitter:title", title, "twitter:title");
        updateMetaTag("twitter:description", description, "twitter:description");
        updateMetaTag("twitter:image", image, "twitter:image");
        updateMetaTag("twitter:site", "@enggalgroup", "twitter:site");

        // Article specific meta tags
        updateMetaTag("article:published_time", publishedTime, "article:published_time");
        updateMetaTag("article:author", author, "article:author");
        updateMetaTag("article:section", "Berita", "article:section");

        // Add structured data (JSON-LD)
        const structuredDataId = "structured-data-article";
        let structuredDataScript = document.getElementById(structuredDataId) as HTMLScriptElement;

        if (!structuredDataScript) {
            structuredDataScript = document.createElement("script");
            structuredDataScript.id = structuredDataId;
            structuredDataScript.type = "application/ld+json";
            document.head.appendChild(structuredDataScript);
        }

        const structuredData = {
            "@context": "https://schema.org",
            "@type": "NewsArticle",
            headline: title,
            description: description,
            image: image ? [image] : undefined,
            datePublished: publishedTime,
            author: author ? {
                "@type": "Person",
                name: author
            } : {
                "@type": "Organization",
                name: "Enggal Group"
            },
            publisher: {
                "@type": "Organization",
                name: "Enggal Group",
                logo: {
                    "@type": "ImageObject",
                    url: `${window.location.origin}/images/logo_navbar.png`
                }
            },
            mainEntityOfPage: {
                "@type": "WebPage",
                "@id": url
            }
        };

        structuredDataScript.textContent = JSON.stringify(structuredData, null, 2);

        // Cleanup function
        return () => {
            // Remove all added meta tags
            const metaTags = document.querySelectorAll("meta[data-dynamic='true']");
            metaTags.forEach((tag) => tag.remove());

            // Remove canonical link
            const canonicalLink = document.querySelector("link[rel='canonical'][data-dynamic='true']");
            if (canonicalLink) {
                canonicalLink.remove();
            }

            // Remove structured data
            const script = document.getElementById(structuredDataId);
            if (script) {
                script.remove();
            }
        };
    }, [title, description, image, url, publishedTime, author, keywords, type]);
}
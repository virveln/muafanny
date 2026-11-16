
import type { PageSEO } from "../../data/seo";

interface SEOProps {
  data: PageSEO;
}

export function SEO({ data }: SEOProps) {
  return (
    <>
      <title>{data.title}</title>

      <meta
        name="description"
        content={data.description}
      />

        <meta
        name="robots"
        content={data.robots ?? "index, follow"}
        />

      <link
        rel="canonical"
        href={data.canonical}
      />

      {/* Open Graph */}
      <meta
        property="og:type"
        content={data.ogType}
      />

      <meta
        property="og:title"
        content={data.ogTitle}
      />

      <meta
        property="og:description"
        content={data.ogDescription}
      />

      <meta
        property="og:image"
        content={data.ogImage}
      />

      <meta
        property="og:url"
        content={data.canonical}
      />

      <meta
        property="og:locale"
        content="sv_SE"
      />
    </>
  );
}

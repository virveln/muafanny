import { readFile } from "node:fs/promises";
import { fileURLToPath } from "node:url";
import react from "@vitejs/plugin-react";
import { defineConfig, type Plugin } from "vite";

type ImageVariant = { width: number; src: string };
type FeaturedImage = {
  webp: ImageVariant[];
  jpeg: ImageVariant[];
};
type ImageManifest = { featured: Record<string, FeaturedImage> };

const imageManifestPath = fileURLToPath(
  new URL("./src/data/optimizedImages.generated.json", import.meta.url),
);

function createPortraitSource(image: FeaturedImage, format: "webp" | "jpeg") {
  const variants = image[format];
  const fallback = variants.find(({ width }) => width === 960)
    ?? variants[variants.length - 1];
  if (!fallback) {
    throw new Error(`Missing ${format} portrait variants.`);
  }

  return {
    src: fallback.src,
    srcSet: variants.map(({ src, width }) => `${src} ${width}w`).join(", "),
  };
}

const portraitPreloadPlugin: Plugin = {
  name: "portrait-image-preload",
  transformIndexHtml: {
    order: "pre",
    async handler(html) {
      const manifest = JSON.parse(
        await readFile(imageManifestPath, "utf8"),
      ) as ImageManifest;
      const portrait = manifest.featured["fanny.jpg"];
      if (!portrait) {
        throw new Error("Missing generated portrait image metadata.");
      }

      const sources = JSON.stringify({
        webp: createPortraitSource(portrait, "webp"),
        jpeg: createPortraitSource(portrait, "jpeg"),
      });

      if (!html.includes("<!-- portrait-image-preload -->")) {
        throw new Error("Missing portrait image preload insertion point.");
      }
      const preloadScript = `<script>
      const isHomepage = window.location.pathname === "/";
      const isAboutPage = window.location.pathname === "/om" || window.location.pathname === "/om/";
      if (isHomepage || isAboutPage) {
        const supportsWebp = document.createElement("canvas").toDataURL("image/webp").startsWith("data:image/webp");
        const format = supportsWebp ? "webp" : "jpeg";
        const image = ${sources}[format];
        const preload = document.createElement("link");
        preload.rel = "preload";
        preload.as = "image";
        preload.type = supportsWebp ? "image/webp" : "image/jpeg";
        preload.href = image.src;
        preload.setAttribute("imagesrcset", image.srcSet);
        preload.setAttribute("imagesizes", isHomepage
          ? "(max-width: 760px) calc(100vw - 40px), (max-width: 1440px) 50vw, 600px"
          : "(max-width: 760px) calc(100vw - 40px), 390px");
        preload.setAttribute("fetchpriority", "high");
        document.head.appendChild(preload);
      }
    </script>`;

      return html.replace("<!-- portrait-image-preload -->", preloadScript);
    },
  },
};

export default defineConfig({
  plugins: [react(), portraitPreloadPlugin],
  base: "/",
})

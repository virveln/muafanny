import generatedManifest from "./optimizedImages.generated.json";

type ImageVariant = {
  width: number;
  src: string;
};

type GeneratedImage = {
  width: number;
  height: number;
  webp: ImageVariant[];
  jpeg: ImageVariant[];
};

type GeneratedManifest = {
  featured: Record<string, GeneratedImage>;
  portfolio: Record<string, GeneratedImage>;
};

export type ResponsiveImage = {
  src: string;
  srcSet: string;
  webpSrcSet: string;
  width: number;
  height: number;
};

const manifest = generatedManifest as GeneratedManifest;

function createSrcSet(variants: ImageVariant[]) {
  return variants.map(({ src, width }) => `${src} ${width}w`).join(", ");
}

function toResponsiveImage(image: GeneratedImage | undefined, key: string) {
  if (!image) {
    throw new Error(`Missing generated image metadata for "${key}".`);
  }

  const fallback = image.jpeg.find(({ width }) => width === 960)
    ?? image.jpeg[image.jpeg.length - 1];
  if (!fallback) {
    throw new Error(`Missing JPEG fallback for "${key}".`);
  }

  return {
    src: fallback.src,
    srcSet: createSrcSet(image.jpeg),
    webpSrcSet: createSrcSet(image.webp),
    width: image.width,
    height: image.height,
  };
}

export function getResponsiveImage(key: `featured/${string}` | `portfolio/${string}`): ResponsiveImage {
  const [collection, ...pathParts] = key.split("/");
  const imageKey = pathParts.join("/");
  const image = collection === "featured"
    ? manifest.featured[imageKey]
    : manifest.portfolio[imageKey];

  return toResponsiveImage(image, key);
}

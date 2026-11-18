import { getResponsiveImage } from "./optimizedImages";

export type PortfolioCategory = "wedding" | "production";

export type PortfolioMedia = {
  src: string;
  filename: string;
  type: "image" | "video";
  description?: string;
  width?: number;
  height?: number;
  thumbnailSrc?: string;
  thumbnailSrcSet?: string;
  thumbnailWebpSrcSet?: string;
  thumbnailSizes?: string;
};

const mediaDescriptions: Partial<Record<PortfolioCategory, Record<string, string>>> = {
    wedding: {
    "andrea.webp": "Andrea Norrman inför kollektionssläpp",
  },
  production: {
    "allsangen.webp": "Inför allsång på Skansen",
    "allsang-hedlund.webp": "Lina Hedlund inför Allsång på Skansen",
    "IMG_9189.mp4": "Inför allsång på Skansen",
    "morgonstudio-musikpanel1.JPG": "Morgonstudion musikpanelen",
    "morgonstudio-musikpanel2.JPG": "Morgonstudion musikpanelen",
    "svt-skansen-nationaldagen.webp": "Fouad Youcefi & Anne Lundberg inför nationaldagen på Skansen",
    "helia-spelning-eden.JPG": "Helia inför spelning på Eden",
    "helia-spelning-eden.mp4": "Helia inför spelning på Eden",
    "pressplatning_andrea_morgonstudion.png": "Pressplåtning av Andrea för Morgonstudion",
  },
};

const videoDimensions: Record<string, readonly [number, number]> = {
  "60e1f7a5-0461-4cf1-9150-f51404505442.mp4": [1078, 1560],
  "7cc4f79b-7ae5-444a-abb1-1b677b4fa89d.mp4": [1078, 1560],
  "b95c7f75-a76c-478a-a066-e8ab2bcbb7a1.mp4": [1078, 1646],
  "brollop1.mp4": [1080, 1920],
  "d4068def-9710-44e1-b404-24ac3e58ba9d.mp4": [1078, 1612],
  "dd0a12ee-e93c-464e-a3e3-0fc1cacde17a.mp4": [1078, 1634],
  "img_9189.mp4": [1080, 1920],
  "helia-spelning-eden.mp4": [1080, 1920],
  "img_9514.mp4": [1080, 1920],
  "img_9599.mp4": [1080, 1920],
};

const weddingImageModules = import.meta.glob(
  "/src/assets/portfolio/wedding/*.{jpg,jpeg,png,heic,webp,avif,gif,JPG,JPEG,PNG,HEIC,WEBP,AVIF,GIF}",
  {
    eager: true,
    query: "?url",
    import: "default",
  },
) as Record<string, string>;

const productionImageModules = import.meta.glob(
  "/src/assets/portfolio/production/*.{jpg,jpeg,png,heic,webp,avif,gif,JPG,JPEG,PNG,HEIC,WEBP,AVIF,GIF}",
  {
    eager: true,
    query: "?url",
    import: "default",
  },
) as Record<string, string>;

const weddingVideoModules = import.meta.glob(
  "/src/assets/portfolio/wedding/*.{mp4,webm,mov,m4v,MP4,WEBM,MOV,M4V}",
  {
    eager: true,
    query: "?url",
    import: "default",
  },
) as Record<string, string>;

const productionVideoModules = import.meta.glob(
  "/src/assets/portfolio/production/*.{mp4,webm,mov,m4v,MP4,WEBM,MOV,M4V}",
  {
    eager: true,
    query: "?url",
    import: "default",
  },
) as Record<string, string>;

function createMedia(
  category: PortfolioCategory,
  images: Record<string, string>,
  videos: Record<string, string>,
): PortfolioMedia[] {
  return [
    ...Object.entries(images).map(([path, src]) => {
      const filename = path.split("/").pop() ?? path;
      const thumbnail = getResponsiveImage(
        `portfolio/${category}/${filename.toLowerCase()}`,
      );
      return {
        src,
        filename,
        type: "image" as const,
        description: mediaDescriptions[category]?.[filename],
        width: thumbnail.width,
        height: thumbnail.height,
        thumbnailSrc: thumbnail.src,
        thumbnailSrcSet: thumbnail.srcSet,
        thumbnailWebpSrcSet: thumbnail.webpSrcSet,
        thumbnailSizes:
          "(max-width: 560px) calc(50vw - 20px), (max-width: 1200px) calc(33vw - 20px), 440px",
      };
    }),
    ...Object.entries(videos).map(([path, src]) => {
      const filename = path.split("/").pop() ?? path;
      const dimensions = videoDimensions[filename.toLowerCase()];
      return {
        src,
        filename,
        type: "video" as const,
        description: mediaDescriptions[category]?.[filename],
        width: dimensions?.[0],
        height: dimensions?.[1],
      };
    }),
  ].sort((a, b) =>
    a.filename.localeCompare(b.filename, undefined, {
      numeric: true,
      sensitivity: "base",
    }),
  );
}

export const weddingMedia = createMedia("wedding", weddingImageModules, weddingVideoModules);
export const productionMedia = createMedia("production", productionImageModules, productionVideoModules);
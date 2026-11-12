export type PortfolioCategory = "wedding" | "production";

export type PortfolioMedia = {
  src: string;
  filename: string;
  type: "image" | "video";
  description?: string;
  width?: number;
  height?: number;
};

const mediaDescriptions: Partial<Record<PortfolioCategory, Record<string, string>>> = {
    wedding: {
    "andrea.webp": "Andrea Norrman inför kollektionssläpp",
  },
  production: {
    "allsangen.webp": "Allsång på Skansen",
    "allsang-hedlund.webp": "Lina Hedlund inför Allsång på Skansen",
    "IMG_9189.MOV": "Allsång på Skansen",
    "morgonstudio-musikpanel1.JPG": "Morgonstudion musikpanelen",
    "morgonstudio-musikpanel2.JPG": "Morgonstudion musikpanelen",
    "svt-skansen-nationaldagen.webp": "Fouad Youcefi & Anne Lundberg inför nationaldagen på Skansen",
    "helia-spelning-eden.JPG": "Helia inför spelning på Eden",
    "helia-spelning-eden.MOV": "Helia inför spelning på Eden",
  },
};

const mediaDimensions: Record<string, readonly [number, number]> = {
  "60e1f7a5-0461-4cf1-9150-f51404505442.mp4": [1078, 1560],
  "7cc4f79b-7ae5-444a-abb1-1b677b4fa89d.mp4": [1078, 1560],
  "allsang-hedlund.webp": [4284, 5712],
  "allsangen.webp": [4284, 5712],
  "andrea.webp": [2783, 4002],
  "b95c7f75-a76c-478a-a066-e8ab2bcbb7a1.mp4": [1078, 1646],
  "brollop1.jpg": [2892, 4282],
  "brollop1.mp4": [1080, 1920],
  "d4068def-9710-44e1-b404-24ac3e58ba9d.mp4": [1078, 1612],
  "dd0a12ee-e93c-464e-a3e3-0fc1cacde17a.mp4": [1078, 1634],
  "morgonstudio-musikpanel1.jpg": [3565, 4754],
  "morgonstudio-musikpanel2.jpg": [3521, 4695],
  "img_4602.webp": [3024, 4032],
  "img_6038.jpg": [1179, 1557],
  "img_7037.jpg": [3206, 4275],
  "img_7109.jpg": [2533, 3377],
  "img_9189.mp4": [1080, 1920],
  "helia-spelning-eden.jpg": [4032, 3024],
  "helia-spelning-eden.mp4": [1080, 1920],
  "img_9514.mp4": [1080, 1920],
  "img_9522.jpg": [5712, 4284],
  "img_9536.jpg": [3620, 4827],
  "img_9599.mp4": [1080, 1920],
  "img_9818.jpg": [2816, 3754],
  "img_9863.jpg": [2986, 3981],
  "img_9946.jpg": [3039, 4052],
  "nora.webp": [3024, 4032],
  "sally.webp": [3024, 4032],
  "sanna-2.webp": [4284, 5712],
  "tone.jpg": [4032, 3024],
  "vasteras.webp": [3559, 4745],
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
      const dimensions = mediaDimensions[filename.toLowerCase()];
      return {
        src,
        filename,
        type: "image" as const,
        description: mediaDescriptions[category]?.[filename],
        width: dimensions?.[0],
        height: dimensions?.[1],
      };
    }),
    ...Object.entries(videos).map(([path, src]) => {
      const filename = path.split("/").pop() ?? path;
      const dimensions = mediaDimensions[filename.toLowerCase()];
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

export const startupPortfolioImages = [
  weddingMedia.find((item) => item.filename.toLowerCase() === "andrea.webp"),
  productionMedia.find((item) => item.filename.toLowerCase() === "allsangen.webp"),
  weddingMedia.find((item) => item.filename.toLowerCase() === "img_4602.webp"),
].filter((item): item is PortfolioMedia => item?.type === "image");
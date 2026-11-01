export type PortfolioCategory = "event" | "tv";

export type PortfolioMedia = {
  src: string;
  filename: string;
  type: "image" | "video";
  width?: number;
  height?: number;
};

const mediaDimensions: Record<string, readonly [number, number]> = {
  "60e1f7a5-0461-4cf1-9150-f51404505442.mov": [1078, 1560],
  "7cc4f79b-7ae5-444a-abb1-1b677b4fa89d.mov": [1078, 1560],
  "allsang-2.webp": [4284, 5712],
  "allsangen.webp": [4284, 5712],
  "andrea.webp": [2783, 4002],
  "b95c7f75-a76c-478a-a066-e8ab2bcbb7a1.mov": [1078, 1646],
  "brollop1.jpg": [2892, 4282],
  "brollop1.mov": [1080, 1920],
  "d4068def-9710-44e1-b404-24ac3e58ba9d.mov": [1078, 1612],
  "dd0a12ee-e93c-464e-a3e3-0fc1cacde17a.mov": [1078, 1634],
  "img_0843.jpg": [3565, 4754],
  "img_0849.jpg": [3521, 4695],
  "img_4602.webp": [3024, 4032],
  "img_6038.jpg": [1179, 1557],
  "img_7037.jpg": [3206, 4275],
  "img_7109.jpg": [2533, 3377],
  "img_9189.mov": [1080, 1920],
  "img_9313.jpg": [4032, 3024],
  "img_9332.mov": [1080, 1920],
  "img_9514.mov": [1080, 1920],
  "img_9522.jpg": [5712, 4284],
  "img_9536.jpg": [3620, 4827],
  "img_9599.mov": [1080, 1920],
  "img_9818.jpg": [2816, 3754],
  "img_9863.jpg": [2986, 3981],
  "img_9946.jpg": [3039, 4052],
  "nora.webp": [3024, 4032],
  "sally.webp": [3024, 4032],
  "sanna-2.webp": [4284, 5712],
  "tone.jpg": [4032, 3024],
  "vasteras.webp": [3559, 4745],
};

const eventImageModules = import.meta.glob(
  "/src/assets/portfolio/event/*.{jpg,jpeg,png,heic,webp,avif,gif,JPG,JPEG,PNG,HEIC,WEBP,AVIF,GIF}",
  {
    eager: true,
    query: "?url",
    import: "default",
  },
) as Record<string, string>;

const tvImageModules = import.meta.glob(
  "/src/assets/portfolio/tv/*.{jpg,jpeg,png,heic,webp,avif,gif,JPG,JPEG,PNG,HEIC,WEBP,AVIF,GIF}",
  {
    eager: true,
    query: "?url",
    import: "default",
  },
) as Record<string, string>;

const eventVideoModules = import.meta.glob(
  "/src/assets/portfolio/event/*.{mp4,webm,mov,m4v,MP4,WEBM,MOV,M4V}",
  {
    eager: true,
    query: "?url",
    import: "default",
  },
) as Record<string, string>;

const tvVideoModules = import.meta.glob(
  "/src/assets/portfolio/tv/*.{mp4,webm,mov,m4v,MP4,WEBM,MOV,M4V}",
  {
    eager: true,
    query: "?url",
    import: "default",
  },
) as Record<string, string>;

function createMedia(
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

export const eventMedia = createMedia(eventImageModules, eventVideoModules);
export const tvMedia = createMedia(tvImageModules, tvVideoModules);

export const startupPortfolioImages = [
  eventMedia.find((item) => item.filename.toLowerCase() === "andrea.webp"),
  tvMedia.find((item) => item.filename.toLowerCase() === "allsangen.webp"),
  eventMedia.find((item) => item.filename.toLowerCase() === "img_4602.webp"),
].filter((item): item is PortfolioMedia => item?.type === "image");
import { createHash } from "node:crypto";
import { mkdir, readdir, rm, unlink, writeFile } from "node:fs/promises";
import { resolve } from "node:path";
import { fileURLToPath } from "node:url";
import sharp from "sharp";

const projectRoot = resolve(fileURLToPath(new URL("..", import.meta.url)));
const publicImagesDirectory = resolve(projectRoot, "public/images");
const outputDirectory = resolve(publicImagesDirectory, "optimized");
const manifestPath = resolve(
  projectRoot,
  "src/data/optimizedImages.generated.json",
);
const supportedImageExtension = /\.(jpe?g|png|webp|avif|gif|heic)$/i;

async function findImages(directory) {
  const entries = await readdir(directory, { withFileTypes: true });
  return entries
    .filter((entry) => entry.isFile() && supportedImageExtension.test(entry.name))
    .map((entry) => entry.name)
    .sort((a, b) => a.localeCompare(b, undefined, { sensitivity: "base" }));
}

function getOrientedDimensions(metadata) {
  const swapsDimensions = [5, 6, 7, 8].includes(metadata.orientation ?? 0);
  return {
    width: swapsDimensions ? metadata.height : metadata.width,
    height: swapsDimensions ? metadata.width : metadata.height,
  };
}

function createFilename(key, width, format, bytes) {
  const name = key
    .replace(/\.[^.]+$/, "")
    .replace(/[^a-zA-Z0-9-]+/g, "-")
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "")
    .toLowerCase();
  const hash = createHash("sha256").update(bytes).digest("hex").slice(0, 12);
  return `${name}-${width}-${hash}.${format === "jpeg" ? "jpg" : format}`;
}

async function generateImage(sourcePath, key, widths) {
  const metadata = await sharp(sourcePath).metadata();
  const dimensions = getOrientedDimensions(metadata);
  if (!dimensions.width || !dimensions.height) {
    throw new Error(`Could not read image dimensions: ${sourcePath}`);
  }

  const outputWidths = [
    ...new Set(widths.map((width) => Math.min(width, dimensions.width))),
  ].sort((a, b) => a - b);
  const variants = { webp: [], jpeg: [] };

  for (const width of outputWidths) {
    const source = sharp(sourcePath)
      .rotate()
      .resize({ width, withoutEnlargement: true });
    const [webp, jpeg] = await Promise.all([
      source.clone().webp({ quality: 82, effort: 5 }).toBuffer(),
      source.clone().jpeg({ quality: 84, mozjpeg: true }).toBuffer(),
    ]);

    for (const [format, bytes] of [
      ["webp", webp],
      ["jpeg", jpeg],
    ]) {
      const filename = createFilename(key, width, format, bytes);
      await writeFile(resolve(outputDirectory, filename), bytes);
      variants[format].push({
        width,
        src: `/images/optimized/${filename}`,
      });
    }
  }

  return {
    width: dimensions.width,
    height: dimensions.height,
    ...variants,
  };
}

async function removeLegacyVariants() {
  for (const filename of await readdir(publicImagesDirectory)) {
    if (/^(fanny|tone)-(480|960|1440)-v1\.(jpg|webp)$/i.test(filename)) {
      await unlink(resolve(publicImagesDirectory, filename));
    }
  }

  for (const category of ["wedding", "production"]) {
    const directory = resolve(publicImagesDirectory, "portfolio", category);
    let filenames;
    try {
      filenames = await readdir(directory);
    } catch (error) {
      if (error.code === "ENOENT") continue;
      throw error;
    }

    for (const filename of filenames) {
      if (/-((480|960))-v1\.(jpg|webp)$/i.test(filename)) {
        await unlink(resolve(directory, filename));
      }
    }
  }
}

await rm(outputDirectory, { recursive: true, force: true });
await mkdir(outputDirectory, { recursive: true });

const featured = {
  "fanny.jpg": await generateImage(
    resolve(projectRoot, "src/assets/fanny.jpg"),
    "fanny.jpg",
    [480, 960, 1440],
  ),
};
const portfolio = {};

for (const category of ["wedding", "production"]) {
  const sourceDirectory = resolve(projectRoot, "src/assets/portfolio", category);
  for (const filename of await findImages(sourceDirectory)) {
    const key = `${category}/${filename.toLowerCase()}`;
    portfolio[key] = await generateImage(
      resolve(sourceDirectory, filename),
      key,
      [480, 960],
    );
  }
}

await writeFile(
  manifestPath,
  `${JSON.stringify({ featured, portfolio }, null, 2)}\n`,
);
await removeLegacyVariants();

console.log(
  `Optimized ${Object.keys(portfolio).length + Object.keys(featured).length} images into ${outputDirectory}.`,
);

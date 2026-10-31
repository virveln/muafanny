
import { useEffect, useState } from "react";
import type { MouseEvent } from "react";
import { X, ArrowLeft, ArrowRight, Play } from "lucide-react";
import { LazyPortfolioImage } from "./LazyPortfolioImage";
import { LazyPortfolioVideo } from "./LazyPortfolioVideo";
import "./PortfolioGallery.css";

type PortfolioCategory = "event" | "tv";

type PortfolioMedia = {
  src: string;
  filename: string;
  type: "image" | "video";
};

// Load images from both folders
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

// Load videos from both folders
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

// Create the media arrays
function createMedia(
  images: Record<string, string>,
  videos: Record<string, string>,
): PortfolioMedia[] {
  return [
    ...Object.entries(images).map(([path, src]) => ({
      src,
      filename: path.split("/").pop() ?? path,
      type: "image" as const,
    })),

    ...Object.entries(videos).map(([path, src]) => ({
      src,
      filename: path.split("/").pop() ?? path,
      type: "video" as const,
    })),
  ].sort((a, b) =>
    a.filename.localeCompare(b.filename, undefined, {
      numeric: true,
      sensitivity: "base",
    }),
  );
}

const eventMedia = createMedia(eventImageModules, eventVideoModules);
const tvMedia = createMedia(tvImageModules, tvVideoModules);

if (import.meta.env.DEV) {
  console.info(
    `[PortfolioGallery] Event: ${eventMedia.length} items, TV: ${tvMedia.length} items.`,
  );
}


export function PortfolioGallery() {
  const [category, setCategory] = useState<PortfolioCategory>("event");
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const [isZoomed, setIsZoomed] = useState(false);

  const [userPlayingVideos, setUserPlayingVideos] = useState<Set<string>>(
    () => new Set(),
  );

  const media = category === "event" ? eventMedia : tvMedia;
  const activeMedia = activeIndex === null ? null : media[activeIndex];

    // PRELOAD THE FIRST 4 TV IMAGES
  useEffect(() => {
    const imagesToPreload = tvMedia
      .filter((item) => item.type === "image")
      .slice(0, 4);

    imagesToPreload.forEach((item) => {
      const img = new Image();
      img.src = item.src;
    });
  }, []);

  function changeCategory(nextCategory: PortfolioCategory) {
    setCategory(nextCategory);
    setActiveIndex(null);
    setIsZoomed(false);
    setUserPlayingVideos(new Set());
  }

  function showPrevious() {
    setActiveIndex((current) =>
      current === null
        ? null
        : (current - 1 + media.length) % media.length,
    );
  }

  function showNext() {
    setActiveIndex((current) =>
      current === null ? null : (current + 1) % media.length,
    );
  }

  function playVideo(video: HTMLVideoElement) {
    video.muted = true;
    void video.play().catch(() => {});
  }

  function toggleVideo(
    event: MouseEvent<HTMLButtonElement>,
    src: string,
  ) {
    event.stopPropagation();

    const video = event.currentTarget
      .closest(".portfolio-item")
      ?.querySelector("video");

    if (!video) return;

    if (video.paused) {
      playVideo(video);
      setUserPlayingVideos((current) => new Set(current).add(src));
    } else {
      video.pause();
      setUserPlayingVideos((current) => {
        const next = new Set(current);
        next.delete(src);
        return next;
      });
    }
  }

  useEffect(() => {
    setIsZoomed(false);

    if (activeIndex === null) return;

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") setActiveIndex(null);
      if (event.key === "ArrowLeft") showPrevious();
      if (event.key === "ArrowRight") showNext();
    }

    const previousOverflow = document.body.style.overflow;

    document.addEventListener("keydown", handleKeyDown);
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = previousOverflow;
    };
  }, [activeIndex]);

  function renderGallery(
    galleryMedia: PortfolioMedia[],
    isVisible: boolean,
  ) {
    return (
      <div
        className="portfolio-gallery-panel"
        hidden={!isVisible}
        aria-hidden={!isVisible}
      >
        {galleryMedia.length > 0 ? (
          <div className="portfolio-gallery">
            {galleryMedia.map((item, index) => (
              <div
                className="portfolio-item"
                key={item.src}
                onMouseEnter={() => {
                  if (item.type === "video" && isVisible) {
                    setUserPlayingVideos((current) => new Set(current).add(item.src));
                  }
                }}
                onMouseLeave={() => {
                  if (item.type === "video") {
                    setUserPlayingVideos((current) => {
                      const next = new Set(current);
                      next.delete(item.src);
                      return next;
                    });
                  }
                }}
              >
                {item.type === "image" ? (
                  <LazyPortfolioImage
                    src={item.src}
                    alt={item.filename}
                    loadImmediately={!isVisible}
                  />
                ) : (
                  <LazyPortfolioVideo
                    src={item.src}
                    filename={item.filename}
                    isVisible={isVisible}
                    userPlaying={userPlayingVideos.has(item.src)}
                    loadImmediately={!isVisible}
                  />
                )}

                <button
                  className="portfolio-open"
                  type="button"
                  onClick={() => setActiveIndex(index)}
                  aria-label={`Open ${item.type}: ${item.filename}`}
                />

                {item.type === "video" && (
                  <button
                    className="portfolio-video-play"
                    type="button"
                    onClick={(event) => toggleVideo(event, item.src)}
                    aria-label="Play or pause video"
                  >
                    <Play size={20} fill="currentColor" />
                  </button>
                )}
              </div>
            ))}
          </div>
        ) : (
          <p className="portfolio-empty">
            Inga bilder eller videor har lagts till i den här kategorin ännu.
          </p>
        )}
      </div>
    );
  }

  return (
    <>
      <div
        className="portfolio-category-switch"
        role="group"
        aria-label="Välj portfoliokategori"
      >
        <button
          type="button"
          className={
            category === "event"
              ? "portfolio-category-switch__button is-active"
              : "portfolio-category-switch__button"
          }
          onClick={() => changeCategory("event")}
          aria-pressed={category === "event"}
        >
          Event
        </button>

        <button
          type="button"
          className={
            category === "tv"
              ? "portfolio-category-switch__button is-active"
              : "portfolio-category-switch__button"
          }
          onClick={() => changeCategory("tv")}
          aria-pressed={category === "tv"}
        >
          TV-produktion
        </button>
      </div>

      {renderGallery(eventMedia, category === "event")}
      {renderGallery(tvMedia, category === "tv")}

      {activeMedia && activeIndex !== null && (
        <div
          className="portfolio-lightbox"
          role="dialog"
          aria-modal="true"
          aria-label="Portfolio media viewer"
        >
          <button
            className="lightbox-close"
            type="button"
            onClick={() => setActiveIndex(null)}
            aria-label="Close viewer"
          >
            <X size={26} />
          </button>

          <button
            className="lightbox-side lightbox-side--previous"
            type="button"
            onClick={showPrevious}
            aria-label="Previous item"
          >
            <span className="lightbox-arrow-icon">
              <ArrowLeft size={26} />
            </span>
          </button>

          <figure className="lightbox-figure">
            {activeMedia.type === "image" ? (
              <div
                className={`lightbox-image-wrap ${
                  isZoomed ? "is-zoomed" : ""
                }`}
              >
                <img
                  key={activeMedia.src}
                  src={activeMedia.src}
                  alt={activeMedia.filename}
                  className="lightbox-image"
                  onClick={() => setIsZoomed((current) => !current)}
                  draggable={false}
                />
              </div>
            ) : (
              <video
                key={activeMedia.src}
                ref={(video) => {
                  if (video) {
                    video.muted = true;
                    video.defaultMuted = true;
                    video.volume = 0;
                  }
                }}
                src={activeMedia.src}
                muted
                playsInline
                controls
                loop
                autoPlay
                preload="metadata"
                onVolumeChange={(event) => {
                  const video = event.currentTarget;

                  if (!video.muted || video.volume !== 0) {
                    video.muted = true;
                    video.volume = 0;
                  }
                }}
              />
            )}
          </figure>

          <button
            className="lightbox-side lightbox-side--next"
            type="button"
            onClick={showNext}
            aria-label="Next item"
          >
            <span className="lightbox-arrow-icon">
              <ArrowRight size={26} />
            </span>
          </button>

          <span className="lightbox-counter">
            {activeIndex + 1} / {media.length}
          </span>
        </div>
      )}
    </>
  );
}

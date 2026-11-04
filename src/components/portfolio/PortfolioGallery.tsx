
import { useEffect, useState } from "react";
import type { MouseEvent } from "react";
import { X, ArrowLeft, ArrowRight, Play } from "lucide-react";
import { LazyPortfolioImage } from "./LazyPortfolioImage";
import { LazyPortfolioVideo } from "./LazyPortfolioVideo";
import { CategorySwitch } from "../CategorySwitch";

import {
  eventMedia,
  productionMedia,
  type PortfolioMedia,
} from "../../data/portfolioMedia";

import "./PortfolioGallery.css";

if (import.meta.env.DEV) {
  console.info(
    `[PortfolioGallery] Event: ${eventMedia.length} items, Produktion: ${productionMedia.length} items.`,
  );
}

type PortfolioCategory = "event" | "production";

const portfolioCategories = [
  { value: "event", label: "Bröllop/Event" },
  { value: "production", label: "Produktion" },
] as const;


export function PortfolioGallery() {
  const [category, setCategory] = useState<PortfolioCategory>("event");
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const [isZoomed, setIsZoomed] = useState(false);

  const [userPlayingVideos, setUserPlayingVideos] = useState<Set<string>>(
    () => new Set(),
  );

  const media = category === "event" ? eventMedia : productionMedia;
  const activeMedia = activeIndex === null ? null : media[activeIndex];

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
  }, [activeIndex, media.length]);

  function renderGallery(
    galleryMedia: PortfolioMedia[],
    isVisible: boolean,
  ) {
    const priorityImages = new Set(
      galleryMedia
        .filter((item) => item.type === "image")
        .slice(0, 3)
        .map((item) => item.src),
    );

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
                    width={item.width}
                    height={item.height}
                    loadImmediately={isVisible && priorityImages.has(item.src)}
                  />
                ) : (
                  <LazyPortfolioVideo
                    src={item.src}
                    filename={item.filename}
                    width={item.width}
                    height={item.height}
                    isVisible={isVisible}
                    userPlaying={userPlayingVideos.has(item.src)}
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
      <CategorySwitch
        categories={portfolioCategories}
        value={category}
        onChange={setCategory}
        ariaLabel="Välj portfoliokategori"
      />

      {renderGallery(eventMedia, category === "event")}
      {renderGallery(productionMedia, category === "production")}

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
                preload="none"
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


import { useEffect, useRef, useState } from "react";
import type { MouseEvent } from "react";
import { createPortal } from "react-dom";
import { X, ArrowLeft, ArrowRight, Play, Pause } from "lucide-react";
import { LazyPortfolioImage } from "./LazyPortfolioImage";
import { LazyPortfolioVideo } from "./LazyPortfolioVideo";
import { CategorySwitch } from "../features/CategorySwitch";

import {
  weddingMedia,
  productionMedia,
  type PortfolioMedia,
} from "../../data/portfolioMedia";

import "./PortfolioGallery.css";

if (import.meta.env.DEV) {
  console.info(
    `[PortfolioGallery] B: ${weddingMedia.length} items, Produktion: ${productionMedia.length} items.`,
  );
}

type PortfolioCategory = "wedding" | "production";
type PortfolioGalleryProps = {
  onLightboxChange: (isOpen: boolean) => void;
};

const portfolioCategories = [
  { value: "wedding", label: "Bröllop" },
  { value: "production", label: "Produktion/Event" },
] as const;


export function PortfolioGallery({ onLightboxChange }: PortfolioGalleryProps) {
  const [isMobileLayout, setIsMobileLayout] = useState(
    () => typeof window !== "undefined" && window.matchMedia("(max-width: 560px)").matches,
  );
  const [category, setCategory] = useState<PortfolioCategory>("wedding");
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const [zoomFocus, setZoomFocus] = useState<{
    src: string;
    x: number;
    y: number;
  } | null>(null);

  const [userPlayingVideos, setUserPlayingVideos] = useState<Set<string>>(
    () => new Set(),
  );
  const lightboxVideoRef = useRef<HTMLVideoElement>(null);
  const lightboxControlsTimeout = useRef<number | null>(null);
  const [isLightboxVideoPlaying, setIsLightboxVideoPlaying] = useState(false);
  const [showLightboxVideoControls, setShowLightboxVideoControls] = useState(true);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(max-width: 560px)");
    const updateLayout = () => setIsMobileLayout(mediaQuery.matches);

    mediaQuery.addEventListener("change", updateLayout);
    return () => mediaQuery.removeEventListener("change", updateLayout);
  }, []);

  const media = category === "wedding" ? weddingMedia : productionMedia;
  const activeMedia = activeIndex === null ? null : media[activeIndex];
  const isZoomed = activeMedia !== null && zoomFocus?.src === activeMedia.src;
  const zoomOrigin = isZoomed && zoomFocus
    ? { x: zoomFocus.x, y: zoomFocus.y }
    : { x: 50, y: 50 };

  function clearLightboxControlsTimeout() {
    if (lightboxControlsTimeout.current !== null) {
      window.clearTimeout(lightboxControlsTimeout.current);
    }
  }

  function hideLightboxControlsSoon() {
    clearLightboxControlsTimeout();
    lightboxControlsTimeout.current = window.setTimeout(() => {
      setShowLightboxVideoControls(false);
    }, 300);
  }

  function revealLightboxControls() {
    setShowLightboxVideoControls(true);
    if (isLightboxVideoPlaying) hideLightboxControlsSoon();
  }

  function resetLightboxVideoControls() {
    clearLightboxControlsTimeout();
    setIsLightboxVideoPlaying(false);
    setShowLightboxVideoControls(true);
  }

  function toggleLightboxVideo() {
    const video = lightboxVideoRef.current;
    if (!video) return;
    if (video.paused) void video.play().catch(() => {});
    else video.pause();
  }

  function showPrevious() {
    resetLightboxVideoControls();
    setActiveIndex((current) =>
      current === null
        ? null
        : (current - 1 + media.length) % media.length,
    );
  }

  function showNext() {
    resetLightboxVideoControls();
    setActiveIndex((current) =>
      current === null ? null : (current + 1) % media.length,
    );
  }

  function toggleVideo(
    event: MouseEvent<HTMLButtonElement>,
    src: string,
  ) {
    event.stopPropagation();

    const video = event.currentTarget.parentElement?.querySelector("video");
    if (video) {
      if (video.paused) void video.play().catch(() => {});
      else video.pause();
    }

    setUserPlayingVideos((current) => {
      const next = new Set(current);
      if (next.has(src)) next.delete(src);
      else next.add(src);
      return next;
    });
  }

  function openMedia(index: number) {
    resetLightboxVideoControls();
    setActiveIndex(index);
  }

  function closeLightbox() {
    resetLightboxVideoControls();
    setActiveIndex(null);
  }

  useEffect(() => {
    if (activeIndex === null) return;

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        resetLightboxVideoControls();
        setActiveIndex(null);
      }
      if (event.key === "ArrowLeft") {
        resetLightboxVideoControls();
        setActiveIndex((current) =>
          current === null ? null : (current - 1 + media.length) % media.length,
        );
      }
      if (event.key === "ArrowRight") {
        resetLightboxVideoControls();
        setActiveIndex((current) =>
          current === null ? null : (current + 1) % media.length,
        );
      }
    }

    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [activeIndex, media.length]);

  useEffect(() => {
    onLightboxChange(activeIndex !== null);
  }, [activeIndex, onLightboxChange]);

  function toggleImageZoom(event: MouseEvent<HTMLButtonElement>) {
    const image = event.currentTarget.querySelector("img");
    if (!activeMedia) return;
    if (isZoomed) {
      setZoomFocus(null);
      return;
    }

    if (image && event.nativeEvent.detail !== 0) {
      const bounds = image.getBoundingClientRect();
      const x = ((event.clientX - bounds.left) / bounds.width) * 100;
      const y = ((event.clientY - bounds.top) / bounds.height) * 100;
      setZoomFocus({
        src: activeMedia.src,
        x: Math.max(0, Math.min(100, x)),
        y: Math.max(0, Math.min(100, y)),
      });
    } else {
      setZoomFocus({ src: activeMedia.src, x: 50, y: 50 });
    }
  }

  function renderGallery(
    galleryMedia: PortfolioMedia[],
    isVisible: boolean,
  ) {
    const priorityImages = new Set(
      galleryMedia
        .slice(0, 2)
        .filter((item) => item.type === "image")
        .map((item) => item.src),
    );
    const indexedMedia = galleryMedia.map((item, index) => ({ item, index }));
    const mobileColumns = [
      indexedMedia.filter(({ index }) => index % 2 === 0),
      indexedMedia.filter(({ index }) => index % 2 === 1),
    ];

    function renderItem(item: PortfolioMedia, index: number) {
      return (
        <div
          className={`portfolio-item${userPlayingVideos.has(item.src) ? " is-playing" : ""}`}
          key={item.src}
          onMouseEnter={() => {
            if (
              item.type === "video" &&
              isVisible &&
              window.matchMedia("(hover: hover) and (pointer: fine)").matches
            ) {
              setUserPlayingVideos((current) => new Set(current).add(item.src));
            }
          }}
          onMouseLeave={() => {
            if (
              item.type === "video" &&
              window.matchMedia("(hover: hover) and (pointer: fine)").matches
            ) {
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
              userPlaying={!isMobileLayout && userPlayingVideos.has(item.src)}
            />
          )}

          <button
            className="portfolio-open"
            type="button"
            onClick={() => openMedia(index)}
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

          {item.description && (
            <span className="portfolio-caption">{item.description}</span>
          )}
        </div>
      );
    }

    return (
      <div
        className="portfolio-gallery-panel"
        hidden={!isVisible}
        aria-hidden={!isVisible}
      >
        {galleryMedia.length > 0 ? (
          isMobileLayout ? (
            <div className="portfolio-gallery--mobile">
              {mobileColumns.map((column, columnIndex) => (
                <div className="portfolio-gallery-mobile-column" key={columnIndex}>
                  {column.map(({ item, index }) => renderItem(item, index))}
                </div>
              ))}
            </div>
          ) : (
            <div className="portfolio-gallery">
              {galleryMedia.map((item, index) => renderItem(item, index))}
            </div>
          )
        ) : (
          <p className="portfolio-empty">
            Inga bilder eller videor har lagts till i den här kategorin ännu.
          </p>
        )}
      </div>
    );
  }

  return (
    <div className="animation-fade-up animation-fade-up-delay">
      <CategorySwitch
        categories={portfolioCategories}
        value={category}
        onChange={setCategory}
        ariaLabel="Välj portfoliokategori"
      />

      {renderGallery(weddingMedia, category === "wedding")}
      {renderGallery(productionMedia, category === "production")}

      {activeMedia && activeIndex !== null && createPortal((
        <div
          className="portfolio-lightbox"
          role="dialog"
          aria-modal="true"
          aria-label="Portfolio media viewer"
        >
          <button
            className="lightbox-close"
            type="button"
            onClick={closeLightbox}
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

          <figure
            className="lightbox-figure"
            onPointerMove={revealLightboxControls}
            onPointerDown={revealLightboxControls}
          >
            {activeMedia.type === "image" ? (
              <button
                className={`lightbox-image-wrap ${isZoomed ? "is-zoomed" : ""}`}
                type="button"
                aria-label={isZoomed ? "Zoom out" : "Zoom in on image"}
                onClick={toggleImageZoom}
                style={{ "--zoom-x": `${zoomOrigin.x}%`, "--zoom-y": `${zoomOrigin.y}%` } as React.CSSProperties}
              >
                <img
                  key={activeMedia.src}
                  src={activeMedia.src}
                  alt={activeMedia.filename}
                  className="lightbox-image"
                  decoding="async"
                  draggable={false}
                />
              </button>
            ) : (
              <>
              <video
                key={activeMedia.src}
                ref={(video) => {
                  lightboxVideoRef.current = video;
                  if (video) {
                    video.muted = true;
                    video.defaultMuted = true;
                    video.volume = 0;
                  }
                }}
                src={activeMedia.src}
                muted
                playsInline
                loop
                autoPlay
                preload="auto"
                onClick={toggleLightboxVideo}
                onPlay={() => {
                  setIsLightboxVideoPlaying(true);
                  setShowLightboxVideoControls(true);
                  hideLightboxControlsSoon();
                }}
                onPause={() => {
                  clearLightboxControlsTimeout();
                  setIsLightboxVideoPlaying(false);
                  setShowLightboxVideoControls(true);
                }}
                onVolumeChange={(event) => {
                  const video = event.currentTarget;

                  if (!video.muted || video.volume !== 0) {
                    video.muted = true;
                    video.volume = 0;
                  }
                }}
              />
              <button
                className={`lightbox-video-toggle${showLightboxVideoControls ? "" : " is-hidden"}`}
                type="button"
                aria-label={isLightboxVideoPlaying ? "Pause video" : "Play video"}
                onClick={toggleLightboxVideo}
              >
                {isLightboxVideoPlaying ? <Pause size={28} fill="currentColor" /> : <Play size={28} fill="currentColor" />}
              </button>
              </>
            )}
          </figure>

          {activeMedia.description && (
            <p className="lightbox-caption">
              {activeMedia.description}
            </p>
          )}

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
      ), document.body)}
    </div>
  );
}

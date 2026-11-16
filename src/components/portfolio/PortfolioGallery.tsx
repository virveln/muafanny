
import { useCallback, useEffect, useRef, useState } from "react";
import type {
  MouseEvent,
  PointerEvent as ReactPointerEvent,
  TouchEvent as ReactTouchEvent,
} from "react";
import { createPortal } from "react-dom";
import { X, ChevronLeft, ChevronRight, Play, Pause } from "lucide-react";
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
  const [isTouchInput, setIsTouchInput] = useState(
    () => typeof window !== "undefined" && window.matchMedia("(hover: none), (pointer: coarse)").matches,
  );
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(
    () => typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches,
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
  const lightboxSwipeStart = useRef<{
    pointerId: number;
    x: number;
    y: number;
    startedOnVideo: boolean;
  } | null>(null);
  const lightboxTouchStart = useRef<{
    identifier: number;
    x: number;
    y: number;
    startedOnVideo: boolean;
  } | null>(null);
  const suppressLightboxVideoClick = useRef(false);
  const lightboxControlsRequested = useRef(false);
  const [isLightboxVideoPlaying, setIsLightboxVideoPlaying] = useState(false);
  const [showLightboxVideoControls, setShowLightboxVideoControls] = useState(true);
  const lightboxDialogRef = useRef<HTMLDivElement>(null);
  const lightboxCloseRef = useRef<HTMLButtonElement>(null);
  const lightboxOpenerRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(max-width: 560px)");
    const updateLayout = () => setIsMobileLayout(mediaQuery.matches);

    mediaQuery.addEventListener("change", updateLayout);
    return () => mediaQuery.removeEventListener("change", updateLayout);
  }, []);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(hover: none), (pointer: coarse)");
    const updateTouchInput = () => setIsTouchInput(mediaQuery.matches);

    mediaQuery.addEventListener("change", updateTouchInput);
    return () => mediaQuery.removeEventListener("change", updateTouchInput);
  }, []);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    const updatePreference = () => setPrefersReducedMotion(mediaQuery.matches);

    mediaQuery.addEventListener("change", updatePreference);
    return () => mediaQuery.removeEventListener("change", updatePreference);
  }, []);

  const media = category === "wedding" ? weddingMedia : productionMedia;
  const activeMedia = activeIndex === null ? null : media[activeIndex];
  const isLightboxOpen = activeIndex !== null;
  const shouldShowLightboxVideoControl =
    prefersReducedMotion ||
    (showLightboxVideoControls &&
      (!isTouchInput || !isLightboxVideoPlaying));
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
    }, 1000);
  }

  function revealLightboxControls(event: ReactPointerEvent<HTMLElement>) {
    if (isTouchInput) return;
    if (
      !(event.target instanceof Element) ||
      !event.target.closest("video, .lightbox-video-toggle")
    ) {
      return;
    }

    lightboxControlsRequested.current = true;
    setShowLightboxVideoControls(true);
    if (isLightboxVideoPlaying) hideLightboxControlsSoon();
  }

  function handleLightboxVideoClick() {
    if (isTouchInput && suppressLightboxVideoClick.current) {
      suppressLightboxVideoClick.current = false;
      return;
    }

    toggleLightboxVideoFromControl();
  }

  function toggleLightboxVideoFromControl() {
    if (!isTouchInput) {
      toggleLightboxVideo();
      return;
    }

    const video = lightboxVideoRef.current;
    if (!video) return;

    clearLightboxControlsTimeout();
    if (video.paused) {
      lightboxControlsRequested.current = false;
      setShowLightboxVideoControls(false);
      void video.play().catch(() => {});
    } else {
      lightboxControlsRequested.current = true;
      setShowLightboxVideoControls(true);
      video.pause();
    }
  }

  const resetLightboxVideoControls = useCallback(() => {
    clearLightboxControlsTimeout();
    lightboxControlsRequested.current = false;
    setIsLightboxVideoPlaying(false);
    setShowLightboxVideoControls(!isTouchInput);
  }, [isTouchInput]);

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

  function startLightboxSwipe(event: ReactPointerEvent<HTMLElement>) {
    if (event.pointerType !== "touch" || !event.isPrimary) return;
    if (
      event.target instanceof Element &&
      event.target.closest(".lightbox-video-toggle")
    ) {
      return;
    }

    lightboxSwipeStart.current = {
      pointerId: event.pointerId,
      x: event.clientX,
      y: event.clientY,
      startedOnVideo:
        event.target instanceof Element && Boolean(event.target.closest("video")),
    };
  }

  function finishLightboxSwipe(event: ReactPointerEvent<HTMLElement>) {
    const start = lightboxSwipeStart.current;
    lightboxSwipeStart.current = null;
    if (!start || event.pointerType !== "touch" || event.pointerId !== start.pointerId) return;

    const deltaX = event.clientX - start.x;
    const deltaY = event.clientY - start.y;
    if (Math.abs(deltaX) < 48 || Math.abs(deltaX) < Math.abs(deltaY) * 1.25) return;

    event.preventDefault();
    if (start.startedOnVideo) suppressLightboxVideoClick.current = true;
    if (deltaX < 0) showNext();
    else showPrevious();
  }

  function startLightboxTouch(event: ReactTouchEvent<HTMLDivElement>) {
    suppressLightboxVideoClick.current = false;
    if (event.touches.length !== 1) {
      lightboxTouchStart.current = null;
      return;
    }

    const touch = event.touches[0];
    lightboxTouchStart.current = {
      identifier: touch.identifier,
      x: touch.clientX,
      y: touch.clientY,
      startedOnVideo:
        event.target instanceof Element && Boolean(event.target.closest("video")),
    };
  }

  function finishLightboxTouch(event: ReactTouchEvent<HTMLDivElement>) {
    const start = lightboxTouchStart.current;
    lightboxTouchStart.current = null;
    if (!start) return;

    const touch = Array.from(event.changedTouches).find(
      (changedTouch) => changedTouch.identifier === start.identifier,
    );
    if (!touch) return;

    const deltaX = touch.clientX - start.x;
    const deltaY = touch.clientY - start.y;
    const isSwipe = Math.abs(deltaX) >= 48 || Math.abs(deltaY) >= 60;
    if (isSwipe && start.startedOnVideo) {
      suppressLightboxVideoClick.current = true;
    }
    if (deltaY > -60 || Math.abs(deltaY) < Math.abs(deltaX) * 1.25) return;

    event.preventDefault();
    closeLightbox();
  }

  function toggleVideo(
    event: MouseEvent<HTMLButtonElement>,
    src: string,
  ) {
    event.stopPropagation();

    setUserPlayingVideos((current) => {
      const next = new Set(current);
      if (next.has(src)) next.delete(src);
      else next.add(src);
      return next;
    });
  }

  function openMedia(event: MouseEvent<HTMLButtonElement>, index: number) {
    lightboxOpenerRef.current = event.currentTarget;
    resetLightboxVideoControls();
    setActiveIndex(index);
  }

  const closeLightbox = useCallback(() => {
    resetLightboxVideoControls();
    setActiveIndex(null);
  }, [resetLightboxVideoControls]);

  useEffect(() => {
    if (activeIndex === null) return;

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        event.preventDefault();
        closeLightbox();
      }
      if (event.key === "ArrowLeft") {
        event.preventDefault();
        resetLightboxVideoControls();
        setActiveIndex((current) =>
          current === null ? null : (current - 1 + media.length) % media.length,
        );
      }
      if (event.key === "ArrowRight") {
        event.preventDefault();
        resetLightboxVideoControls();
        setActiveIndex((current) =>
          current === null ? null : (current + 1) % media.length,
        );
      }
      if (event.key === "Tab") {
        const dialog = lightboxDialogRef.current;
        if (!dialog) return;

        const focusableElements = dialog.querySelectorAll<HTMLElement>(
          'button:not([disabled]), a[href], [tabindex]:not([tabindex="-1"])',
        );
        const firstElement = focusableElements[0];
        const lastElement = focusableElements[focusableElements.length - 1];
        if (!firstElement || !lastElement) return;

        if (event.shiftKey && document.activeElement === firstElement) {
          event.preventDefault();
          lastElement.focus();
        } else if (!event.shiftKey && document.activeElement === lastElement) {
          event.preventDefault();
          firstElement.focus();
        }
      }
    }

    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [activeIndex, closeLightbox, media.length, resetLightboxVideoControls]);

  useEffect(() => {
    if (!isLightboxOpen) return;

    const root = document.getElementById("root");
    const wasInert = root?.inert ?? false;
    root?.setAttribute("inert", "");
    const focusFrame = window.requestAnimationFrame(() => {
      lightboxCloseRef.current?.focus();
    });

    return () => {
      window.cancelAnimationFrame(focusFrame);
      if (root) {
        if (wasInert) root.setAttribute("inert", "");
        else root.removeAttribute("inert");
      }
      window.requestAnimationFrame(() => {
        lightboxOpenerRef.current?.focus();
      });
    };
  }, [isLightboxOpen]);

  useEffect(() => {
    onLightboxChange(activeIndex !== null);
  }, [activeIndex, onLightboxChange]);

  useEffect(() => {
    if (activeMedia?.type !== "video") return;
    const video = lightboxVideoRef.current;
    if (!video) return;

    if (prefersReducedMotion) {
      video.pause();
      return;
    }

    void video.play().catch(() => {});
  }, [activeMedia?.src, activeMedia?.type, prefersReducedMotion]);

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
              !window.matchMedia("(prefers-reduced-motion: reduce)").matches &&
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
              alt={
                item.description ??
                (category === "wedding"
                  ? "Bröllopsmakeup och hårstyling"
                  : "Makeup och hårstyling för produktion och event")
              }
              width={item.width}
              height={item.height}
              loadImmediately={isVisible && priorityImages.has(item.src)}
            />
          ) : (
            <LazyPortfolioVideo
              src={item.src}
              accessibleLabel={
                item.description ??
                (category === "wedding"
                  ? "Bröllopsmakeup och hårstyling"
                  : "Makeup och hårstyling för produktion och event")
              }
              width={item.width}
              height={item.height}
              isVisible={isVisible}
              userPlaying={userPlayingVideos.has(item.src)}
              isTouchInput={isTouchInput}
            />
          )}

          <button
            className="portfolio-open"
            type="button"
            onClick={(event) => openMedia(event, index)}
            aria-label={`Öppna ${
              item.type === "image" ? "bild" : "video"
            }: ${
              item.description ??
              (category === "wedding"
                ? "Bröllopsmakeup och hårstyling"
                : "Makeup och hårstyling för produktion och event")
            }`}
          />

          {item.type === "video" && (
            <button
              className="portfolio-video-play"
              type="button"
              onClick={(event) => toggleVideo(event, item.src)}
              aria-label={
                userPlayingVideos.has(item.src)
                  ? "Pausa videoförhandsvisning"
                  : "Spela videoförhandsvisning"
              }
              aria-pressed={userPlayingVideos.has(item.src)}
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
          ref={lightboxDialogRef}
          role="dialog"
          aria-modal="true"
          aria-label="Portfolio, bildvisare"
          aria-describedby={
            activeMedia.description ? "lightbox-caption" : undefined
          }
          onKeyDownCapture={(event) => {
            if (event.key !== " " && event.code !== "Space") return;
            event.preventDefault();
            event.stopPropagation();
            if (activeMedia.type === "video") {
              toggleLightboxVideoFromControl();
            }
          }}
          onTouchStartCapture={startLightboxTouch}
          onTouchEndCapture={finishLightboxTouch}
          onTouchCancelCapture={() => {
            lightboxTouchStart.current = null;
          }}
        >
          <button
            className="lightbox-close"
            ref={lightboxCloseRef}
            type="button"
            onClick={closeLightbox}
            aria-label="Stäng bildvisaren"
          >
            <X size={26} />
          </button>

          <button
            className="lightbox-side lightbox-side--previous"
            type="button"
            onClick={showPrevious}
            aria-label="Föregående bild eller video"
          >
            <span className="lightbox-arrow-icon">
              <ChevronLeft size={26} />
            </span>
          </button>

          <figure
            className="lightbox-figure"
            onPointerMove={revealLightboxControls}
            onPointerDown={revealLightboxControls}
            onPointerDownCapture={startLightboxSwipe}
            onPointerUpCapture={finishLightboxSwipe}
            onPointerCancelCapture={() => {
              lightboxSwipeStart.current = null;
            }}
          >
            {activeMedia.type === "image" ? (
              isTouchInput ? (
                <div
                  className="lightbox-image-wrap"
                  style={{ "--zoom-x": `${zoomOrigin.x}%`, "--zoom-y": `${zoomOrigin.y}%` } as React.CSSProperties}
                >
                  <img
                    key={activeMedia.src}
                    src={activeMedia.src}
                    alt={
                      activeMedia.description ??
                      (category === "wedding"
                        ? "Bröllopsmakeup och hårstyling"
                        : "Makeup och hårstyling för produktion och event")
                    }
                    className="lightbox-image"
                    decoding="async"
                    draggable={false}
                  />
                </div>
              ) : (
                <button
                  className={`lightbox-image-wrap ${isZoomed ? "is-zoomed" : ""}`}
                  type="button"
                  aria-label={
                    isZoomed
                      ? "Återställ zoom för bilden"
                      : "Zooma in på bilden"
                  }
                  onClick={toggleImageZoom}
                  style={{ "--zoom-x": `${zoomOrigin.x}%`, "--zoom-y": `${zoomOrigin.y}%` } as React.CSSProperties}
                >
                  <img
                    key={activeMedia.src}
                    src={activeMedia.src}
                    alt={
                      activeMedia.description ??
                      (category === "wedding"
                        ? "Bröllopsmakeup och hårstyling"
                        : "Makeup och hårstyling för produktion och event")
                    }
                    className="lightbox-image"
                    decoding="async"
                    draggable={false}
                  />
                </button>
              )
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
                aria-describedby={
                  activeMedia.description ? "lightbox-caption" : undefined
                }
                muted
                playsInline
                loop
                preload="auto"
                tabIndex={0}
                aria-keyshortcuts="Space"
                aria-label={`Video: ${
                  activeMedia.description ??
                  (category === "wedding"
                    ? "Bröllopsmakeup och/eller hårstyling"
                    : "Makeup och/eller hårstyling för produktion och event")
                }. Tryck på mellanslag för att spela eller pausa.`}
                onClick={handleLightboxVideoClick}
                onPlay={() => {
                  setIsLightboxVideoPlaying(true);
                  if (isTouchInput) {
                    lightboxControlsRequested.current = false;
                    clearLightboxControlsTimeout();
                    setShowLightboxVideoControls(false);
                  } else {
                    setShowLightboxVideoControls(true);
                    hideLightboxControlsSoon();
                  }
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
                className={`lightbox-video-toggle${
                  shouldShowLightboxVideoControl ? "" : " is-hidden"
                }`}
                type="button"
                aria-label={
                  isLightboxVideoPlaying ? "Pausa video" : "Spela video"
                }
                onClick={toggleLightboxVideoFromControl}
              >
                {isLightboxVideoPlaying ? <Pause size={28} fill="currentColor" /> : <Play size={28} fill="currentColor" />}
              </button>
              </>
            )}
          </figure>

          {activeMedia.description && (
            <p className="lightbox-caption" id="lightbox-caption">
              {activeMedia.description}
            </p>
          )}

          <button
            className="lightbox-side lightbox-side--next"
            type="button"
            onClick={showNext}
            aria-label="Nästa bild eller video"
          >
            <span className="lightbox-arrow-icon">
              <ChevronRight size={26} />
            </span>
          </button>

          <span className="lightbox-counter" aria-live="polite" aria-atomic="true">
            {activeIndex + 1} av {media.length}
          </span>
        </div>
      ), document.body)}
    </div>
  );
}

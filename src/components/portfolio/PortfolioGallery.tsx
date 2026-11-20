
import { useCallback, useEffect, useLayoutEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import type {
  MouseEvent,
  PointerEvent as ReactPointerEvent,
  RefObject,
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

const lightboxMediaVariants = {
  enter: (direction: number) => ({
    opacity: 0,
    x: direction * 24,
  }),
  visible: {
    opacity: 1,
    x: 0,
  },
  exit: (direction: number) => ({
    opacity: 0,
    x: direction * -24,
  }),
};

type LightboxThumbnailProps = {
  item: PortfolioMedia;
  index: number;
  total: number;
  category: PortfolioCategory;
  isActive: boolean;
  prefersReducedMotion: boolean;
  observerRoot: RefObject<HTMLDivElement | null>;
  onSelect: (index: number) => void;
};

function LightboxThumbnail({
  item,
  index,
  total,
  category,
  isActive,
  prefersReducedMotion,
  observerRoot,
  onSelect,
}: LightboxThumbnailProps) {
  const buttonRef = useRef<HTMLButtonElement>(null);
  const [shouldLoadVideo, setShouldLoadVideo] = useState(false);
  const [videoFrameReady, setVideoFrameReady] = useState(false);
  const [videoError, setVideoError] = useState(false);

  useEffect(() => {
    if (item.type !== "video") return;
    const element = buttonRef.current;
    if (!element || !("IntersectionObserver" in window)) {
      setShouldLoadVideo(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setShouldLoadVideo(true);
          observer.disconnect();
        }
      },
      { root: observerRoot.current, rootMargin: "80px" },
    );

    observer.observe(element);
    return () => observer.disconnect();
  }, [item.type, observerRoot]);

  const accessibleName = item.description
    ? `Visa ${item.type === "video" ? "video" : "bild"} ${index + 1} av ${total}: ${item.description}`
    : `Visa ${item.type === "video" ? "video" : "bild"} ${index + 1} av ${total} i ${
        category === "wedding" ? "Bröllop" : "Produktion/Event"
      }`;

  return (
    <motion.button
      className={`lightbox-thumbnail${isActive ? " is-active" : ""}`}
      ref={buttonRef}
      data-media-index={index}
      type="button"
      aria-label={accessibleName}
      aria-current={isActive ? "true" : undefined}
      title={item.description ?? accessibleName}
      onClick={() => onSelect(index)}
      whileHover={!prefersReducedMotion ? { y: -2 } : undefined}
      transition={{
        duration: prefersReducedMotion ? 0 : 0.2,
        ease: [0.4, 0, 0.2, 1],
      }}
    >
      {item.type === "image" ? (
        <picture>
          {item.thumbnailWebpSrcSet && (
            <source
              type="image/webp"
              srcSet={item.thumbnailWebpSrcSet}
              sizes={item.thumbnailSizes}
            />
          )}
          <img
            src={item.thumbnailSrc ?? item.src}
            srcSet={item.thumbnailSrcSet}
            sizes={item.thumbnailSizes}
            alt=""
            loading="lazy"
            decoding="async"
          />
        </picture>
      ) : (
        <>
          {shouldLoadVideo && !videoError && (
            <video
              src={item.src}
              muted
              playsInline
              preload="metadata"
              tabIndex={-1}
              aria-hidden="true"
              onLoadedMetadata={(event) => {
                const video = event.currentTarget;
                if (video.duration > 0) {
                  video.currentTime = Math.min(0.1, video.duration / 2);
                }
              }}
              onSeeked={(event) => {
                event.currentTarget.pause();
                setVideoFrameReady(true);
              }}
              onError={() => setVideoError(true)}
            />
          )}
          {(!videoFrameReady || videoError) && (
            <span className="lightbox-thumbnail__video-placeholder" />
          )}
          <span
            className="lightbox-thumbnail__play"
            aria-hidden="true"
          >
            <Play size={14} fill="currentColor" />
          </span>
        </>
      )}
      {isActive && (
        <motion.span
          className="lightbox-thumbnail__active-indicator"
          layoutId="lightbox-active-thumbnail"
          transition={
            prefersReducedMotion
              ? { duration: 0 }
              : { type: "spring", stiffness: 420, damping: 34 }
          }
          aria-hidden="true"
        />
      )}
    </motion.button>
  );
}

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
  const [navigationDirection, setNavigationDirection] = useState<1 | -1>(1);
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
  const lightboxThumbnailsRef = useRef<HTMLDivElement>(null);
  const lightboxMediaContentRef = useRef<HTMLDivElement>(null);
  const lightboxCaptionRef = useRef<HTMLParagraphElement>(null);
  const lightboxMediaResizeObserver = useRef<ResizeObserver | null>(null);
  const captionMeasureFrame = useRef<number | null>(null);
  const [captionOverlapsMedia, setCaptionOverlapsMedia] = useState(false);

  const measureCaptionOverlap = useCallback(() => {
    const mediaBounds = lightboxMediaContentRef.current?.getBoundingClientRect();
    const captionBounds = lightboxCaptionRef.current?.getBoundingClientRect();
    const overlaps = Boolean(
      mediaBounds &&
        captionBounds &&
        mediaBounds.bottom > captionBounds.top &&
        mediaBounds.top < captionBounds.bottom,
    );

    setCaptionOverlapsMedia((current) => current === overlaps ? current : overlaps);
  }, []);

  const setLightboxMediaContentRef = useCallback(
    (element: HTMLDivElement | null) => {
      lightboxMediaResizeObserver.current?.disconnect();
      lightboxMediaResizeObserver.current = null;
      if (captionMeasureFrame.current !== null) {
        window.cancelAnimationFrame(captionMeasureFrame.current);
        captionMeasureFrame.current = null;
      }

      lightboxMediaContentRef.current = element;
      if (!element) {
        window.removeEventListener("resize", measureCaptionOverlap);
        return;
      }

      const observer = new ResizeObserver(measureCaptionOverlap);
      observer.observe(element);
      if (lightboxCaptionRef.current) {
        observer.observe(lightboxCaptionRef.current);
      }
      lightboxMediaResizeObserver.current = observer;
      window.addEventListener("resize", measureCaptionOverlap);
      captionMeasureFrame.current = window.requestAnimationFrame(
        measureCaptionOverlap,
      );
    },
    [measureCaptionOverlap],
  );

  const setLightboxCaptionRef = useCallback(
    (element: HTMLParagraphElement | null) => {
      lightboxCaptionRef.current = element;
      if (!element) return;

      lightboxMediaResizeObserver.current?.observe(element);
      if (captionMeasureFrame.current !== null) {
        window.cancelAnimationFrame(captionMeasureFrame.current);
      }
      captionMeasureFrame.current = window.requestAnimationFrame(
        measureCaptionOverlap,
      );
    },
    [measureCaptionOverlap],
  );

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

  useLayoutEffect(() => {
    const track = lightboxThumbnailsRef.current;
    if (activeIndex === null || !track) return;

    const activeThumbnail = track.querySelector<HTMLButtonElement>(
      `[data-media-index="${activeIndex}"]`,
    );
    if (!track || !activeThumbnail) return;

    const trackBounds = track.getBoundingClientRect();
    const thumbnailBounds = activeThumbnail.getBoundingClientRect();
    track.scrollTo({
      left:
        track.scrollLeft +
        thumbnailBounds.left -
        trackBounds.left +
        thumbnailBounds.width / 2 -
        track.clientWidth / 2,
      behavior: prefersReducedMotion ? "auto" : "smooth",
    });
  }, [activeIndex, prefersReducedMotion]);

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
    lightboxVideoRef.current?.pause();
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
    setNavigationDirection(-1);
    resetLightboxVideoControls();
    setActiveIndex((current) =>
      current === null
        ? null
        : (current - 1 + media.length) % media.length,
    );
  }

  function showNext() {
    setNavigationDirection(1);
    resetLightboxVideoControls();
    setActiveIndex((current) =>
      current === null ? null : (current + 1) % media.length,
    );
  }

  function showMediaAt(index: number) {
    if (activeIndex === index) return;
    setNavigationDirection(index > (activeIndex ?? 0) ? 1 : -1);
    resetLightboxVideoControls();
    setActiveIndex(index);
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
    if (
      event.target instanceof Element &&
      event.target.closest(".lightbox-thumbnails")
    ) {
      lightboxTouchStart.current = null;
      return;
    }

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
    const video = lightboxVideoRef.current;
    if (!video) return;

    if (prefersReducedMotion) {
      video.pause();
    } else {
      void video.play().catch(() => {});
    }
  }, [prefersReducedMotion]);

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
        <motion.div
          className={`portfolio-item${userPlayingVideos.has(item.src) ? " is-playing" : ""}`}
          key={item.src}
          whileHover={
            !prefersReducedMotion && !isTouchInput ? { y: -3 } : undefined
          }
          transition={{
            duration: prefersReducedMotion ? 0 : 0.22,
            ease: [0.4, 0, 0.2, 1],
          }}
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
              src={item.thumbnailSrc ?? item.src}
              srcSet={item.thumbnailSrcSet}
              webpSrcSet={item.thumbnailWebpSrcSet}
              sizes={item.thumbnailSizes}
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
        </motion.div>
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
    <div>
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
            <AnimatePresence
              initial={false}
              mode="wait"
              custom={prefersReducedMotion ? 0 : navigationDirection}
            >
              <motion.div
                className="lightbox-media-transition"
                key={activeMedia.src}
                custom={prefersReducedMotion ? 0 : navigationDirection}
                variants={lightboxMediaVariants}
                initial="enter"
                animate="visible"
                exit="exit"
                transition={{
                  duration: prefersReducedMotion ? 0 : 0.28,
                  ease: [0.4, 0, 0.2, 1],
                }}
              >
                <div
                  className={`lightbox-media-content${captionOverlapsMedia ? " has-caption-overlap" : ""}`}
                  ref={setLightboxMediaContentRef}
                >
                  {activeMedia.type === "image" ? (
                    isTouchInput ? (
                      <div
                        className="lightbox-image-wrap"
                        style={{ "--zoom-x": `${zoomOrigin.x}%`, "--zoom-y": `${zoomOrigin.y}%` } as React.CSSProperties}
                      >
                        <img
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
                        onLoadedData={(event) => {
                          if (!prefersReducedMotion) {
                            void event.currentTarget.play().catch(() => {});
                          }
                        }}
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
                </div>
              </motion.div>
            </AnimatePresence>
          </figure>

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

          {activeMedia.description && (
            <p
              className="lightbox-caption"
              id="lightbox-caption"
              ref={setLightboxCaptionRef}
            >
              {activeMedia.description}
            </p>
          )}

          <div
            className="lightbox-thumbnails"
            ref={lightboxThumbnailsRef}
            role="group"
            aria-label="Välj bild eller video"
          >
            <div className="lightbox-thumbnails__track">
              {media.map((item, index) => (
                <LightboxThumbnail
                  key={item.src}
                  item={item}
                  index={index}
                  total={media.length}
                  category={category}
                  isActive={index === activeIndex}
                  prefersReducedMotion={prefersReducedMotion}
                  observerRoot={lightboxThumbnailsRef}
                  onSelect={showMediaAt}
                />
              ))}
            </div>
          </div>
        </div>
      ), document.body)}
    </div>
  );
}

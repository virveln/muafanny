import "./LazyPortfolioVideo.css";
import { useEffect, useRef, useState } from "react";

type LazyPortfolioVideoProps = {
  src: string;
  filename: string;
  width?: number;
  height?: number;
  isVisible: boolean;
  userPlaying: boolean;
  loadImmediately?: boolean;
};

export function LazyPortfolioVideo({
  src,
  filename,
  width,
  height,
  isVisible,
  userPlaying,
  loadImmediately = false,
}: LazyPortfolioVideoProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  const [shouldLoad, setShouldLoad] = useState(loadImmediately);
  const [loaded, setLoaded] = useState(false);
  const [error, setError] = useState(false);

  // Load video metadata immediately when requested,
  // otherwise wait until the video approaches the viewport.
  useEffect(() => {
    if (loadImmediately) {
      setShouldLoad(true);
      return;
    }

    const element = containerRef.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setShouldLoad(true);
          observer.disconnect();
        }
      },
      { rootMargin: "300px 0px" },
    );

    observer.observe(element);

    return () => observer.disconnect();
  }, [loadImmediately]);

  // Only play while the pointer is over a visible video.
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    if (isVisible && userPlaying) {
      void video.play().catch(() => {});
    } else {
      video.pause();
      video.currentTime = 0;
    }
  }, [isVisible, userPlaying, loaded]);

  return (
    <div
      ref={containerRef}
      className={`portfolio-video-container ${
        loaded ? "is-loaded" : ""
      }`}
      style={width && height ? { aspectRatio: `${width} / ${height}` } : undefined}
    >
      {shouldLoad && !loaded && !error && (
        <div className="portfolio-image-loader">
          <span className="portfolio-spinner" />
        </div>
      )}

      {shouldLoad && (
        <video
          ref={videoRef}
          src={src}
          width={width}
          height={height}
          muted
          playsInline
          loop
          preload="metadata"
          aria-label={`Portfolio video: ${filename}`}
          onLoadedData={() => setLoaded(true)}
          onError={() => setError(true)}
        />
      )}

      {error && (
        <div className="portfolio-image-error">
          Video could not be loaded
        </div>
      )}
    </div>
  );
}
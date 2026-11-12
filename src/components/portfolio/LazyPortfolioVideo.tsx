import "./LazyPortfolioVideo.css";
import { useEffect, useRef, useState } from "react";

type LazyPortfolioVideoProps = {
  src: string;
  filename: string;
  width?: number;
  height?: number;
  isVisible: boolean;
  userPlaying: boolean;
};

export function LazyPortfolioVideo({
  src,
  filename,
  width,
  height,
  isVisible,
  userPlaying,
}: LazyPortfolioVideoProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [hasEnteredViewport, setHasEnteredViewport] = useState(
    () => !("IntersectionObserver" in window),
  );
  const [loaded, setLoaded] = useState(false);
  const [error, setError] = useState(false);
  const shouldLoad = isVisible && hasEnteredViewport;

  useEffect(() => {
    const element = containerRef.current;
    if (!isVisible || !element || !("IntersectionObserver" in window)) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setHasEnteredViewport(true);
          observer.disconnect();
        }
      },
      { rootMargin: "100px 0px" },
    );

    observer.observe(element);
    return () => observer.disconnect();
  }, [isVisible]);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    if (isVisible && userPlaying) void video.play().catch(() => {});
    else {
      video.pause();
      video.currentTime = 0;
    }
  }, [isVisible, userPlaying]);

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

      {shouldLoad && !error && (
        <video
          ref={videoRef}
          src={src}
          width={width}
          height={height}
          muted
          playsInline
          loop
          preload={userPlaying ? "auto" : "metadata"}
          aria-label={`Portfolio video: ${filename}`}
          onLoadedData={() => setLoaded(true)}
          onError={() => setError(true)}
        />
      )}

      {shouldLoad && error && (
        <div className="portfolio-image-error">
          Video could not be loaded
        </div>
      )}
    </div>
  );
}
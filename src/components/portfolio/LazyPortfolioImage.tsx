import { useEffect, useRef, useState } from "react";
import "./LazyPortfolioImage.css";

type LazyPortfolioImageProps = {
  src: string;
  alt: string;
  width?: number;
  height?: number;
  loadImmediately?: boolean;
};

export function LazyPortfolioImage({
  src,
  alt,
  width,
  height,
  loadImmediately = false,
}: LazyPortfolioImageProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [hasEnteredViewport, setHasEnteredViewport] = useState(
    () => !("IntersectionObserver" in window),
  );
  const [loaded, setLoaded] = useState(false);
  const [error, setError] = useState(false);
  const shouldLoad = loadImmediately || hasEnteredViewport;

  useEffect(() => {
    if (loadImmediately) return;
    const element = containerRef.current;
    if (!element) return;
    if (!("IntersectionObserver" in window)) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setHasEnteredViewport(true);
          observer.disconnect();
        }
      },
      {
        rootMargin: "300px 0px",
        threshold: 0,
      }
    );

    observer.observe(element);

    return () => observer.disconnect();
  }, [loadImmediately]);

  return (
    <div
      ref={containerRef}
      className={`portfolio-image-container ${
        loaded ? "is-loaded" : ""
      } ${loadImmediately}`}
      style={width && height ? { aspectRatio: `${width} / ${height}` } : undefined}
    >
      {shouldLoad && !loaded && !error && (
        <div className="portfolio-image-loader">
          <span className="portfolio-spinner" />
        </div>
      )}

      {shouldLoad && (
        <img
          src={src}
          alt={alt}
          width={width}
          height={height}
          loading={loadImmediately ? "eager" : "lazy"}
          fetchPriority={loadImmediately ? "high" : "auto"}
          decoding="async"
          onLoad={() => setLoaded(true)}
          onError={() => setError(true)}
        />
      )}

      {error && (
        <div className="portfolio-image-error">
          Image could not be loaded
        </div>
      )}
    </div>
  );
}

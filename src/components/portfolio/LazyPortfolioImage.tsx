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
  const [shouldLoad, setShouldLoad] = useState(loadImmediately);
  const [loaded, setLoaded] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    if (loadImmediately) {
        setShouldLoad(true);
        return;
    }
    const element = containerRef.current;
    if (!element) return;

    if (!("IntersectionObserver" in window)) {
      setShouldLoad(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setShouldLoad(true);
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
          loading="eager"
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

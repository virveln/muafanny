import { useEffect, useRef, useState } from "react";
import "./LazyPortfolioImage.css";

type LazyPortfolioImageProps = {
  src: string;
  alt: string;
  loadImmediately?: boolean;
};

export function LazyPortfolioImage({
  src,
  alt,
  loadImmediately = false,
}: LazyPortfolioImageProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [shouldLoad, setShouldLoad] = useState(false);
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
          loading="eager"
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

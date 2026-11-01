import { startupPortfolioImages } from "../data/portfolioMedia";

let scheduled = false;
const activePreloads = new Set<HTMLImageElement>();

type NetworkInformation = {
  saveData?: boolean;
  effectiveType?: string;
};

export function schedulePortfolioImagePreload() {
  if (scheduled || typeof window === "undefined" || typeof navigator === "undefined") {
    return;
  }

  const connection = (navigator as Navigator & {
    connection?: NetworkInformation;
  }).connection;

  if (
    connection?.saveData ||
    connection?.effectiveType === "slow-2g" ||
    connection?.effectiveType === "2g"
  ) {
    scheduled = true;
    return;
  }

  scheduled = true;
  let nextIndex = 0;

  const loadNextImage = () => {
    const item = startupPortfolioImages[nextIndex++];
    if (!item) return;

    const image = new Image();
    activePreloads.add(image);
    image.fetchPriority = "low";
    image.decoding = "async";
    image.onload = image.onerror = () => activePreloads.delete(image);
    image.src = item.src;

    if (nextIndex < startupPortfolioImages.length) {
      scheduleIdle(loadNextImage);
    }
  };

  scheduleIdle(loadNextImage);
}

function scheduleIdle(callback: () => void) {
  const idleWindow = window as Window & {
    requestIdleCallback?: (
      callback: () => void,
      options?: { timeout: number },
    ) => number;
  };

  if (idleWindow.requestIdleCallback) {
    idleWindow.requestIdleCallback(callback, { timeout: 2000 });
  } else {
    window.setTimeout(callback, 700);
  }
}
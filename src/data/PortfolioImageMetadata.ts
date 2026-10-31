
export type PortfolioImageMetadata = {
  title?: string;
  tag?: string;
};

export const portfolioMetadata: Record<
  string,
  PortfolioImageMetadata
> = {
  "wedding-01.jpg": {
    title: "A summer wedding",
    tag: "Wedding",
  },

  "portrait-01.webp": {
    title: "Natural light portrait",
    tag: "Portrait",
  },

  "editorial-01.jpg": {
    title: "Editorial story",
    tag: "Editorial",
  },
};

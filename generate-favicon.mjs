
import { createElement } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { Sparkles } from "lucide-react";
import { writeFileSync } from "node:fs";

const svg = renderToStaticMarkup(
  createElement(Sparkles, {
    color: "#a7533d",
    size: 24,
    strokeWidth: 2,
  })
);

writeFileSync("public/favicon.svg", svg);

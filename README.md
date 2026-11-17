# React + TypeScript + Vite

## Media workflow

Add portfolio images to `src/assets/portfolio/wedding` or
`src/assets/portfolio/production`. The image optimizer discovers them
automatically and generates content-hashed WebP and JPEG thumbnails at
responsive widths, plus intrinsic dimensions. It runs before `npm run dev` and
`npm run build`; generated files are not source files and should not be
committed.

The original images remain in `src/assets/portfolio` for full-resolution
viewing. Videos also remain original, are emitted with Vite's hashed filenames,
and are loaded only as they approach the viewport. Add videos to either
portfolio folder; when adding one, record its dimensions in
`videoDimensions` in `src/data/portfolioMedia.ts` to reserve its aspect ratio.
Add portrait changes to `src/assets/fanny.jpg`; its optimized responsive
variants and preload are generated from that source.

This template provides a minimal setup to get React working in Vite with HMR and some Oxlint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Oxc](https://oxc.rs)
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/)

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the Oxlint configuration

If you are developing a production application, we recommend enabling type-aware lint rules by installing `oxlint-tsgolint` and editing `.oxlintrc.json`:

```json
{
  "$schema": "./node_modules/oxlint/configuration_schema.json",
  "plugins": ["react", "typescript", "oxc"],
  "options": {
    "typeAware": true
  },
  "rules": {
    "react/rules-of-hooks": "error",
    "react/only-export-components": ["warn", { "allowConstantExport": true }]
  }
}
```

See the [Oxlint rules documentation](https://oxc.rs/docs/guide/usage/linter/rules) for the full list of rules and categories.

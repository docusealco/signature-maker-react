const { build } = require("esbuild");

const shared = {
  bundle: true,
  entryPoints: ["./src/index.ts"],
  packages: "external",
  logLevel: "info",
  minify: true,
  sourcemap: false,
  target: "es2020",
};

Promise.all([
  build({ ...shared, format: "esm", outfile: "./dist/index.esm.js" }),
  build({ ...shared, format: "cjs", outfile: "./dist/index.cjs.js" }),
]);

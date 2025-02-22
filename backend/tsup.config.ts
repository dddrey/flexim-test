import { defineConfig } from "tsup";

export default defineConfig({
  entry: ["src/server.ts"],
  format: ["cjs"],
  outDir: "dist",
  sourcemap: true,
  clean: true,
  minify: false,
  dts: true,
  watch: process.env.NODE_ENV === "development",
});

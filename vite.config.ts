import { defineConfig } from "vitest/config";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  build: {
    sourcemap: false,
    // Budget: il bundle JS iniziale deve restare sotto ~240 kB non compressi (~80 kB gzip).
    chunkSizeWarningLimit: 240,
  },
  test: {
    include: ["tests/**/*.test.ts"],
  },
});

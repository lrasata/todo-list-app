/// <reference types="vitest" />
/// <reference types="vite/client" />

import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  test: {
    environment: "jsdom", // ✅ This line fixes the issue
    globals: true, // optional, so you can use `describe`, `test` etc. without importing them
    setupFiles: ["./src/test/setup.ts"], // optional setup file for things like jest-dom
  },
});

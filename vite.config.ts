import deno from "@deno/vite-plugin"
import { reactRouter } from "@react-router/dev/vite"
import { defineConfig } from "vite"
import tailwindcss from "@tailwindcss/vite"
import { vercelPreset } from '@vercel/react-router/vite';

export default defineConfig({
  plugins: [deno(), tailwindcss(), reactRouter(), vercelPreset()],
})

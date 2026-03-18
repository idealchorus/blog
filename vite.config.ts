import { unstable_reactRouterRSC as reactRouterRSC } from "@react-router/dev/vite"
import rsc from "@vitejs/plugin-rsc"
import { defineConfig } from "vite-plus"
import tailwindcss from "@tailwindcss/vite"

export default defineConfig({
  staged: {
    "*": "vp check --fix",
  },
  lint: { options: { typeAware: true, typeCheck: true } },
  fmt: { semi: false },
  plugins: [tailwindcss(), reactRouterRSC(), rsc()],
})

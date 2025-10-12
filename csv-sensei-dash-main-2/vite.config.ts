import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";

// Vite config
export default defineConfig(({ mode }) => ({
  define: {
    'import.meta.env.VITE_CHATBOT_API_URL': JSON.stringify(
      mode === 'production' 
        ? process.env.VITE_CHATBOT_API_URL || 'https://your-chatbot-backend.onrender.com/api/chat'
        : '/chatbot-api/chat'
    ),
    'import.meta.env.VITE_API_URL': JSON.stringify(
      mode === 'production'
        ? process.env.VITE_API_URL || 'https://veerifyai-4.onrender.com/api'
        : 'http://localhost:4000/api'
    ),
  },
  server: {
    host: "::",
    port: 8080,
    proxy: {
      "/api": {
        target: "http://localhost:4000",
        changeOrigin: true,
      },
      "/chatbot-api": {
        target: "http://localhost:5000",
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/chatbot-api/, '/api'),
      },
    },
  },
  plugins: [
    react(),
  ],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  build: {
    outDir: 'dist',
    sourcemap: false,
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['react', 'react-dom'],
          ui: ['@radix-ui/react-dialog', '@radix-ui/react-dropdown-menu'],
          charts: ['recharts'],
        },
      },
    },
  },
}));

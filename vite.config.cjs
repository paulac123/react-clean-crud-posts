const { defineConfig } = require("vite");

module.exports = defineConfig(async () => {
  // Import dinámico del plugin React (ES Module)
  const react = (await import("@vitejs/plugin-react")).default;

  return {
    plugins: [react()],
    server: {
      port: 5173,
    },
    build: {
      outDir: "dist",
    },
  };
});

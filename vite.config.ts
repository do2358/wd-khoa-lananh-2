import tailwindcss from '@tailwindcss/vite';
import { devtools } from '@tanstack/devtools-vite';
import { tanstackStart } from '@tanstack/react-start/plugin/vite';
import viteReact from '@vitejs/plugin-react';
import { nitro } from 'nitro/vite';
import { type UserConfig, defineConfig, loadEnv } from 'vite';
import viteCompression from 'vite-plugin-compression';
import viteTsConfigPaths from 'vite-tsconfig-paths';

const config = defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '');
  const isHttps = env.VITE_HTTPS === 'true' || env.VITE_HTTPS === '1';
  const isDev = mode === 'development';

  return {
    plugins: [
      // Only load devtools in development
      isDev && devtools(),
      viteTsConfigPaths({
        projects: ['./tsconfig.json'],
      }),
      tailwindcss(),
      tanstackStart({
        router: { routeToken: '_layout' },
      }),
      nitro(),
      viteReact({
        // Speed up Fast Refresh
        babel: {
          plugins: isDev ? [] : undefined,
        },
      }),
      // Gzip compression for production
      !isDev &&
        viteCompression({
          verbose: true,
          disable: false,
          threshold: 10240, // Only compress files larger than 10kb
          algorithm: 'gzip',
          ext: '.gz',
          deleteOriginFile: false,
        }),
      // Brotli compression for production (better compression than gzip)
      !isDev &&
        viteCompression({
          verbose: true,
          disable: false,
          threshold: 10240,
          algorithm: 'brotliCompress',
          ext: '.br',
          deleteOriginFile: false,
        }),
    ].filter(Boolean),

    ssr: {
      optimizeDeps: {
        include: ['framer', 'lodash', '@rc-component/image'],
      },
      noExternal: ['lodash', 'mac-scrollbar', '@rc-component/image'],
    },

    // Build optimizations
    build: {
      // Increase chunk size warning limit
      chunkSizeWarningLimit: 1000,
      // Enable minification
      minify: 'esbuild',

      // Source maps only in development
      sourcemap: isDev,

      // Target modern browsers for smaller bundle
      target: 'esnext',

      // CSS code splitting
      cssCodeSplit: true,

      // Reduce CSS size
      cssMinify: true,
    },

    server: {
      // Conditionally enable HTTPS
      ...(isHttps ? { https: {} } : {}),

      // Optimize HMR
      watch: {
        // Only use polling if needed (WSL, Docker, etc.)
        usePolling: env.VITE_USE_POLLING === 'true',
        interval: 100,
        // Ignore node_modules for better performance
        ignored: ['**/node_modules/**', '**/.git/**'],
      },

      hmr: {
        host: 'localhost',
        protocol: isHttps ? 'wss' : 'ws',
        // Add overlay for better DX
        overlay: true,
      },
      // Enable cors if needed
      cors: true,
      // Compression for dev server
      compress: true,
    },

    // Resolve optimizations
    resolve: {
      // Deduplicate packages
      dedupe: ['react', 'react-dom'],
    },

    // Enable esbuild for faster transforms
    esbuild: {
      logOverride: { 'this-is-undefined-in-esm': 'silent' },
      // Remove console.log in production
      ...(isDev
        ? {}
        : {
            drop: ['console', 'debugger'],
          }),
    },
    // Performance hints
    logLevel: isDev ? 'info' : 'warn',
  } as UserConfig;
});

export default config;

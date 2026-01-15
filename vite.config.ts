import tailwindcss from '@tailwindcss/vite';
import { devtools } from '@tanstack/devtools-vite';
import { tanstackStart } from '@tanstack/react-start/plugin/vite';
import viteReact from '@vitejs/plugin-react';
import { nitro } from 'nitro/vite';
import { type UserConfig, defineConfig, loadEnv } from 'vite';
import viteTsConfigPaths from 'vite-tsconfig-paths';

const config = defineConfig(({ mode }) => {
  // Load env file based on `mode` in the current directory.
  // Set the third parameter to '' to load all env regardless of the `VITE_` prefix.
  const env = loadEnv(mode, process.cwd(), '');
  const isHttps = env.VITE_HTTPS === 'true' || env.VITE_HTTPS === '1';

  return {
    plugins: [
      devtools(),
      // this is the plugin that enables path aliases
      viteTsConfigPaths({
        projects: ['./tsconfig.json'],
      }),
      tailwindcss(),
      tanstackStart({
        router: { routeToken: '_layout' },
      }),
      nitro(),
      viteReact(),
    ],
    ssr: {
      optimizeDeps: { include: ['lodash'] },
      noExternal: ['lodash', 'mac-scrollbar'],
    },
    server: {
      // Conditionally enable HTTPS
      ...(isHttps ? { https: {} } : {}),
      watch: { usePolling: true, interval: 100 },
      hmr: { host: 'localhost', protocol: isHttps ? 'wss' : 'ws' },
    },
  } as UserConfig;
});

export default config;

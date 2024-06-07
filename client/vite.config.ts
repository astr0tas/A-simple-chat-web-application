import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react-swc'
import WindiCSS from 'vite-plugin-windicss'
import fs from 'fs';

export default defineConfig(({ command, mode }) =>
{
  // Remove error only
  command;

  // Load env file based on `mode` in the current working directory.
  // Set the third parameter to '' to load all env regardless of the `VITE_` prefix.
  const env = loadEnv(mode, process.cwd(), '')
  return {
    // vite config
    plugins: [react(), WindiCSS()],
    server: {
      //cors: true, // Just like CORS in express, it control permission of incoming requests, default value is true in this case
      host: true,
      port: 3000,
      ...((env.IS_HTTPS === "true" || false) ? {
        https: {
          key: fs.readFileSync(process.cwd() + env.KEY_PATH),
          cert: fs.readFileSync(process.cwd() + env.CERT_PATH),
        }
      } : {})
    }
  }
})

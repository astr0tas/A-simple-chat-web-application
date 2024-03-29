import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import WindiCSS from 'vite-plugin-windicss'
import fs from 'fs';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), WindiCSS()],
  server: {
    //cors: true, // Just like CORS in express, it control permission of incoming requests, default value is true in this case
    host: true,
    port: 3000,
    https: {
      key: fs.readFileSync('./cert/key.pem'),
      cert: fs.readFileSync('./cert/cert.pem'),
    }
  }
})

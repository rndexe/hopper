import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import Terminal from 'vite-plugin-terminal';

// https://vitejs.dev/config/
export default defineConfig({
    base: process.env.BASE_PATH ?? '',
    plugins: [
        react(),
        Terminal({
            console: 'terminal',
        }),
    ],
    server: {
        host: true,
    },
});

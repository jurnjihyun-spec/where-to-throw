import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// 상대 경로 빌드: GitHub Pages 하위 경로(/where-to-throw/aip02/)·Netlify 어디서든 동작
export default defineConfig({ base: './', plugins: [react()] });

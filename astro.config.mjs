// @ts-check
import { defineConfig } from 'astro/config';
import vercel from '@astrojs/vercel/serverless'; // <-- Importamos el adaptador de Vercel
import tailwindcss from '@tailwindcss/vite';

// https://astro.build/config
export default defineConfig({
  output: 'server', // <-- Importante para que funcione el adaptador serverless
  adapter: vercel({}),
 // <-- Lo conectamos aquí
  vite: {
    plugins: [tailwindcss()]
  }
});

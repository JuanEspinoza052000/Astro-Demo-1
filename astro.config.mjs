// @ts-check
import { defineConfig } from 'astro/config';
import vercel from '@astrojs/vercel/serverless'; // <-- Importamos el adaptador de Vercel
import tailwindcss from '@tailwindcss/vite';



import react from '@astrojs/react';



// https://astro.build/config
export default defineConfig({
  // <-- Importante para que funcione el adaptador serverless
  output: 'server',

  adapter: vercel({}),

  // <-- Lo conectamos aquí
  vite: {
    plugins: [tailwindcss()]
  },

  integrations: [react()]
});
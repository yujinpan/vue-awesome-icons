import vue from '@vitejs/plugin-vue2';
import vueJsx from '@vitejs/plugin-vue2-jsx';
import { resolve } from 'path';
import { defineConfig } from 'vite';
import vitePluginGA from 'vite-plugin-ga';

// https://vitejs.dev/config/
export default defineConfig({
  base: '/vue-awesome-icons/',
  plugins: [
    vue(),
    vueJsx(),
    vitePluginGA({
      id: 'G-S66MPLRFJZ',
    }),
  ],
  resolve: {
    alias: {
      '@': resolve('src'),
    },
  },
});

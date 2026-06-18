import { defineConfig } from 'vite';
import { resolve } from 'path';

export default defineConfig({
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
        about: resolve(__dirname, 'about.html'),
        classes: resolve(__dirname, 'classes.html'),
        workshops: resolve(__dirname, 'workshops.html'),
        students: resolve(__dirname, 'students.html'),
        contact: resolve(__dirname, 'contact.html'),
      },
    },
  },
});

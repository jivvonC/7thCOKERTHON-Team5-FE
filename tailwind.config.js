import { defineConfig } from 'tailwindcss';

export default defineConfig({
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx,css}'],
  theme: {
    extend: {
      fontFamily: {
        pretendard: ['Pretendard', 'system-ui', 'sans-serif'],
      },
    },
  },
});

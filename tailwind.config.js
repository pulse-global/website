/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{html,js,svelte,ts}'],
  theme: {
    extend: {
      colors: {
        primary: '#FF6D04',
        secondary: '#00ff00',
        tertiary: '#0000ff',
      },
      fontFamily: {
      'sans': ['"VCR OSD Mono"'],
      'serif': ['"VCR OSD Mono"'],
      'mono': ['"VCR OSD Mono"'],
      'display': ['"VCR OSD Mono"'],
      'body': ['"VCR OSD Mono"'],
    }
    },
  },
  plugins: [],
}


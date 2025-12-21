/** @type {import('tailwindcss').Config} */
export default {
	darkMode: 'class',
	content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
	theme: {
		extend: {
			colors: {
				primary: 'rgb(18 150 211)',
				secondary: 'rgb(4 15 57)',
				body: 'rgb(255 255 255)',
				accent: 'rgb(0 143 255)',
			},
			fontFamily: {
				sans: ['Archivo', 'sans-serif'],
				heading: ['Archivo', 'sans-serif'],
			},
			borderRadius: {
				DEFAULT: '0px',
			},
		},
	},
	plugins: [],
}

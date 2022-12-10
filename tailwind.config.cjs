/** @type {import('tailwindcss').Config} */
module.exports = {
	content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
	theme: {
		extend: {
			screens: {
				'3xl': '2000px',
				'4xl': '2600px',
				'5xl': '3100px',
				'6xl': '3700px',
				'7xl': '4300px',
			  },
		}
	},
	plugins: [],
}

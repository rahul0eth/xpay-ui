const config = {
	content: [
		"./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
		"./src/components/**/*.{js,ts,jsx,tsx,mdx}",
		"./src/app/**/*.{js,ts,jsx,tsx,mdx}",
	],
	theme: {
		screens: {
			xxs: "300px",
			xs: "365px",
			sm: "440px",
			smd: "552px",
			md: "768px",
			lg: "1024px",
			xl: "1280px",
		},
		extend: {
			colors: {
				"dark-600": "#000000",
				"dark-500": "#171717",
				"dark-400": "#1f1e1d",
				"dark-300": "#242321",
				"dark-200": "#302f2b",
				"dark-100": "#3d3a34",
				"light-400": "#b5b5b5",
				"light-300": "#d1d1d1",
				"light-200": "#e6e6e6",
				"light-100": "#ffffff",
				"primary-200": "#c98d02",
				"primary-100": "#f5ab00",
				"bad-accent": "#f5051d",
				"good-accent": "#04cc22",
			},
		},
	},
	plugins: [],
};
export default config;

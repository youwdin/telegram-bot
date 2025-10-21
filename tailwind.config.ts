import type { Config } from "tailwindcss";

export default <Partial<Config>>{
	theme: {
		extend: {
		},
	},
	mode: "jit",
	darkMode: "class",
	content: [
		"app/components/**/*.{vue,js,jsx,mjs,ts,tsx}",
		"app/layouts/**/*.{vue,js,jsx,mjs,ts,tsx}",
		"app/pages/**/*.{vue,js,jsx,mjs,ts,tsx}",
		"app/plugins/**/*.{js,ts,mjs}",
		"app/composables/**/*.{js,ts,mjs}",
		"app/utils/**/*.{js,ts,mjs}",
		"app/{A,a}pp.{vue,js,jsx,mjs,ts,tsx}",
		"app/{E,e}rror.{vue,js,jsx,mjs,ts,tsx}",
		"app/app.config.{js,ts,mjs}",
	],
	plugins: [],
	safelist: [
		{
			pattern: /(bg|text|border)-(background|surface)-(darkGrey|offWhite|white|grey|dark|light|low|mid|high)/,
		},
	],
};

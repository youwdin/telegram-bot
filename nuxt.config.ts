export default defineNuxtConfig({
	compatibilityDate: "2024-11-01",
  
	// Enable devtools in development mode
	...(process.env.ENV_TYPE === "development" && {
	  devtools: { enabled: true },
	}),
  
	// Ensure compatibility with Nuxt 4
	future: {
	  compatibilityVersion: 4,
	},
  
	// Nuxt modules
	modules: [
	  "@nuxtjs/tailwindcss",
	  "@pinia/nuxt",
	  "@nuxtjs/i18n",
	  "nuxt-svgo",
	  "@nuxtjs/google-fonts",
	  "@nuxt/image"
	],
  
	// Google Fonts configuration
	googleFonts: {
	  display: "swap",
	  outputDir: "./app/assets",
	  stylePath: "css/fonts.css",
	  families: {
		Inter: [200, 300, 400, 500, 600],
	  },
	},
  
	// Tailwind CSS configuration
	tailwindcss: {
	  cssPath: "~/assets/css/main.css",
	  configPath: "./tailwind.config",
	  ...(process.env.ENV_TYPE === "development" && {
		disableHMR: true,
		viewer: true,
	  }),
	},
  
	// i18n configuration
	i18n: {
	  vueI18n: "./i18n.config.ts",
	  locales: [
		{ code: "en", file: "en.json", name: "English" },
		{ code: "ms", file: "ms.json", name: "Bahasa" },
		{ code: "id", file: "id.json", name: "Indonesian" },
	  ],
	  langDir: "../app/assets/lang",
	  lazy: false,
	  defaultLocale: "en",
	  strategy: "no_prefix",
	  detectBrowserLanguage: {
		useCookie: true,
		cookieKey: "language",
		cookieSecure: true,
		redirectOn: "root",
	  },
	},
  
	// SVGO configuration
	svgo: {
	  autoImportPath: "~/assets/svg",
	  componentPrefix: "svg",
	},
  });
  
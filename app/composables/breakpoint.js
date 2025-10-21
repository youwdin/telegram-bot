// tailwind value default 'dont change'
const screens = {
	sm: 640,
	md: 768,
	lg: 1024,
	xl: 1280,
	"2xl": 1536,
};

const breakpoints = reactive({ w: 0, h: 0, is: "xs", data: {} });

const getBreakpoint = (width) => {
	if (width >= screens["2xl"]) return "2xl";
	if (width >= screens["xl"]) return "xl";
	if (width >= screens["lg"]) return "lg";
	if (width >= screens["md"]) return "md";
	if (width >= screens["sm"]) return "sm";
	return "";
};

const setBreakpoint = () => {
	breakpoints.w = window.outerWidth;
	breakpoints.h = window.outerHeight;
	breakpoints.is = getBreakpoint(window.outerWidth);
	breakpoints.data = createGridObject(window.outerWidth);
};

const inBrowser = typeof window !== "undefined";

const createGridObject = (width) => {
	const gridObject = Object.keys(screens).reduce((accumulator, key) => {
		if (width >= screens["sm"]) accumulator["sm"] = true;
		if (width >= screens["md"]) accumulator["md"] = true;
		if (width >= screens["lg"]) accumulator["lg"] = true;
		if (width >= screens["xl"]) accumulator["xl"] = true;
		if (width >= screens["2xl"]) accumulator["2xl"] = true;
		else accumulator[key] = false;
		return accumulator;
	}, {});

	const data = reactive({
		smAndDown: !gridObject.sm,
		smAndUp: gridObject.sm,
		mdAndDown: gridObject.sm && !gridObject.md,
		mdAndUp: gridObject.sm && gridObject.md,
		lgAndDown: gridObject.sm && gridObject.md && !gridObject.lg,
		lgAndUp: gridObject.sm && gridObject.md && gridObject.lg,
		xlAndDown: gridObject.sm && gridObject.md && gridObject.lg && !gridObject.xl,
		xlAndUp: gridObject.sm && gridObject.md && gridObject.lg && gridObject.xl,
	});

	return { ...gridObject, ...data };
};

export const useBreakpoint = () => {
	if (inBrowser) {
		onMounted(() => {
			setBreakpoint();
			window.addEventListener("resize", setBreakpoint);
		});

		onUnmounted(() => window.removeEventListener("resize", setBreakpoint));
	}

	return {
		breakpoints,
	};
};

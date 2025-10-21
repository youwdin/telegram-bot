export const useAuth = () => {
	const ONE_WEEK = 7 * 24 * 60 * 60;
	const { $i18n } = useNuxtApp();
	const { origin, protocol } = useRequestURL();

	const userCookie = useCookie("_session", {
		maxAge: ONE_WEEK,
		sameSite: "strict",
		secure: protocol.includes("https") === true,
		decode: (e) => {
			return e ? JSON.parse(atob(e)) : null;
		},
		encode: (e) => {
			return e ? btoa(JSON.stringify(e)) : null;
		},
	});

	const userRememberMe = useCookie("_remember", {
		maxAge: ONE_WEEK,
		sameSite: "strict",
		secure: protocol.includes("https") === true,
		decode: (e) => {
			return e ? JSON.parse(atob(e)) : null;
		},
		encode: (e) => {
			return e ? btoa(JSON.stringify(e)) : null;
		},
	});

	const userState = useState("user", () => userCookie.value ?? null);
	const isAuthentication = useState("authentication", () => false);

	const setCookie = (value) => {
		userCookie.value = value;
	};

	const setUserState = (value) => {
		userState.value = value;
	};

	const setRememberMe = (value) => {
		userRememberMe.value = { email: value.email };
	};

	const login = async (email, password, remember, attempts, isAttempt) => {
		const { data, accessToken, refreshToken } = await $fetch(`/user/login`, {
			baseURL: `${origin}/api`,
			headers: {
				"x-bateriku-language": $i18n.locale.value,
			},
			method: "POST",
			body: {
				email,
				password,
			},
		});

		isAuthentication.value = true;
		userState.value = { ...data, accessToken, refreshToken };
		if (remember.value) {
			setRememberMe({
				email,
			});
		}

		setCookie({ ...data, accessToken, refreshToken });
		return data;
	};

	const logout = async () => {
		if (userCookie?.value?.id != null) {
			await $fetch(`/user/logout`, {
				baseURL: `${origin}/api`,
				headers: {
					"x-bateriku-language": $i18n.locale.value,
				},
				body: {
					id: userCookie?.value?.id,
				},
				method: "POST",
			});
		}
		isAuthentication.value = false;
		userState.value = null;
		setCookie(null);
	};

	const forgotPassword = async (email, deviceInfo, attempts, isAttempt) => {
		const data = await $fetch(`/user/reset/verify-email`, {
			baseURL: `${origin}/api`,
			body: {
				email: email,
			},
			method: "POST",
			headers: {
				"x-bateriku-language": $i18n.locale.value,
			},
		});
		return data;
	};

	return {
		forgotPassword,
		login,
		logout,
		user: userState.value,
		setCookie,
		setUserState,
		isAuthentication,
		setRememberMe,
		getRememberMe: userRememberMe.value,
	};
};

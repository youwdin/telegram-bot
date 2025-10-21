export const useApi = async (request, opts) => {
	const { $toast, $i18n } = useNuxtApp();
	const { origin } = useRequestURL();
	const config = useRuntimeConfig();
	const jbkSecret = config.privateJbkSecret;
	// only $fetch can using inside function. if outside using useApi();
	return useAsyncData(
		`${request}`,
		() =>
			$fetch(`${request}`, {
				baseURL: `${useRequestURL().origin}`,
				...opts,
			})
				.then((result) => {
					return result ?? {};
				})
				.catch((err) => {
					showError({
						statusCode: err.status,
						statusMessage: `API Issues - ${err.message}`,
						fatal: true,
					});
				}),

		{
			server: true,
			immediate: true,
			lazy: false,
			retry: 0,
		}
	);
};

export const useRole = (value) => {
	const { user } = useAuth();

	return computed(() => {
		if (!user) return false;

		return user.roles.includes(value);
	});
};

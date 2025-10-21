export const useDropzone = () => {
	const { $toast } = useNuxtApp();

	const dragActive = ref(false);
	const droppedFile = ref([]);
	const maxSize = 8 * 1024 * 1024; // 8 MB

	const uploadFile = () => {
		const formData = new FormData();
		for (const i in droppedFile.value) {
			formData.append("files", droppedFile.value[i]);
		}
		return [...formData];
	};

	const toggleActive = () => {
		if (droppedFile.value.length) {
			dragActive.value = !dragActive.value;
		}
	};

	const selectedFile = (event, type, refs) => {
		const filesArray = Array.from(type === "drop" ? event.dataTransfer.files : event.target.files);
		const filesName = filesArray.map(function (el) {
			return el.name;
		});
		const filesSize = filesArray.map(function (el) {
			return el.size;
		});
		const allowedExt = ["pdf", "doc", "docx", "jpeg", "jpg", "png", "xls", "xlsx", "mp4", "mov", "avi", "mpeg", "mpg", "zip"];
		const notAllowed = filesName.filter((oFile) => {
			if (allowedExt.indexOf(oFile.split(".").pop().toLowerCase()) === -1) {
				return true;
			}
		});
		const notFileSize = filesSize.reduce((r, a) => r + (a >= maxSize), 0);

		// Check if the total number of files (existing + new) exceeds the limit
		if (droppedFile.value.length + filesArray.length > 3) {
			$toast.open({
				message: "You can only upload a maximum of 3 files",
				type: "error",
				position: "top",
			});
		}

		if (notFileSize >= 1) {
			$toast.open({
				message: `Please check one of the files. File size must be less than ${maxSize / (1024 * 1024)} MB`,
				type: "error",
				position: "top",
			});
		}

		if (notAllowed.length >= 1) {
			$toast.open({
				message: "Please check one of the files. Invalid file format. Supported formats:  pdf, doc/docx, jpeg/jpg, png, xls/xlsx, mp4, mov, avi, mpeg/mpg, zip",
				type: "error",
				position: "top",
			});
		}

		if (!notAllowed.length && !notFileSize && droppedFile.value.length + filesArray.length <= 3) {
			droppedFile.value.push(...filesArray);
			// Update dragActive status based on the files array
			dragActive.value = droppedFile.value.length > 0;
		}
		refs.value = "";
	};

	const deleteFile = (index) => {
		droppedFile.value.splice(index, 1);
		if (!droppedFile.value.length) {
			dragActive.value = false;
		}
	};

	return {
		dragActive,
		droppedFile,
		toggleActive,
		selectedFile,
		deleteFile,
		uploadFile,
	};
};

const isValidInt = (value: string): boolean => /^-?\d+$/.test(value);

export const isValidIntArray = (value: string): boolean => {
	if (!/^\[.*\]$/.test(value.trim())) {
		return false;
	}
	const elements = value.slice(1, -1).split(/\s*,\s*/);
	return elements.every((element) => isValidInt(element.trim()));
};

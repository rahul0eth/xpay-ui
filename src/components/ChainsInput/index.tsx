import React from "react";

import { IChainsInput } from "../../interfaces";
import { isValidIntArray } from "../../utils";

function ChainsInput({
	chainIdListInput,
	setChainIdLisInput,
	setChainIdList,
	setErrorMessage,
}: IChainsInput) {
	const castValue = (value: string) => {
		const elements = value
			.slice(1, -1)
			.split(",")
			.map((el) => Number(el.trim()));
		return elements;
	};

	const handleInputChange = async (input: string) => {
		setChainIdLisInput(input);

		const isValid = isValidIntArray(input);

		if (input.length === 0) {
			setErrorMessage("");
		} else if (input.length > 0 && isValid) {
			const castedList = castValue(input);
			setChainIdList(castedList);
			setErrorMessage("");
		} else {
			setErrorMessage("Invalid chain ID list.");
		}
	};

	return (
		<input
			type="text"
			className="h-14 w-full bg-dark-500 p-2 outline-none ring-1 ring-dark-200 focus:ring-dark-100"
			placeholder="Ex: [1, 10, 137]"
			value={chainIdListInput}
			onChange={(event) => handleInputChange(event.target.value)}
			autoComplete="off"
		/>
	);
}

export default ChainsInput;

import { Quote } from "../interfaces";
import store from "../state/store";

class GodServiceClient {
	static getQuote = async (
		setIsLoading: (value: boolean) => void,
		setErrorMessage: (value: string) => void,
		setSuccessfulQuote: (value: boolean) => void,
		godBaseUrl: string
	): Promise<Quote | null> => {
		setIsLoading(true);

		if (godBaseUrl === "") {
			setErrorMessage("Missing God base URL.");
			return null;
		}

		try {
			const response = await fetch(`${godBaseUrl}/quote`);

			if (response.ok) {
				const data = await response.json();
				setSuccessfulQuote(true);
				setIsLoading(false);

				return data;
			}

			const error = await response.json();
			if (
				error.detail &&
				Array.isArray(error.detail) &&
				error.detail[0].msg
			) {
				setErrorMessage(`${response.status} ${error.detail[0].msg}`);
			} else {
				setErrorMessage(`${response.status} ${error.detail}`);
			}
			setIsLoading(false);
			// eslint-disable-next-line @typescript-eslint/no-explicit-any
		} catch (error: any) {
			setIsLoading(false);
			setErrorMessage(error.message || "An unexpected error occurred");
		}

		return null;
	};

	static submit = async (
		setIsLoading: (value: boolean) => void,
		setErrorMessage: (value: string) => void,
		setSuccessfulSubmission: (value: boolean) => void,
		setSuccessfulPayment: (value: boolean) => void,
		bytecode: string,
		chainIdList: number[],
		signature: string,
		messageHash: string,
		godBaseUrl: string,
		setSuccessMessage: (value: string) => void
	) => {
		// setIsLoading(true);
		if (godBaseUrl === "") {
			setErrorMessage("Missing God base URL.");
			return;
		}

		try {
			setSuccessMessage("");
			const principal = store.getState().wallet.address;

			const myHeaders = new Headers();
			myHeaders.append("Content-Type", "application/json");

			const raw = JSON.stringify({
				principal,
				message_hash: messageHash,
				sig: signature,
				bytecode,
				chain_ids: chainIdList,
			});

			const requestOptions = {
				method: "POST",
				headers: myHeaders,
				body: raw,
			};

			const response = await fetch(`${godBaseUrl}/work`, requestOptions);

			if (response.ok) {
				setSuccessfulPayment(false);
				setSuccessfulSubmission(true);
				setIsLoading(false);
				return;
			}

			const error = await response.json();
			if (
				error.detail &&
				Array.isArray(error.detail) &&
				error.detail[0].msg
			) {
				setErrorMessage(`${response.status} ${error.detail[0].msg}`);
			} else {
				setErrorMessage(`${response.status} ${error.detail}`);
			}
			setIsLoading(false);
			// eslint-disable-next-line @typescript-eslint/no-explicit-any
		} catch (error: any) {
			setIsLoading(false);
			setErrorMessage(error.message || "An unexpected error occurred");
		}
	};
}

export default GodServiceClient;

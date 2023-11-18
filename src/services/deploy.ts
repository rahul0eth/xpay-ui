/* eslint-disable no-use-before-define */
import create3factoryAbi from "../abis/create3factory.json";
import xpayAbi from "../abis/xpay.json";
import { CREATE3_FACTORY, XPAY_CONTRACT } from "../data/constants";
import { IDeployService, Quote } from "../interfaces";
import {
	readContract,
	signMessage,
	waitForTransaction,
	writeContract,
} from "../resources";
import store from "../state/store";

/**
 * The singleton class pattern defines a `getInstance` method so that
 * the single class instance can be accessed elsewhere in the project.
 */
class DeployService extends IDeployService {
	private static instance: DeployService;

	private constructor() {
		super();
	}

	public static getInstance(): DeployService {
		if (!DeployService.instance) {
			DeployService.instance = new DeployService();
		}
		return DeployService.instance;
	}

	// ***************************************** Methods ***************************************** //
	public async sign(
		setIsLoading: (value: boolean) => void,
		bytecode: string,
		setSignature: (value: string) => void,
		setMessagehash: (value: string) => void,
		setSuccessfulSignature: (value: boolean) => void,
		setSuccessfulQuote: (value: boolean) => void,
		setErrorMessage: (value: string) => void
	): Promise<void> {
		setIsLoading(true);
		setErrorMessage("");

		const principal = store.getState().wallet.address;

		try {
			const transactionHash = (await readContract({
				address: CREATE3_FACTORY,
				abi: create3factoryAbi,
				functionName: "getTransactionHash",
				args: [principal, bytecode],
			})) as `0x${string}`;

			setMessagehash(transactionHash);

			const signature = await signMessage({
				message: {
					raw: transactionHash,
				} as unknown as string,
			});

			if (signature) {
				setSignature(signature);
				setSuccessfulQuote(false);
				setSuccessfulSignature(true);
			} else {
				setErrorMessage("Error signing message hash.");
			}

			// eslint-disable-next-line @typescript-eslint/no-explicit-any
		} catch (error: any) {
			const acceptableErrorMessages = [
				"rejected",
				"request reset",
				"denied",
			];

			if (
				!acceptableErrorMessages.some((msg) =>
					error.message.includes(msg)
				)
			) {
				setErrorMessage(`Error signing message hash: ${error}`);
			}
		}
		setIsLoading(false);
	}

	public async verifyPayment(
		setIsLoading: (value: boolean) => void,
		bytecode: string,
		quote: Quote,
		chainIdList: number[],
		setErrorMessage: (value: string) => void,
		setSuccessfulPayment: (value: boolean) => void,
		setSuccessfulSignature: (value: boolean) => void
	): Promise<void> {
		setIsLoading(true);
		setErrorMessage("");

		try {
			const { hash } = await writeContract({
				address: XPAY_CONTRACT,
				abi: xpayAbi,
				functionName: "verifyPayment",
				args: [
					quote.message_hash,
					quote.signature,
					bytecode,
					quote.cost,
					quote.timestamp,
					chainIdList,
				],
				value: quote.cost,
			});

			const txReceipt = await waitForTransaction({
				hash,
			});

			if (txReceipt.status === "success") {
				setSuccessfulSignature(false);
				setSuccessfulPayment(true);
			} else {
				setErrorMessage("Something went wrong verifying payment.");
				setIsLoading(false);
			}

			// eslint-disable-next-line @typescript-eslint/no-explicit-any
		} catch (error: any) {
			const acceptableErrorMessages = [
				"rejected",
				"request reset",
				"denied",
			];

			if (
				!acceptableErrorMessages.some((msg) =>
					error.message.includes(msg)
				)
			) {
				setErrorMessage(`Error verifying payment: ${error}`);
			}
			setIsLoading(false);
		}
		// setIsLoading(false);
	}
	// ******************************************************************************************* //
}

export default DeployService;

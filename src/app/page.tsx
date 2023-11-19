"use client";

import React, { useEffect, useState } from "react";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { useSelector } from "react-redux";

import GodServiceClient from "../clients/godService";
import BytecodeInput from "../components/BytecodeInput";
import ChainsInput from "../components/ChainsInput";
import { Quote } from "../interfaces";
import { getChain } from "../resources";
import DeployService from "../services/deploy";
import WalletService from "../services/wallet";
import { RootState } from "../state/store";
import { getTokenDisplayUnits } from "../utils";

export default function Home() {
	const { isWalletConnected, currentNetwork, address } = useSelector(
		(state: RootState) => state.wallet
	);
	const [isLoading, setIsLoading] = useState<boolean>(false);
	const [errorMessage, setErrorMessage] = useState<string>("");
	const [successMessage, setSuccessMessage] = useState<string>("");
	const [responseData, setResponseData] = useState<Record<
		number,
		string
	> | null>(null);
	const [bytecode, setBytecode] = useState<string>("");
	const [chainIdListInput, setChainIdLisInput] = useState<string>("");
	const [chainIdList, setChainIdList] = useState<number[] | null>(null);
	const [quote, setQuote] = useState<Quote | null>(null);
	const [signature, setSignature] = useState<string>("");
	const [messageHash, setMessageHash] = useState<string>("");
	const [successfulQuote, setSuccessfulQuote] = useState<boolean>(false);
	const [successfulPayment, setSuccessfulPayment] = useState<boolean>(false);
	const [successfulSignature, setSuccessfulSignature] =
		useState<boolean>(false);
	const [successfulSubmission, setSuccessfulSubmission] =
		useState<boolean>(false);
	const [godBaseUrl, setGodBaseUrl] = useState<string>("");

	const resetState = () => {
		setErrorMessage("");
		setBytecode("");
		setChainIdLisInput("");
		setChainIdList(null);
		setQuote(null);
		setSignature("");
		setMessageHash("");
		setSuccessfulQuote(false);
		setSuccessfulPayment(false);
		setSuccessfulSignature(false);
		setSuccessfulSubmission(false);
		setSuccessMessage("");
	};

	const getQuote = async () => {
		const fetchedQuote = await GodServiceClient.getQuote(
			setIsLoading,
			setErrorMessage,
			setSuccessfulQuote,
			godBaseUrl
		);

		setQuote(fetchedQuote);
	};

	const sign = async () => {
		await DeployService.getInstance().sign(
			setIsLoading,
			bytecode,
			setSignature,
			setMessageHash,
			setSuccessfulSignature,
			setSuccessfulQuote,
			setErrorMessage
		);
	};

	const submit = async () => {
		await GodServiceClient.submit(
			setIsLoading,
			setErrorMessage,
			setSuccessfulSubmission,
			setSuccessfulPayment,
			bytecode,
			chainIdList!,
			signature,
			messageHash,
			godBaseUrl,
			setSuccessMessage,
			setResponseData
		);
	};

	const verifyPayment = async () => {
		await DeployService.getInstance().verifyPayment(
			setIsLoading,
			bytecode,
			quote!,
			chainIdList!,
			setErrorMessage,
			setSuccessfulPayment,
			setSuccessfulSignature
		);

		await submit();
	};

	// After a successful quote
	useEffect(() => {
		if (isWalletConnected && currentNetwork!.isSupported) {
			if (successfulQuote) {
				setSuccessMessage(
					`Cost: ${getTokenDisplayUnits(quote!.cost, 18)} ${getChain({
						chainId: currentNetwork?.chainId,
					})?.nativeCurrency.symbol}`
				);
			}
		}
	}, [successfulQuote]);

	// After a successful signature
	useEffect(() => {
		if (isWalletConnected && currentNetwork!.isSupported) {
			if (successfulSignature) {
				setSuccessMessage("Intent to deploy confirmed.");
			}
		}
	}, [successfulSignature]);

	// After a successful payment
	useEffect(() => {
		if (isWalletConnected && currentNetwork!.isSupported) {
			if (successfulPayment) {
				WalletService.getInstance().getNativeBalance(address!);
			}
		}
	}, [successfulPayment]);

	// After a successful payment
	useEffect(() => {
		if (isWalletConnected && currentNetwork!.isSupported) {
			if (successfulSubmission) {
				setSuccessMessage("Successfully initiated deployments!");
			}
		}
	}, [successfulSubmission]);

	return (
		<div className="flex w-full flex-1 flex-col items-center justify-start py-10">
			<div className="flex min-h-fit w-full min-w-[300px] max-w-3xl flex-col px-4">
				<h1 className="mb-5 w-fit border-b border-b-primary-100 pb-1 text-2xl font-bold">
					xPay
				</h1>
				<span>Cost abstraction. Multi-chain execution.</span>
				<span className="mt-8 text-lg font-bold text-primary-100">
					Deploy a contract with xSafe:
				</span>
				<span>Pay once, execute everywhere.</span>
				<span className="mb-2 mt-5 font-bold text-light-100">
					Creation Code
				</span>
				<BytecodeInput
					bytecode={bytecode}
					setBytecode={setBytecode}
					setErrorMessage={setErrorMessage}
				/>
				<span className="mb-2 mt-5 font-bold text-light-100">
					Chains
				</span>
				<ChainsInput
					chainIdListInput={chainIdListInput}
					setChainIdLisInput={setChainIdLisInput}
					setChainIdList={setChainIdList}
					setErrorMessage={setErrorMessage}
				/>
				{successfulQuote ? (
					<>
						<span className="mb-1 mt-2 underline underline-offset-4">
							Disclosure
						</span>
						<span className="text-light-400">
							For security reasons, your signature is required to
							confirm your intent to deploy your smart contract at
							the expected address.
						</span>
						<button
							style={
								{
									"--offset-border-color": "#395754", // dark-200
								} as React.CSSProperties
							}
							className={`${
								!bytecode ||
								!chainIdList ||
								!!errorMessage ||
								isLoading ||
								!isWalletConnected ||
								godBaseUrl === ""
									? "cursor-not-allowed opacity-70"
									: null
							} offset-border mt-6 flex h-10 w-20 shrink-0 items-center justify-center self-center bg-dark-500 px-2 outline-none hover:bg-dark-400 hover:text-primary-100`}
							onClick={() => sign()}
							disabled={
								!bytecode ||
								!chainIdList ||
								!!errorMessage ||
								isLoading ||
								!isWalletConnected ||
								godBaseUrl === ""
							}
						>
							{isLoading ? (
								<AiOutlineLoading3Quarters
									className="animate-spin"
									size="22px"
								/>
							) : (
								<span>Sign</span>
							)}
						</button>
					</>
				) : successfulSignature ? (
					<button
						style={
							{
								"--offset-border-color": "#395754", // dark-200
							} as React.CSSProperties
						}
						className={`${
							!bytecode ||
							!chainIdList ||
							!!errorMessage ||
							isLoading ||
							!isWalletConnected ||
							godBaseUrl === ""
								? "cursor-not-allowed opacity-70"
								: null
						} offset-border mt-6 flex h-10 w-20 shrink-0 items-center justify-center self-center bg-dark-500 px-2 outline-none hover:bg-dark-400 hover:text-primary-100`}
						onClick={() => verifyPayment()}
						disabled={
							!bytecode ||
							!chainIdList ||
							!!errorMessage ||
							isLoading ||
							!isWalletConnected ||
							godBaseUrl === ""
						}
					>
						{isLoading ? (
							<AiOutlineLoading3Quarters
								className="animate-spin"
								size="22px"
							/>
						) : (
							<span>Submit</span>
						)}
					</button>
				) : successfulSubmission ? (
					<button
						style={
							{
								"--offset-border-color": "#395754", // dark-200
							} as React.CSSProperties
						}
						className="offset-border mt-6 flex h-10 w-20 shrink-0 items-center justify-center self-center bg-dark-500 px-2 outline-none hover:bg-dark-400 hover:text-primary-100"
						onClick={() => resetState()}
					>
						Reset
					</button>
				) : (
					<button
						style={
							{
								"--offset-border-color": "#395754", // dark-200
							} as React.CSSProperties
						}
						className={`${
							!bytecode ||
							!chainIdList ||
							!!errorMessage ||
							isLoading ||
							!isWalletConnected ||
							godBaseUrl === ""
								? "cursor-not-allowed opacity-70"
								: null
						} offset-border mt-6 flex h-10 w-20 shrink-0 items-center justify-center self-center bg-dark-500 px-2 outline-none hover:bg-dark-400 hover:text-primary-100`}
						onClick={() => getQuote()}
						disabled={
							!bytecode ||
							!chainIdList ||
							!!errorMessage ||
							isLoading ||
							!isWalletConnected ||
							godBaseUrl === ""
						}
					>
						{isLoading ? (
							<AiOutlineLoading3Quarters
								className="animate-spin"
								size="22px"
							/>
						) : (
							<span>Get Quote</span>
						)}
					</button>
				)}
				{errorMessage && (
					<div className="mt-5 flex w-full items-center justify-center text-sm">
						<span className="break-all text-bad-accent">
							{errorMessage}
						</span>
					</div>
				)}
				{successMessage && (
					<div className="mt-5 flex w-full items-center justify-center text-sm">
						<span className="break-all text-good-accent">
							{successMessage}
						</span>
					</div>
				)}
				{responseData && (
					<div className="mt-5 flex w-full flex-col items-start justify-center text-sm">
						<div className="mt-4" />
						{Object.entries(responseData).map(([key, value]) => (
							<a
								key={key}
								href={`${getChain({ chainId: Number(key) })
									?.blockExplorer}/tx/${value}#eventlog`}
								target="_blank"
								rel="noopener noreferrer"
								className="mb-5 break-all text-light-400 outline-none hover:text-primary-100"
							>
								{`${getChain({ chainId: Number(key) })
									?.name}: ${value}`}
							</a>
						))}
					</div>
				)}
				<input
					type="text"
					className="mt-56 h-14 w-full bg-dark-500 p-2 opacity-40 outline-none ring-1 ring-dark-200 focus:ring-dark-100"
					placeholder="God Base URL for Demo"
					value={godBaseUrl}
					onChange={(event) => setGodBaseUrl(event.target.value)}
					autoComplete="off"
				/>
			</div>
		</div>
	);
}

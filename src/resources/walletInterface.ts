import {
	Chain,
	configureChains,
	connect,
	createConfig,
	disconnect,
	fetchBalance,
	fetchEnsAvatar,
	fetchEnsName,
	getWalletClient,
	readContract,
	signMessage,
	switchNetwork,
	waitForTransaction,
	watchAccount,
	watchNetwork,
	writeContract,
} from "@wagmi/core";
import {
	arbitrumGoerli,
	baseGoerli,
	celo,
	gnosis,
	mainnet,
	scrollSepolia,
} from "@wagmi/core/chains";
import { CoinbaseWalletConnector } from "@wagmi/core/connectors/coinbaseWallet";
import { InjectedConnector } from "@wagmi/core/connectors/injected";
import { MetaMaskConnector } from "@wagmi/core/connectors/metaMask";
import { WalletConnectConnector } from "@wagmi/core/connectors/walletConnect";
import { jsonRpcProvider } from "@wagmi/core/providers/jsonRpc";
import { publicProvider } from "@wagmi/core/providers/public";

import { rpcUrlMap } from "../data/rpcUrlMap";

const { chains, publicClient } = configureChains(
	[mainnet, arbitrumGoerli, baseGoerli, celo, gnosis, scrollSepolia],
	[
		jsonRpcProvider({
			rpc: (chain: Chain) => ({
				http: rpcUrlMap[chain.id],
			}),
		}),
		publicProvider(),
	]
);

const connectors = [
	new InjectedConnector({
		chains,
		options: {
			shimDisconnect: true,
		},
	}),
	new MetaMaskConnector({
		chains,
		options: {
			shimDisconnect: true,
		},
	}),
	new WalletConnectConnector({
		options: { projectId: process.env.WC_PROJECT_ID },
	}),
	new CoinbaseWalletConnector({
		options: {
			appName: "xPay",
			darkMode: true,
		},
	}),
];

const walletConfig = createConfig({
	autoConnect: true,
	connectors,
	publicClient,
});

export {
	connect,
	disconnect,
	fetchBalance,
	fetchEnsAvatar,
	fetchEnsName,
	getWalletClient,
	readContract,
	signMessage,
	switchNetwork,
	waitForTransaction,
	walletConfig,
	watchAccount,
	watchNetwork,
	writeContract,
};

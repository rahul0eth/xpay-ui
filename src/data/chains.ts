import { SupportedChain } from "../interfaces";

export const chainList: SupportedChain[] = [
	// ********** Celo ********** //
	{
		name: "Celo",
		imageSource: "/images/iconCelo.svg",
		nativeCurrency: {
			symbol: "CELO",
			decimals: 18,
		},
		blockExplorer: "https://celoscan.io",
		chainId: 42220,
		isTestnet: false,
	},
	// ********** Gnosis ********** //
	{
		name: "Gnosis",
		imageSource: "/images/iconGnosis.svg",
		nativeCurrency: {
			symbol: "XDAI",
			decimals: 18,
		},
		blockExplorer: "https://gnosisscan.io",
		chainId: 100,
		isTestnet: false,
	},
	// ********** Arbitrum Goerli ********** //
	{
		name: "Arbitrum Goerli",
		imageSource: "/images/iconArbitrumOne.svg",
		nativeCurrency: {
			symbol: "ETH",
			decimals: 18,
		},
		blockExplorer: "https://goerli.arbiscan.io",
		chainId: 421613,
		isTestnet: true,
	},
	// ********** Base Goerli ********** //
	{
		name: "Base Goerli",
		imageSource: "/images/iconBase.svg",
		nativeCurrency: {
			symbol: "ETH",
			decimals: 18,
		},
		blockExplorer: "https://goerli.basescan.org",
		chainId: 84531,
		isTestnet: true,
	},
	// ********** Scroll Sepolia ********** //
	{
		name: "Scroll Sepolia",
		imageSource: "/images/iconScroll.svg",
		blockExplorer: "https://sepolia.scrollscan.com",
		nativeCurrency: {
			symbol: "ETH",
			decimals: 18,
		},
		chainId: 534351,
		isTestnet: true,
	},
];

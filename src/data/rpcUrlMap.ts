export const rpcUrlMap: Record<number, string> = {
	1: process.env.PRIVATE_ETHEREUM_RPC!,
	42220: process.env.PRIVATE_CELO_RPC!,
	100: process.env.PRIVATE_GNOSIS_RPC!,
	421613: process.env.PRIVATE_ARBITRUM_GOERLI_RPC!,
	84531: process.env.PRIVATE_BASE_GOERLI_RPC!,
	534351: process.env.PRIVATE_SCROLL_SEPOLIA_RPC!,
};

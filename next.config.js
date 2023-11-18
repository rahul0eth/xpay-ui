/** @type {import('next').NextConfig} */

const prod = process.env.NODE_ENV === "production";

// eslint-disable-next-line @typescript-eslint/no-var-requires
const withPWA = require("next-pwa")({
	dest: "public",
	register: true,
	skipWaiting: true,
	disable: !prod,
});

module.exports = withPWA({
	reactStrictMode: true,
	env: {
		// ********* PRIVATE ********* //
		PRIVATE_ETHEREUM_RPC: process.env.PRIVATE_ETHEREUM_RPC,
		PRIVATE_CELO_RPC: process.env.PRIVATE_CELO_RPC,
		PRIVATE_GNOSIS_RPC: process.env.PRIVATE_GNOSIS_RPC,
		PRIVATE_ARBITRUM_GOERLI_RPC: process.env.PRIVATE_ARBITRUM_GOERLI_RPC,
		PRIVATE_BASE_GOERLI_RPC: process.env.PRIVATE_BASE_GOERLI_RPC,
		PRIVATE_SCROLL_SEPOLIA_RPC: process.env.PRIVATE_SCROLL_SEPOLIA_RPC,
		WC_PROJECT_ID: process.env.WC_PROJECT_ID,

		// ********* PUBLIC ********* //
		GITHUB_URL: "https://github.com/chainrule-labs/xpay-contracts",
		TWITTER_URL: "https://twitter.com/chainrule_io",
	},
});

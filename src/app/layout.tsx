import "../styles/globals.css";

import type { Metadata, Viewport } from "next";
import React from "react";

import Footer from "../components/Footer";
import Header from "../components/Header";
import { ReduxProvider } from "../state/reduxProvider";

export const viewport: Viewport = {
	themeColor: "#ffffff",
};

export const metadata: Metadata = {
	// metadataBase: new URL("https://xpay.chainrule.io"),
	title: "xPay",
	description: "Pay on one chain, execute on multiple chains.",
	keywords: [
		"Open-Source",
		"Code",
		"Math",
		"Chain Rule",
		"xSafe",
		"xPay",
		"DeFi",
		"Crypto",
		"Smart Contracts",
		"EVM",
		"Deploy",
		"Cross-Chain",
		"Multi-Chain",
		"Ethereum",
		"Gnosis",
		"Arbitrum",
		"Base",
		"Celo",
		"Sepolia",
		"Goerli",
	],
	icons: {
		icon: [
			{
				rel: "icon",
				type: "image/png",
				sizes: "32x32",
				url: "/favicon-32x32.png",
			},
			{
				rel: "icon",
				type: "image/png",
				sizes: "16x16",
				url: "/favicon-16x16.png",
			},
			{
				rel: "apple-touch-icon",
				sizes: "180x180",
				url: "/apple-touch-icon.png",
			},
			{
				rel: "icon",
				type: "image/png",
				sizes: "192x192",
				url: "/android-chrome-192x192.png",
			},
			{
				rel: "icon",
				type: "image/png",
				sizes: "512x512",
				url: "/android-chrome-512x512.png",
			},
			{
				rel: "mask-icon",
				url: "/safari-pinned-tab.svg",
				color: "#4d4d4d",
			},
		],
	},
	// openGraph: {
	// 	title: "xPay",
	// 	description: "Pay on one chain, execute on multiple chains.",
	// 	url: "https://xpay.chainrule.io/",
	// 	type: "website",
	// 	images: [
	// 		{
	// 			url: "/card-image.png",
	// 		},
	// 	],
	// },
	// twitter: {
	// 	title: "xPay",
	// 	description: "Pay on one chain, execute on multiple chains.",
	// 	card: "summary_large_image",
	// 	images: [
	// 		{
	// 			url: "/card-image.png",
	// 		},
	// 	],
	// 	site: "@chainrule_io",
	// },
};

export default function RootLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<html lang="en">
			<body className="flex min-h-screen flex-col bg-dark-600 text-light-200">
				<main className="flex w-full min-w-[300px] flex-1 flex-col items-center">
					<ReduxProvider>
						<Header />
						{children}
						<Footer />
					</ReduxProvider>
				</main>
			</body>
		</html>
	);
}

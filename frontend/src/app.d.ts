import { MetaMaskInpageProvider } from "@metamask/providers"

declare global {
	declare namespace App {
		interface Locals {
			session: {user: {username: string, email: string }} | null
		}
	}
	interface Window {
		ethereum? : MetaMaskInpageProvider
	}
}

export {}
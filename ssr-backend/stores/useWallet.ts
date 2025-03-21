import { defineStore } from "pinia";
import { BrowserProvider } from "ethers";

export interface WalletState {
  account: string | null;
  chainId: number | null;
  isConnecting: boolean;
  provider: BrowserProvider | null;
  error: string | null;
}

export const useWallet = defineStore("wallet", {
  state: (): WalletState => ({
    account: null,
    chainId: null,
    isConnecting: false,
    provider: null,
    error: null,
  }),

  getters: {
    isConnected: (state) => !!state.account,
    shortAddress: (state) => {
      if (!state.account) return "";
      return `${state.account.slice(0, 6)}...${state.account.slice(-4)}`;
    },
  },

  actions: {
    async connectWallet() {
      if (typeof window.ethereum === "undefined") {
        this.error = "Please install MetaMask";
        return;
      }

      this.isConnecting = true;
      this.error = null;

      try {
        const provider = new BrowserProvider(window.ethereum);
        await provider.send("eth_requestAccounts", []);
        const signer = await provider.getSigner();
        const address = await signer.getAddress();
        const network = await provider.getNetwork();

        this.account = address;
        this.chainId = Number(network.chainId);
        this.provider = provider;

        // Listen to account changes
        window.ethereum.on("accountsChanged", this.handleAccountsChanged);
        window.ethereum.on("chainChanged", this.handleChainChanged);
      } catch (error) {
        this.error = "Error connecting to wallet";
        console.error("Wallet connection error:", error);
      } finally {
        this.isConnecting = false;
      }
    },

    async disconnectWallet() {
      this.account = null;
      this.chainId = null;
      this.provider = null;
      this.error = null;

      // Remove listeners
      if (window.ethereum) {
        window.ethereum.removeListener(
          "accountsChanged",
          this.handleAccountsChanged
        );
        window.ethereum.removeListener("chainChanged", this.handleChainChanged);
      }
    },

    handleAccountsChanged(accounts: string[]) {
      if (accounts.length === 0) {
        this.disconnectWallet();
      } else {
        this.account = accounts[0];
      }
    },

    handleChainChanged(chainId: string) {
      this.chainId = parseInt(chainId, 16);
      window.location.reload();
    },
  },
});

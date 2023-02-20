/* A helper file that simplifies using the wallet selector */

// near api js
import { providers } from "near-api-js";

// wallet selector UI

import { setupModal } from "@near-wallet-selector/modal-ui";

// wallet selector options
import {
  setupWalletSelector,
  WalletSelector,
  Wallet as NearWallet,
  Network,
  NetworkId,
} from "@near-wallet-selector/core";
import { setupLedger } from "@near-wallet-selector/ledger";
import { setupMyNearWallet } from "@near-wallet-selector/my-near-wallet";

const THIRTY_TGAS = "30000000000000";
const NO_DEPOSIT = "0";

// Wallet that simplifies using the wallet selector
export class Wallet {
  walletSelector?: WalletSelector;
  wallet?: NearWallet;
  network: NetworkId | Network;
  createAccessKeyFor?: string;
  accountId?: string;

  constructor({
    createAccessKeyFor = undefined,
    network = "testnet",
  }: {
    createAccessKeyFor?: string;
    network?: NetworkId | Network;
  } = {}) {
    // Login to a wallet passing a contractId will create a local
    // key, so the user skips signing non-payable transactions.
    // Omitting the accountId will result in the user being
    // asked to sign all transactions.
    this.createAccessKeyFor = createAccessKeyFor;
    this.network = network;
    this.startUp = this.startUp.bind(this);
    this.signIn = this.signIn.bind(this);
    this.signOut = this.signOut.bind(this);
    this.viewMethod = this.viewMethod.bind(this);
    this.callMethod = this.callMethod.bind(this);
    this.getTransactionResult = this.getTransactionResult.bind(this);
  }

  // To be called when the website loads
  async startUp() {
    this.walletSelector = await setupWalletSelector({
      network: this.network,
      modules: [
        setupMyNearWallet({ iconUrl: "/assets/icons/my-near-wallet-icon.png" }),
        setupLedger({ iconUrl: "/assets/icons/ledger-icon.png" }),
      ],
    });

    const isSignedIn = this.walletSelector.isSignedIn();

    if (isSignedIn) {
      this.wallet = await this.walletSelector.wallet();
      this.accountId =
        this.walletSelector.store.getState().accounts[0].accountId;
    }

    return isSignedIn;
  }

  // Sign-in method
  signIn() {
    if (!this.walletSelector) {
      throw new Error("Wallet not initialized");
    }
    if (!this.createAccessKeyFor) {
      throw new Error("No contractId provided");
    }
    const description = "Please select a wallet to sign in.";
    const modal = setupModal(this.walletSelector, {
      contractId: this.createAccessKeyFor,
      description,
    });
    modal.show();
  }

  // Sign-out method
  signOut() {
    if (this.wallet) {
      this.wallet.signOut();
      this.wallet = undefined;
      this.accountId = undefined;
      this.createAccessKeyFor = undefined;
    }
    window.location.replace(window.location.origin + window.location.pathname);
  }

  // Make a read-only call to retrieve information from the network
  async viewMethod({
    contractId,
    method,
    args = {},
  }: {
    contractId: string;
    method: string;
    args?: Record<string, unknown>;
  }) {
    if (!this.walletSelector) {
      throw new Error("Wallet not initialized");
    }

    const { network } = this.walletSelector.options;
    const provider = new providers.JsonRpcProvider({ url: network.nodeUrl });

    let res = await provider.query({
      request_type: "call_function",
      account_id: contractId,
      method_name: method,
      args_base64: Buffer.from(JSON.stringify(args)).toString("base64"),
      finality: "optimistic",
    });

    return JSON.parse(Buffer.from((res as any).result).toString());
  }

  // Call a method that changes the contract's state
  async callMethod({
    contractId,
    method,
    args = {},
    gas = THIRTY_TGAS,
    deposit = NO_DEPOSIT,
  }: {
    contractId: string;
    method: string;
    args?: Record<string, unknown>;
    gas?: string;
    deposit?: string;
  }) {
    if (!this.wallet) {
      throw new Error("Wallet not initialized");
    }
    // Sign a transaction with the "FunctionCall" action
    return await this.wallet.signAndSendTransaction({
      signerId: this.accountId,
      receiverId: contractId,
      actions: [
        {
          type: "FunctionCall",
          params: {
            methodName: method,
            args,
            gas,
            deposit,
          },
        },
      ],
    });
  }

  // Get transaction result from the network
  async getTransactionResult(txhash: Parameters<typeof provider.txStatus>[0]) {
    if (!this.walletSelector) {
      throw new Error("Wallet not initialized");
    }
    const { network } = this.walletSelector.options;
    const provider = new providers.JsonRpcProvider({ url: network.nodeUrl });

    // Retrieve transaction result from the network
    const transaction = await provider.txStatus(txhash, "unnused");
    return providers.getTransactionLastResult(transaction);
  }
}

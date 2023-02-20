/* Talking with a contract often involves transforming data, we recommend you to encapsulate that logic into a class */

import { ICertificate, ITokenMetadata } from "../app/my-certificate/certificate.type";
import { Wallet } from "./near-wallet";

import { utils } from "near-api-js";

export class NftCertificateNEAR {
  contractId: string;
  wallet: Wallet;

  constructor({ contractId, walletToUse }: { contractId: string; walletToUse: Wallet }) {
    this.contractId = contractId;
    this.wallet = walletToUse;
  }

  nft_tokens_for_owner(limit: number = 10): Promise<ICertificate[]> {
    return this.wallet.viewMethod({
      contractId: this.contractId,
      method: "nft_tokens_for_owner",
      args: {
        account_id: this.wallet.accountId,
      },
    });
  }

  nft_mint(user: string, tokenId?: string) {
    const time = Math.floor(new Date().getTime() / 1000);
    const newMetadata: ITokenMetadata = {
      title: "Surgical Skill Certificate",
      description: "has successfully completed the Surgical Skill program by Cantoverse",
      media: "https://bafybeifcqlnqvgefmrnxpe7lf4p4tv2y3dl25l67ka3onsakqmd2ch4ksq.ipfs.dweb.link",
      issued_at: time,
      extra: JSON.stringify({ issued_by: "Cantoverse" }),
    };
    return this.wallet.callMethod({
      contractId: this.contractId,
      method: "nft_mint",
      args: {
        token_id: tokenId || `surgical-kill-${time.toFixed(0)}`,
        metadata: newMetadata,
        receiver_id: user,
      },
      deposit: utils.format.parseNearAmount("0.01")!,
    });
  }
}

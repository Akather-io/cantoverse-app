"use client";
import {
  createContext,
  PropsWithChildren,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { NftCertificateNEAR } from "./configs/near-interface";
import { Wallet } from "./configs/near-wallet";
import { isClient } from "./utils/next";

type GlobalContextState = {
  wallet: Wallet;
  isSignedIn: boolean | undefined;
  NftCertificateContract: NftCertificateNEAR | null;
};

const GlobalContext = createContext<GlobalContextState>(
  {} as GlobalContextState
);

export const useGlobalContext = () => useContext(GlobalContext);

const GlobalContextProvider: React.FC<PropsWithChildren> = ({ children }) => {
  const wallet = useMemo(
    () =>
      new Wallet({
        createAccessKeyFor: "akather1.leopham.testnet",
      }),
    []
  );
  const [isSignedIn, setIsSignedIn] = useState<boolean>();

  useEffect(() => {
    if (isClient()) {
      wallet.startUp().then(setIsSignedIn);
    }
  }, [wallet]);

  const NftCertificateContract = useMemo(() => {
    if (wallet && isSignedIn) {
      const contract = new NftCertificateNEAR({
        contractId: process.env.NEXT_PUBLIC_NFT_CONTRACT!,
        walletToUse: wallet,
      });
      return contract;
    }
    return null;
  }, [isSignedIn, wallet]);

  const contextValue = useMemo(() => {
    return { wallet, isSignedIn, NftCertificateContract };
  }, [wallet, isSignedIn, NftCertificateContract]);
  return (
    <GlobalContext.Provider value={contextValue}>
      {children}
    </GlobalContext.Provider>
  );
};

export default GlobalContextProvider;

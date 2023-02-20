"use client";

import { useGlobalContext } from "../../GlobalContext";
import { GrCertificate } from "react-icons/gr";
import { useEffect, useState } from "react";
import { ICertificate } from "./certificate.type";
import Image from "next/image";
import { shimmer, toBase64 } from "../../utils/next";
import Link from "next/link";
export default function MyCertificatePage() {
  const { wallet, NftCertificateContract } = useGlobalContext();
  const [certificate, setCertificate] = useState<ICertificate[]>([]);
  useEffect(() => {
    NftCertificateContract?.nft_tokens_for_owner().then((res) => {
      console.log(res);
      setCertificate(res);
    });
  }, [NftCertificateContract]);

  return (
    <div className="container mx-auto bg-white min-h-full p-5 py-10">
      <h2 className="uppercase font-bold text-2xl bg-gray-100 p-3 rounded-md text-indigo-500 flex items-center gap-3">
        <GrCertificate className="text-indigo-500" />
        <span>{wallet.accountId}</span>Certificates
      </h2>

      <div className="p-3">
        {certificate.length === 0 ? (
          <div>You don't have any certificate. Learn to earn them.</div>
        ) : (
          <div className="grid grid-cols-4 gap-5">
            {certificate.map((cert) => (
              <div
                key={cert.token_id}
                className="flex flex-col justify-center items-center border p-5"
              >
                <Link
                  href={`https://testnet.mynearwallet.com/nft-detail/akather1.leopham.testnet/${cert.token_id}`}
                  target="_blank"
                >
                  {cert.metadata.media && (
                    <div className="w-80 h-64">
                      <Image
                        placeholder="blur"
                        blurDataURL={"/assets/certificate-surgery-name.png"}
                        src={cert.metadata.media
                          .replace(".ipfs.dweb.link", ".ipfs.nftstorage.link")
                          .replace("/goteam-gif.gif", "")}
                        alt={cert.token_id}
                        width={2000}
                        height={1438}
                        className="max-w-full h-auto"
                      />
                    </div>
                  )}
                  <div className="bg-gray-50">
                    <h2 className="p-2 text-indigo-500 font-semibold ">
                      {cert.owner_id}
                    </h2>
                    <div className="bg-white p-2">
                      {cert.metadata.description}
                    </div>
                  </div>
                  {/* <p className="flex-wrap">{JSON.stringify(cert.metadata)}</p> */}
                </Link>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

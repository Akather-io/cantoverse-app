"use client";

import { ImBooks, ImBookmarks } from "react-icons/im";
import Image from "next/image";
import { coursesData } from "../../../utils/fakeData";
import { BsFillBookmarksFill } from "react-icons/bs";
import clsx from "clsx";
import { Tab } from "@headlessui/react";
import { Fragment, useEffect } from "react";
import { FaUserGraduate } from "react-icons/fa";
import { useGlobalContext } from "../../../GlobalContext";

export default function CourseDetail({
  params,
  searchParams,
}: {
  params: { slug: string };
  searchParams: { transactionHashes: string };
}) {
  const currentData = coursesData.find((c) => c.slug === params.slug)!;
  const { NftCertificateContract } = useGlobalContext();

  useEffect(() => {
    if (searchParams.transactionHashes) {
      // alert("Mint thanh cong");
    }
  }, [searchParams.transactionHashes]);

  const handleIssueCert = async (user: string) => {
    await NftCertificateContract?.nft_mint(user);
  };
  return (
    <>
      <div className="container mx-auto bg-white min-h-full p-5">
        {/* <h2 className="uppercase font-bold text-2xl bg-gray-100 p-3 rounded-md text-indigo-500 flex items-center gap-3">
          <ImBooks />
          {currentData.name}
        </h2> */}
        <div className="flex gap-10">
          <div className="max-w-96 flex justify-center p-5">
            <Image
              className="rounded-full"
              src={"/assets/baged.jpg"}
              alt={"Course baged"}
              width={512}
              height={512}
            />
          </div>
          <div className="w-full p-5">
            <h2 className="uppercase font-bold text-2xl bg-gray-100 p-3 rounded-md text-indigo-500 flex items-center gap-3 shadow-lg">
              <ImBooks />
              {currentData.name}
            </h2>
            <div>
              {/* <h3 className="text-cyan-600 p-5 font-semibold flex items-center gap-3">
                <BsFillBookmarksFill />
                Giới thiệu khóa học
              </h3> */}
              <section className="p-3">
                <p>
                  Lorem ipsum dolor sit amet consectetur adipisicing elit. Neque
                  quisquam alias autem. Nam sit temporibus reprehenderit
                  deserunt. Perspiciatis et enim, amet vero explicabo mollitia
                  quasi labore impedit, velit, commodi architecto.
                </p>
                <p>
                  Lorem ipsum dolor, sit amet consectetur adipisicing elit. Illo
                  reiciendis velit obcaecati, explicabo id nesciunt quae
                  cupiditate odit unde voluptatum, sapiente nihil totam
                  accusamus ab est temporibus blanditiis mollitia nemo.
                </p>
              </section>
              <section className="p-3"></section>
            </div>
          </div>
        </div>
        <div className="w-full p-5">
          <Tab.Group>
            <Tab.List className="flex">
              <Tab>
                {({ selected }) => (
                  <div
                    className={clsx(
                      "cursor-pointer p-3 outline-none rounded-tl-md rounded-tr-md font-semibold",
                      selected && "bg-indigo-500 text-white "
                    )}
                  >
                    Giáo trình
                  </div>
                )}
              </Tab>
              <Tab as={Fragment}>
                {({ selected }) => (
                  <div
                    className={clsx(
                      "cursor-pointer p-3 outline-none rounded-tl-md rounded-tr-md font-semibold",
                      selected && "bg-indigo-500 text-white"
                    )}
                  >
                    Nhận xét học viên
                  </div>
                )}
              </Tab>
              <Tab as={Fragment}>
                {({ selected }) => (
                  <div
                    className={clsx(
                      "cursor-pointer p-3 outline-none rounded-tl-md rounded-tr-md font-semibold",
                      selected && "bg-indigo-500 text-white"
                    )}
                  >
                    Học viên đạt chứng chỉ
                  </div>
                )}
              </Tab>
            </Tab.List>
            <Tab.Panels className="p-3 my-3">
              <Tab.Panel>
                <h2 className="font-bold text-2xl bg-gray-100 p-3 rounded-md text-indigo-500 flex items-center gap-3 shadow-lg">
                  <ImBookmarks />
                  Giáo trình
                </h2>
                <div>
                  <ul>
                    {Array.from({ length: 10 }, (v, k) => k).map((k) => (
                      <li key={`topic_${k}`} className="my-5">
                        <h3 className="border-b border-b-indigo-500  inline-block p-2">
                          Chương {k + 1}
                        </h3>
                        <p className="my-5">
                          Lorem ipsum dolor, sit amet consectetur adipisicing
                          elit. Accusantium nisi in ducimus. Illum a tempore
                          molestiae expedita. Eos consequatur animi, natus
                          minima veniam sed cumque maiores, sint corrupti quae
                          aliquam!
                        </p>
                      </li>
                    ))}
                  </ul>
                </div>
              </Tab.Panel>
              <Tab.Panel>Nhận xét của học viên</Tab.Panel>
              <Tab.Panel>
                <h2 className="font-bold text-2xl bg-gray-100 p-3 rounded-md text-indigo-500 flex items-center gap-3 shadow-lg">
                  <ImBookmarks />
                  Danh sách học viên đủ điều kiện cấp chứng chỉ
                </h2>
                <div>
                  <ul>
                    {Array.from({ length: 10 }, (v, k) => k).map((k) => (
                      <li
                        key={`student_${k}`}
                        className="my-5 border rounded-md border-gray-50"
                      >
                        <div className="p-3 flex gap-3 justify-between">
                          <div className="flex items-center gap-5">
                            <FaUserGraduate
                              size={32}
                              className="self-center text-indigo-500"
                            />
                            {`leopham${k === 0 ? "" : "00" + k}.testnet`}
                          </div>
                          <div>
                            <button
                              className="bg-orange-50 p-2 rounded-md text-orange-500"
                              onClick={() =>
                                handleIssueCert(
                                  `leopham${k === 0 ? "" : "00" + k}.testnet`
                                )
                              }
                            >
                              Cấp chứng chỉ
                            </button>
                          </div>
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>
              </Tab.Panel>
            </Tab.Panels>
          </Tab.Group>
        </div>
      </div>
    </>
  );
}

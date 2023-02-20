"use client";
import Image from "next/image";
import Link from "next/link";
import { useGlobalContext } from "../GlobalContext";
import { Popover } from "@headlessui/react";
import { FaUserGraduate } from "react-icons/fa";
import LoadingSvg from "./LoadingSvg";
const NavBar = () => {
  const { isSignedIn, wallet } = useGlobalContext();
  return (
    <nav className="z-10 w-full shadow-md shadow-sky-300/50 bg-gradient-to-r from-cyan-100 to-sky-400">
      <div className="flex items-center justify-between px-2 mx-auto lg:container">
        <div className="relative w-48 h-16 p-2">
          <Image
            src="/assets/cantoverse-logo.png"
            alt={"Cantoverse Logo"}
            // width={1077}
            // height={350}
            fill
            sizes="(max-width: 768px) 100vw,
            (max-width: 1200px) 50vw,
            33vw"
            priority
          />
        </div>
        <div>
          <ul className="flex items-center gap-10 text-lg font-bold text-white/90">
            <li className="transition-colors duration-300 hover:text-indigo-500">
              <Link href={"/about-us"}>About Us</Link>
            </li>
            <li className="transition-colors duration-300 hover:text-indigo-500">
              <Link href={"/courses"}>Courses</Link>
            </li>

            {typeof isSignedIn === "undefined" ? (
              <LoadingSvg />
            ) : !isSignedIn ? (
              <li className="px-3 py-1 transition-colors duration-300 bg-black rounded-md hover:text-indigo-50">
                <button onClick={wallet.signIn} className="outline-none">
                  Login with NEAR
                </button>
              </li>
            ) : (
              <li>
                <Popover className="relative">
                  <Popover.Button className="outline-none">
                    <div className="flex items-center justify-center w-10 h-10 p-1 rounded-full shadow bg-white/30">
                      <FaUserGraduate size={22} className="text-white " />
                    </div>
                  </Popover.Button>

                  <Popover.Panel className="absolute right-0 z-10 p-2 rounded-md bg-white/90">
                    <ul className="flex flex-col gap-2 text-indigo-500 cursor-pointer min-w-fit">
                      <li className="px-3 py-2 text-center text-white bg-black rounded-md">
                        {wallet.accountId}
                      </li>
                      <li className="px-3 py-2 hover:bg-gray-50">
                        <Link href={"/profile"}>Profile</Link>
                      </li>
                      <li className="px-3 py-2 hover:bg-gray-50">
                        <Link href={"/my-certificate"}>Certificates</Link>
                      </li>
                      <li
                        className="p-1 text-red-500 border-t-2 hover:bg-gray-50 border-t-gray-100"
                        onClick={wallet.signOut}
                      >
                        Logout
                      </li>
                    </ul>
                  </Popover.Panel>
                </Popover>
              </li>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;

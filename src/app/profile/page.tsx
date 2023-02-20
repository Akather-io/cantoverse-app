"use client";
import { FaUserGraduate } from "react-icons/fa";
import { useGlobalContext } from "../../GlobalContext";
export default function ProfilePage() {
  const { wallet } = useGlobalContext();
  return (
    <div className="container mx-auto bg-white h-full p-5 py-10">
      <div className="shadow-lg w-40 h-40 justify-center flex items-center rounded-full">
        <FaUserGraduate size={72} className="self-center text-indigo-500" />
      </div>
      <h2>{wallet.accountId}</h2>
    </div>
  );
}

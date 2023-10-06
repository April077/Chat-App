import Image from "next/image";
import React from "react";
import { getServerSession } from "next-auth";
import ButtonLogin from "./ButtonLogin";
import ButtonLogout from "./ButtonLogout";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import Toggle from "./Toggle";

const Navbar = async () => {
  const session = await getServerSession(authOptions);
  if (session) {
    console.log(session);
    return (
      <div className="p-4 border-b-[1px]">
        <div className="px-20 flex justify-between">
          <div  className="text-2xl text-center font-bold text-rose-500">Space<span className="text-xl font-bold text-black">Ship</span></div>
          <div>
            <Toggle />
          </div>
          <div className="flex">
            <div className="px-4">
              {" "}
              <Image
                className="rounded-full"
                src={session?.user?.image ?? ""}
                height={40}
                width={40}
                alt="profile"
              />
            </div>
            <ButtonLogout />
          </div>
        </div>
      </div>
    );
  }
  return (
    <div className="p-4 border-b-[1px]">
      <div className="px-20 flex justify-between">
        <div className="text-xl font-bold text-rose-500">Spaceship</div>
        <ButtonLogin />
      </div>
    </div>
  );
};

export default Navbar;

import React from "react";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

const Home = async () => {
  const session = await getServerSession(authOptions);
  console.log(session);
  return (
    <div className=" h-50 mt-40 font-bold text-7xl flex justify-center items-center gap-3">
      WELCOME  TO <span className="text-rose-500 flex justify-center items-center">SPACE</span>SHIP
    </div>
  );
};

export default Home;

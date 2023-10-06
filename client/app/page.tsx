import React from "react";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

const Home = async () => {
  const session = await getServerSession(authOptions);
  console.log(session);
  return <div>{session?.user.username}</div>;
};

export default Home;

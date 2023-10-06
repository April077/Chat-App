"use client";

import React from "react";
import { signOut } from "next-auth/react";
const ButtonLogout = () => {
  return (
    <button
      onClick={() => {
        signOut({ callbackUrl: "/" });
      }}
      className="bg-rose-500 hover:bg-rose-700 text-white font-bold py-2 px-4 rounded-full"
    >
      Logout
    </button>
  );
};

export default ButtonLogout;

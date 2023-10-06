"use client";

import React from "react";
import { signIn } from "next-auth/react";

const ButtonLogin = () => {
  return (
    <button
      onClick={() => {
        signIn();
      }}
      className="bg-rose-500 hover:bg-rose-700 text-white font-bold py-2 px-4 rounded-full"
    >
      Login
    </button>
  );
};

export default ButtonLogin;

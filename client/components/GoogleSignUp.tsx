"use client";
import { signIn } from "next-auth/react";
import Link from "next/link";
import Image from "next/image";
const GoogleSignUp = () => {
  return (
    <div>
      {" "}
      <button
        onClick={() => {
          signIn("google");
        }}
        className="flex justify-center  mb-2  w-full text-white bg-rose-700 hover:bg-rose-800 focus:ring-4 focus:outline-none focus:ring-rose-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-rose-600 dark:hover:bg-rose-700 dark:focus:ring-rose-800"
      >
        <Image src={"/search.png"} height={15} width={24} alt="google"></Image>
        <div className="pl-3">Continue with Google</div>
      </button>
      <div className=" mb-2 text-white">
        <label>Don't have an account?</label>
        <Link className="text-rose-500" href="/signUp">
          {" "}
          Sign Up
        </Link>
      </div>
    </div>
  );
};

export default GoogleSignUp;

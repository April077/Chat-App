import Link from "next/link";
import React from "react";

const Toggle = () => {
  return (
    <div className="flex items-center p-2 border-[1px] rounded-full">
      <Link
        className="pr-2 pl-3 border-r-[1px] font-bold text-rose-500 "
        href="/createRoom"
      >
        Create Rooms
      </Link>
      <Link className="pr-3 pl-2  font-bold" href="/viewRooms">
       View Rooms
      </Link>
    </div>
  );
};

export default Toggle;

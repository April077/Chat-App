"use client";
import React, { useEffect, useState } from "react";
import CreateQna from "../createQna/page";

const Rooms = () => {
  const [rooms, setRooms] = useState([]);
  const [roomId, setRoomId] = useState("");
  const [open, setOpen] = useState(false);
  const [roomName, setRoomName] = useState("");

  useEffect(() => {
    const getData = async () => {
      const res = await fetch("http://localhost:3000/api/viewRooms");
      const data = await res.json();
      console.log(data);
      setRooms(data);
    };
    getData();
  }, []);

  return (
    <div className="grid h-screen  grid-cols-5 gap-4">
      <div className=" border-r-[2px]">
        {rooms.map((room, index) => (
          <div
            onClick={() => {
              setRoomId(room.id);
              setOpen(true);
              setRoomName(room.name);
              console.log(room.id);
            }}
            key={index}
            className="font-medium cursor-pointer border-b-[1px] p-3 "
          >
            {room.name}
          </div>
        ))}
      </div>
      <div className="col-span-4">
        <CreateQna roomId={roomId} open={open} roomName={roomName} />
      </div>
    </div>
  );
};

export default Rooms;

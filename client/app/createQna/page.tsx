"use client";

import { useEffect } from "react";
import { useRecoilState } from "recoil";
import io from "socket.io-client";
import { messageState, receivedMsgState } from "@/store/atoms";
import { useSession } from "next-auth/react";

const socket = io("http://localhost:3001"); // Assuming your server is running on port 3000

const page = () => {
  const session = useSession();
  const [message, setMessage] = useRecoilState(messageState);
  const [receivedMsg, setReceivedMessage] = useRecoilState(receivedMsgState);

  useEffect(() => {
    const getData = async () => {
      const response = await fetch("http://localhost:3000/api/getChat");
      const data = await response.json();
      const chats = data.msgs;
      console.log(chats[1].chatMsg);
      const chatMessage = chats.map((chat) => {
        return chat.chatMsg;
      });
      setReceivedMessage(chatMessage);
    };
    getData();

    socket.on("serverMessage", (message) => {
      console.log(message);
      setReceivedMessage((prevChats) => [...prevChats, message]);
      console.log(receivedMsg, "hi");
    });
  }, []);

  return (
    <div className="flex flex-col h-screen">
      <div className="flex-grow mb-16 p-1 overflow-y-auto">
        {receivedMsg &&
          receivedMsg.map((msg, index) => (
            <div className="mb-2 flex px-20 " key={index}>
              <p className="text-slate-600 font-medium bg-slate-300 border-slate-300 border-[1px] py-2 px-4 rounded-xl">
                {msg}
              </p>
            </div>
          ))}
      </div>
      <div className="fixed bottom-0 w-full flex justify-center px-20 pt-2 pb-7 bg-white">
        <input
          className="flex-grow bg-gray-200 appearance-none border-2 border-gray-200 rounded py-2 px-4 text-gray-700 leading-tight focus:outline-none"
          type="text"
          id="message"
          placeholder="Enter your message..."
          value={message}
          onChange={(e) => {
            setMessage(e.target.value);
          }}
        ></input>
        <button
          onClick={async () => {
            if (message.trim() !== "") {
              socket.emit("user-msg", message);
              const response = await fetch("http://localhost:3000/api/chat", {
                method: "POST",
                headers: {
                  "Content-Type": "application/json",
                },
                body: JSON.stringify({
                  chatMsg: message,
                  userId: session?.data?.user.id,
                }),
              });
              const data = await response.json();
              if (response.ok) {
                setMessage("");
                console.log(data);
              } else {
                console.error("Failed to send the message.");
              }
            }
          }}
          className="ml-2 bg-rose-500 hover:bg-rose-700 text-white font-bold py-2 px-4 rounded-full"
        >
          Send
        </button>
      </div>
    </div>
  );
};

export default page;

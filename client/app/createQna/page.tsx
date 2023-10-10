"use client";

import { useEffect, useState } from "react";
import { useRecoilState } from "recoil";
import io from "socket.io-client";
import { messageState, receivedMsgState, voteState } from "@/store/atoms";
import { useSession } from "next-auth/react";
import Image from "next/image";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const socket = io("http://localhost:3001");

interface RoomProp {
  roomId: String;
  open: boolean;
  roomName: String;
}
const CreateQna = (props: RoomProp) => {
  if (props.open) {
    const session = useSession();
    const [message, setMessage] = useRecoilState(messageState);
    const [receivedMsg, setReceivedMessage] = useRecoilState(receivedMsgState);
    const [vote, setVote] = useRecoilState(voteState);
    const [loading, setLoading] = useState(true);
    const [msgObj, setMsgObj] = useState([]);

    useEffect(() => {
      const getData = async () => {
        const response = await fetch("http://localhost:3000/api/getChat", {
          method: "POST",
          headers: {
            "Content-Type": "Application/json",
          },
          body: JSON.stringify({
            roomId: props.roomId,
          }),
        });
        const data = await response.json();
        if (!data || !data.msgs) {
          console.log("No chat messages found in response here");
          setLoading(false);
          return;
        }
        const chats = data.msgs;
        setMsgObj(chats);
        const chatMessage = chats.map((chat) => {
          return chat.chatMsg;
        });
        setReceivedMessage(chatMessage);

        const chatVote = chats.map((chat) => {
          return chat.votes;
        });
        setVote(chatVote);
        console.log(chatVote);
        console.log(chats);
        setLoading(false);
        console.log(msgObj,"msgObj");
        
      };
      getData();

      socket.on("serverMessage", (message) => {
        setVote((prev) => [...prev, 0]);
        setReceivedMessage((prevChats) => [...prevChats, message]);
      });

      socket.on("updatedVote", ({ newVote, index }) => {
        console.log(newVote, index, "hi");
        setVote((prev) => {
          const upVote = [...prev];
          upVote[index] = newVote;
          return upVote;
        });
      });
    }, [props.roomId]);

    if (loading) {
      return (
        <div>
          <SkeletonTheme baseColor="#F5F5F5" highlightColor="#ffffff">
            {" "}
            <Skeleton className="h-10 m-1 rounded-2xl" count={20} />
          </SkeletonTheme>
        </div>
      );
    }

    return (
      <div className="flex flex-col w-full">
        <div className="flex justify-between  border-b-[1px] px-10">
          {" "}
          <div className="font-bold p-3 border-b-[1px] flex justify-center">
            {props.roomName}
          </div>
          <Image
            className="cursor-pointer"
            onClick={() => {}}
            src={"/sorting.png"}
            height={10}
            width={45}
            alt="sort"
          ></Image>
        </div>

        <div className="flex-grow mb-16 p-1 overflow-y-auto">
          {receivedMsg &&
            receivedMsg.map((msg, index) => (
              <div
                key={index}
                className=" border-b-[1px]  flex justify-between py-2 px-10 "
              >
                <p className="text-slate-600 font-medium bg-slate-300 border-slate-300 border-[1px] py-2 px-4 rounded-xl">
                  {msg}
                </p>
                <div className="flex items-center gap-2">
                  <Image
                    src={"/vote.png"}
                    height={20}
                    width={20}
                    alt="upvote"
                    onClick={async () => {
                      console.log(session.data?.user.id, index);
                      console.log(vote[index], "ll");

                      const response = await fetch(
                        "http://localhost:3000/api/updateVote",
                        {
                          method: "PATCH",
                          headers: {
                            "Content-Type": "application/json",
                          },
                          body: JSON.stringify({
                            userId: session.data?.user.id,
                            msgIndex: index,
                          }),
                        }
                      );
                      const data = await response.json();
                      if (!data.duplicateVoter) {
                        socket.emit("vote", {
                          newVote: data.updateVote.votes,
                          index: index,
                        });
                      }
                      console.log(data, "ss");
                    }}
                  ></Image>
                  {vote[index] && (
                    <div className="font-bold"> {vote[index]}</div>
                  )}
                </div>
              </div>
            ))}
        </div>
        <div className="fixed bottom-0 w-3/4 flex  justify-center px-10 pt-2 pb-7 bg-white">
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
                    roomId: props.roomId,
                  }),
                });
                const data = await response.json();
                console.log(data);
                if (response.ok) {
                  setMessage("");
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
  }

  return (
    <div className="relative">
      <Image
        className=" mt-40 left-2/3 absolute"
        src={"/pineapple.png"}
        width={200}
        height={200}
        alt="hello"
      ></Image>
    </div>
  );
};
export default CreateQna;

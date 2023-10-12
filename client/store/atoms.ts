import { atom } from "recoil";

export const messageState = atom<string>({
  key: "messageState",
  default: "",
});

export const receivedMsgState = atom<String[]>({
  key: "receivedMsgState",
  default: [],
});


export const voteState = atom<number[]>({
  key: "voteState",
  default: [],
});

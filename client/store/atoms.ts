import { atom } from "recoil";

export const messageState = atom({
  key: "messageState",
  default: "",
});

export const receivedMsgState = atom({
  key: "receivedMsgState",
  default: [],
});

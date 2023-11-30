import { atom } from "recoil";

export const selectedFileState = atom({
  key: "selectedFileState",
  default: "",
});
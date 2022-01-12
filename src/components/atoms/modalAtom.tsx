import { atom } from "recoil";

export const modalLogin = atom({
  key: 'modalLogin',
  default: false
})

export const modalPost = atom({
  key: 'modalPost',
  default: false
})

export const modalDelete = atom({
  key: 'modalDelete',
  default: false
})

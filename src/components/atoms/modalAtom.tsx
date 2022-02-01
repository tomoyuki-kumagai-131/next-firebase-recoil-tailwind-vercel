import { atom } from 'recoil';

export const modalLogin = atom({
  key: 'modalLogin',
  default: false,
});

export const modalGuestLogin = atom({
  key: 'modalGuestLogin',
  default: false,
});

export const modalPost = atom({
  key: 'modalPost',
  default: false,
});

export const modalUpdate = atom({
  key: 'modalUpdate',
  default: false,
});

export const modalDelete = atom({
  key: 'modalDelete',
  default: false,
});

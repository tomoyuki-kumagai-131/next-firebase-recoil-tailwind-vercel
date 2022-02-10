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

export const renderGraphql = atom({
  key: 'renderGraphql',
  default: false,
});

export const modalUploadPhoto = atom({
  key: 'modalUploadPhoto',
  default: false,
});

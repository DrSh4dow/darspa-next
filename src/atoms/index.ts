import { atom } from "jotai";

export const loadingAtom = atom(false);
export const shoppingCartOpen = atom(false);
export const shoppingCartContent = atom<
  | {
      name: string;
      price: number;
      imageSrc: string;
      imageAlt: string;
      description: string;
      id: string;
    }[]
  | []
>([]);

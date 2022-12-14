import { atom } from "jotai";
import { atomWithStorage } from "jotai/utils";

export const loadingAtom = atom(false);
export const shoppingCartOpen = atom(false);
export const shoppingCartContent = atomWithStorage<
  | {
      name: string;
      price: number;
      imageSrc: string;
      imageAlt: string;
      description: string;
      id: string;
    }[]
  | []
>("shoppingCartContent", []);

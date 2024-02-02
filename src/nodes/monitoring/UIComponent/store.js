import { create } from "zustand";

export const useSystem = create((set) => ({
  width: 1,
  height: 1,
  isMobile: false,
  setWindowSize: (v) => {
    set({ width: v.width, height: v.height, isMobile: v.width < 728 });
  },
}));

export const useSettings = create((set) => ({
  filtered: [],
  keywords: [],
  setSettings: (v) =>
    set({
      ...v,
    }),
}));

export const onClickMap = { current: undefined };
export const onClickMarker = { current: undefined };

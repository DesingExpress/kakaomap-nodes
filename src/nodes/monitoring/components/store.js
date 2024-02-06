import { create } from "zustand";

export const onClickMap = { current: undefined };
export const onClickMarker = { current: undefined };
export const onLoadSiteInfo = { current: undefined };

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

export const useInfo = create((set) => ({
  peer_id: "",
  categories: [],
  end_date: new Date(),
  start_date: new Date(
    new Date().getFullYear() - 1,
    new Date().getMonth(),
    new Date().getDay()
  ),
  setSiteInfo: (v) =>
    set({
      peer_id: v.peer_id,
      categories: v.categories,
      start_date: v.start_date,
      end_date: v.end_date,
    }),
}));

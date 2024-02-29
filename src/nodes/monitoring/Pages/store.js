import { create } from "zustand";

export const onClickMap = { current: undefined };
export const onClickMarker = { current: undefined };
export const onLoadSiteInfo = { current: undefined };
export const onAddMarkers = { current: undefined };

export const useSettings = create((set) => ({
  filtered: [],
  mode: 0,
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

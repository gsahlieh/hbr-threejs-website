import { create } from "zustand";

const useStore = create((set) => ({
  startPressed: false,
  setStartPressed: (pressed) => set({ startPressed: pressed }),
  debugMode: false,
  setDebugMode: (debug) => set({ debugMode: debug }),
  muted: false,
  setMuted: (muted) => set({ muted: muted }),
}));

export default useStore;

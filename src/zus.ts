// zus.ts
import { create } from 'zustand';

export const useStore = create((set) => ({
  peerId: null,
  setPeerId: (id) => set({ peerId: id }), // Correctly updates peerId
}));

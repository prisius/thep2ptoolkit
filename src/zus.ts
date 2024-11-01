import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export const useStore = create(
  persist(
    (set) => ({
      peerId: '',
      setPeerId: (peerId: string) => set({ peerId }),
      rtco: null,
      setRtco: (rtco: any) => set({ rtco }),
    }),
    {
      name: 'messaging', 
      storage: sessionStorage, 
    }
  )
);

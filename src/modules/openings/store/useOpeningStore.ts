import {Opening} from '../types';
import {create} from 'zustand';
import {persist, createJSONStorage} from 'zustand/middleware';
import {zustandStorage} from '../../../store/zustandStorage';

export interface OpeningState {
  openings: Opening[];
  getOpeningById: (id: number) => Opening | null;
  getAllOpenings: () => Opening[];
}

export const useOpeningStore = create(
  persist<OpeningState>(
    (_, get) => ({
      openings: [],
      getOpeningById: (id: number) => {
        const opening = get().openings.find(o => o.id === id);
        return opening ?? null;
      },
      getAllOpenings: () => {
        return [...get().openings];
      },
    }),
    {
      name: 'opening-storage',
      storage: createJSONStorage(() => zustandStorage),
    },
  ),
);


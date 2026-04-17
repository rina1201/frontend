import { create } from "zustand";

type UiState = {
  isFilterOpen: boolean;
  setFilterOpen: (open: boolean) => void;
};

export const useUiStore = create<UiState>((set) => ({
  isFilterOpen: false,
  setFilterOpen: (open) => set({ isFilterOpen: open }),
}));

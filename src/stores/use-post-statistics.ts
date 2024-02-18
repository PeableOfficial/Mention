import { create } from "zustand";

import { IUser } from "@/features/profile";

interface IPostStatistics {
  isPostStatisticsModalOpen: boolean;
  openPostStatisticsModal: () => void;
  closePostStatisticsModal: () => void;
  authors: IUser[] | null;
  setAuthors: (authors: IUser[]) => void;
  statisticType: string | null;
  setStatisticType: (statisticType: string) => void;
}

export const usePostStatistics = create<IPostStatistics>((set) => ({
  isPostStatisticsModalOpen: false,
  openPostStatisticsModal: () =>
    set({ isPostStatisticsModalOpen: true, authors: null }),
  closePostStatisticsModal: () => set({ isPostStatisticsModalOpen: false }),
  authors: null,

  setAuthors: (authors) => set({ authors }),
  statisticType: null,
  setStatisticType: (statisticType: string) => set({ statisticType }),
}));

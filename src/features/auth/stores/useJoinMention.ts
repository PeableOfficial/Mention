import { create } from "zustand";

interface IJoinMention {
  data: {
    isModalOpen: boolean;
    action: string;
    user?: string;
  };
  setData: (data: {
    isModalOpen: boolean;
    action: string;
    user?: string;
  }) => void;
}

export const useJoinMention = create<IJoinMention>((set) => ({
  data: {
    isModalOpen: false,
    action: "comment",
    user: "user",
  },

  setData: (data) => set({ data }),
}));

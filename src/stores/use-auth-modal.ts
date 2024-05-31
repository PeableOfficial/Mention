import { create } from "zustand";

interface IModal {
  isUserModalOpen: boolean;
  openUserModal: () => void;
  closeUserModal: () => void;
}

export const useAuthModal = create<IModal>((set) => ({
  isUserModalOpen: false,
  openUserModal: () => set({ isUserModalOpen: true }),
  closeUserModal: () => set({ isUserModalOpen: false }),
}));

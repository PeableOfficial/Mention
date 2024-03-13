import { create } from "zustand";

import { IPost } from "@/features/posts";

interface IData {
  parent_post: IPost | null;
  quoted_post: IPost | null;
  in_reply_to_username: string | null;
  in_reply_to_status_id: string | null;
  placeholder: string | null;
}

interface IModal {
  isModalOpen: boolean;
  openModal: () => void;
  closeModal: () => void;
  data: IData;
  setData: (data: IData) => void;
}

export const useCreatePostModal = create<IModal>((set) => ({
  isModalOpen: false,
  openModal: () => set({ isModalOpen: true }),
  closeModal: () => {
    set({
      isModalOpen: false,
      data: {
        parent_post: null,
        quoted_post: null,
        in_reply_to_username: null,
        in_reply_to_status_id: null,
        placeholder: `What's happening?`,
      },
    });
  },

  data: {
    parent_post: null,
    quoted_post: null,
    in_reply_to_username: null,
    in_reply_to_status_id: null,
    placeholder: `What's happening?`,
  },

  setData: (data) => set({ data, isModalOpen: true }),
}));

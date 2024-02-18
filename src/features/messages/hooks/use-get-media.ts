import { useQuery } from "@tanstack/react-query";

import { IMedia } from "@/features/posts";

import { getMedia } from "../api/get-media";

export const useGetMedia = (messageId: string | undefined) => {
  return useQuery<IMedia[]>({
    queryKey: ["media", messageId],
    queryFn: async () => {
      return getMedia(messageId);
    },
    refetchOnWindowFocus: false,
  });
};

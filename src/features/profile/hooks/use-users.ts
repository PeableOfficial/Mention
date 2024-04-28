import { useQuery } from "@tanstack/react-query";
import { usePeableSession } from "@peable/services";

import { getUsers } from "../api/get-users";
import { IUser } from "../types";

export const useUsers = ({
  queryKey,
  limit,
}: {
  queryKey: string[];
  limit?: number;
}) => {
  const { session, status } = usePeableSession();

  return useQuery<IUser[]>({
    queryKey,
    queryFn: async () => {
      if (status === "loading") {
        return [];
      }
      return getUsers({ id: session?.user?.id, limit });
    },
    enabled: status !== "loading",
  });
};

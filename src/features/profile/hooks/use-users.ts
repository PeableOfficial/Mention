import { useQuery } from "@tanstack/react-query";
import { useSession } from "next-auth/react";

import { getUsers } from "../api/get-users";
import { IUser } from "../types";

export const useUsers = ({
  queryKey,
  limit,
}: {
  queryKey: string[];
  limit?: number;
}) => {
  const { data: session, status } = useSession();

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

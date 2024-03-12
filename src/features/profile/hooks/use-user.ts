import { useQuery } from "@tanstack/react-query";

import { getUser } from "../api/get-user";
import { IUser } from "../types";

export const useUser = ({
  id,
  initialData,
}: {
  id: string | undefined;
  initialData?: IUser;
}) => {
  return useQuery<IUser>({
    queryKey: ["users", id],
    queryFn: async () => {
      if (!id) {
        // Return a default value or null when id is not provided
        return null;
      }
      return getUser(id);
    },
    refetchOnWindowFocus: false,
    initialData: initialData ?? undefined,
    enabled: !!id, // Only run the query if the id is provided
  });
};

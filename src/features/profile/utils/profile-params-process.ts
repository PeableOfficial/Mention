import { redirect } from "next/navigation";
export const profileParamsProcess = async ({
  params,
  currentFolder,
}: {
  params: string;
  currentFolder?: string;
}) => {
  if (currentFolder && !params.includes("%40"))
    redirect(`/@${params}/${currentFolder}`);
  else if (!params.includes("%40")) redirect(`/@${params}`);
  else return params.replace("%40", "");
};

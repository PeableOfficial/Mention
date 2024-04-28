interface UserData {
  id: string;
}

export const getUsernameToId = async ({ username }: { username: string }) => {
  try {
    const response = await fetch(
      process.env.NEXT_PUBLIC_PEABLE_SERVICES_URL +
        `/api/users/username-to-id/${username}`,
      {
        credentials: "include",
      },
    );
    const userData = (await response.json()) as UserData;

    return userData?.id || null;
  } catch (error) {
    console.error(error);
    return null;
  }
};

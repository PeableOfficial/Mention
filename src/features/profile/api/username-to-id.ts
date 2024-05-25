interface UserData {
  id: string;
}

export const getUsernameToId = async ({ username }: { username: string }) => {
  try {
    const response = await fetch(
      process.env.NEXT_PUBLIC_OXY_SERVICES_URL +
        `/api/users/username-to-id/${username}`,
    );
    const userData = (await response.json()) as UserData;

    return userData?.id || null;
  } catch (error) {
    console.error(error);
    return null;
  }
};

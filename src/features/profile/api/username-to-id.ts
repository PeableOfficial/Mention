interface UserData {
  id: string;
}

export const getUsernameToId = async ({ username }: { username: string }) => {
  try {
    const response = await fetch(
      `http://localhost:3001/api/users/username-to-id/${username}`,
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

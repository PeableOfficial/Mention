import { PostHeader } from "@/features/header";
import { PostQuotes } from "@/features/posts";

const Quotes = () => {
  return (
    <>
      <PostHeader heading="Quotes" />
      <PostQuotes />
    </>
  );
};

export default Quotes;

export const metadata = {
  title: "Quotes",
};

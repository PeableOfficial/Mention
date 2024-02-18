import { LoadingSpinner } from "@/components/elements/loading-spinner";
import { PostHeader } from "@/features/header";

export default function Loading() {
  return (
    <>
      <PostHeader />
      <LoadingSpinner />
    </>
  );
}

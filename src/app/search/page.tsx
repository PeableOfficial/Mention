import { ExploreHeader } from "@/features/header";
import { SearchResults } from "@/features/search";

const SearchPage = () => {
  return (
    <div>
      <ExploreHeader />
      <SearchResults />
    </div>
  );
};

export default SearchPage;

export const metadata = {
  title: "Search",
};

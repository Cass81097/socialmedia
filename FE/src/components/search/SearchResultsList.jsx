import "../../styles/search-bar/SearchResultsList.css"
import { SearchResult } from "./SearchResult"

export const SearchResultsList = ({ results }) => {
  return (
    <div className="results-list">
      {results.map((result, id) => {
        return <SearchResult result={result.fullname} userId={result.id} key={id} />;
      })}
    </div>
  );
};

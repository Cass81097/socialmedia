import "../../styles/search-bar/SearchResult.css"

export const SearchResult = ({ result, userId }) => {
  
  
  return (
    <div
      className="search-result"
      onClick={(e) => alert(`You selected ${result}!`)}
    > 

      {result}
    </div>
  );
};

import { useSearchParams } from "react-router-dom";

function Search() {
  const [searchKeyword, setSearchKeyword] = useSearchParams();
  console.log(searchKeyword.get("keyword"));
  return null;
}

export default Search;

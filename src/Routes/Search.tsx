import { useLocation, useSearchParams } from "react-router-dom";

function Search() {
  const location = useLocation();
  console.log(location);
  const keyword = new URLSearchParams(location.search).get("keyword");
  console.log(keyword);
  // const [searchKeyword, setSearchKeyword] = useSearchParams();
  // console.log(searchKeyword.get("keyword"));
  return null;
}

export default Search;

/* 
  영화 결과, tv 결과 따로 보여주고 
  예를 들어, 영화 결과 더보기 누르면 페이지네이션이 되는 검색결과 페이지로 이동하게 만들기
*/

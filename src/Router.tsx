import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Header from "./components/Header";
import Home from "./routes/Home";
import Tv from "./routes/Tv";
import Search from "./routes/Search";

function Router() {
  return (
    <>
      <ReactQueryDevtools initialIsOpen={true} />
      <BrowserRouter
        future={{
          v7_relativeSplatPath: true,
          v7_startTransition: true,
        }}
      >
        <Header />
        <Routes>
          <Route path="/" element={<Home key="home" />}>
            <Route path="movies/:movieId" element={<Home key="modal" />} />
          </Route>
          <Route path="/tv" element={<Tv key="tv" />}>
            <Route path=":tvShowId" element={<Tv key="modal" />} />
          </Route>

          <Route path="/search" element={<Search key="search" />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default Router;

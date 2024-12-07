import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./routes/Home";
import Tv from "./routes/Tv";
import Search from "./routes/Search";
import Header from "./components/Header";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import Movies from "./routes/Movies";

function App() {
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
          <Route path="/" element={<Home />}>
            <Route path="tv/:tvShowId" element={<Home />} />
            <Route path="movies/:movieId" element={<Home />} />
          </Route>
          <Route path="/tv" element={<Tv />} />
          <Route path="/movies" element={<Movies />} />
          <Route path="/search" element={<Search />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;

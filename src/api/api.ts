import axios from "axios";
import requests from "./requests";

const TOKEN = process.env.REACT_APP_MOVIEDB_TOKEN;
const BASE_PATH = "https://api.themoviedb.org/3";

const movieInstance = axios.create({
  baseURL: BASE_PATH,
  headers: {
    Accept: "application/json",
    Authorization: `Bearer ${TOKEN}`,
  },
});

// const options = {
//   method: "GET",
//   url: `${BASE_PATH}/movie/now_playing`,
//   headers: {
//     accept: "application/json",
//     Authorization: `Bearer ${TOKEN}`,
//   },
// };

export async function getNowPlayingMovies() {
  // return await (await fetch(`${BASE_PATH}/movie/now_playing`, options)).json();
  const response = await movieInstance.get(requests.getNowPlayingMovies);
  return response.data;
}

export async function getPopularMovies() {
  const response = await movieInstance.get(requests.getPopularMovies);
  return response.data;
}

export async function getAiringTodayTv() {
  const response = await movieInstance.get(requests.getAiringTodayTv);
  return response.data;
}

export async function getPopularTv() {
  const response = await movieInstance.get(requests.getpopularTv);
  return response.data;
}

export async function getMovies(url: string) {
  const response = await movieInstance.get(url);
  return response.data;
} // 재사용을 위한 fetch함수

import axios from "axios";

const TOKEN = process.env.REACT_APP_MOVIEDB_TOKEN;
const BASE_PATH = "https://api.themoviedb.org/3";

const movieInstance = axios.create({
  baseURL: BASE_PATH,
  headers: {
    Accept: "application/json",
    Authorization: `Bearer ${TOKEN}`,
  },
});

export async function getMovies(url: string) {
  try {
    const response = await movieInstance.get(url);
    return response.data;
  } catch (error) {
    console.log(error);
  }
}

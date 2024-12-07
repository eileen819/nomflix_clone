export interface IResult {
  id: number;
  backdrop_path: string;
  poster_path: string;
  title?: string;
  overview: string;
  name?: string;
}
export interface IGetResults {
  dates?: {
    maximum: string;
    minimum: string;
  };
  page: number;
  results: IResult[];
  total_pages: number;
  total_results: number;
}

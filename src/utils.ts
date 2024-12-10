export function makeImagePath(id: string, format?: string) {
  return `https://image.tmdb.org/t/p/${format ? format : "original"}/${id}
`;
}

export function generateUniqueId(queryId: string, movieId: number) {
  return `${queryId}-${movieId}`;
}

import { fetchData } from "./Index.js"

export const getPlaylists = async () => {
  let data = await fetchData("getPlaylists.view", {}, {});
  return data.playlists;
}

import { fetchData } from "./Index.js"

const getPlaylists = async (id) => {
  let data = await fetchData("getPlaylists.view", {}, {});
  return data.playlists;
}

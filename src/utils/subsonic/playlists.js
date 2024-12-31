import { fetchData } from "./Index.js"

export const getPlaylists = async () => {
  let data = await fetchData("getPlaylists.view", {}, {});
  return data.playlists;
}

export const getPlaylist = async (id) => {
  let data = await fetchData("getPlaylist.view", { id }, {});
  return data.playlist || false;
}

import { fetchData } from "./Index.js"

export const GetSong = async (id) => {
  let data = await fetchData("getSong.view", { id }, {});
  return data.song;
}

export const GetPlayingSong = async () => {
  let data = await fetchData("getNowPlaying", {}, {});
  return data.song;
}


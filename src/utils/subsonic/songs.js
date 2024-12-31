import { fetchData } from "./Index.js"
import { getConfig } from "../local/config.js";

export const GetSong = async (id) => {
  let data = await fetchData("getSong.view", { id }, {});
  return data.song;
}

export const GetPlayingSong = async () => {
  let data = await fetchData("getNowPlaying", {}, {});
  return data.song;
}

export const streamSong = async (id) => {
  let transcoding = await getConfig("transcoding");
  let maxBit = await getConfig("maxBitRate");

  let data = await fetchData(
    "stream",
    { id },
    {
      format: transcoding,
      maxBitRate: maxBit
    });
  return data;
}

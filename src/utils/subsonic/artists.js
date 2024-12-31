import { fetchData } from "./Index.js"

export const getArtists = async () => {
  let data = await fetchData("getArtists.view", {}, {});
  console.log(data.artists.index);
  index = data.artists.index;
  index.map((artist) => {
    console.log(artist);
  });
}

const getArtist = async (id) => {
  let data = await fetchData("getArtist.view", { id }, {});
  return data.artist;
}

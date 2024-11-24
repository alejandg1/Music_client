import {fetchData} from "./Index.js"

const getAlbum = async (id) => {
  let data = await fetchData("getAlbum.view", { id }, {});
  return data.album;
}

const getNewestsAlbums = async (id) => {
  let data = await fetchData("getAlbumList.view", { type: "newest", id }, {});
  return data.albumList.album;
}

getNewestsAlbums().then((data) => {
  console.log(data);
})

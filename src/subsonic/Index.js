import md5 from "md5";
import { getConfig } from "../local/config";
import { genSalt } from "../local/config";

export const fetchData = async (endpoint, params) => {
  let baseUrl = await getConfig("url") || "http://192.168.100.223:4533/rest";
  let username = await getConfig("username") || "Alejandro";
  let password = await getConfig("password") || "AleVillarreal";
  let apiVersion = await getConfig("version") || "1.16.1";
  let clientName = await getConfig("client") || "MusicClient";
  let salt = genSalt(16) || "1";
  try {
    const urlParams = new URLSearchParams({
      u: username,
      s: salt,
      t: md5(password + salt),
      v: apiVersion,
      c: clientName,
      f: "json",
      ...params,
    });
    const response = await fetch(`${baseUrl}/${endpoint}?${urlParams.toString()}`);
    const data = await response.json();
    if (data["subsonic-response"].status === "ok") {
      return data["subsonic-response"];
    } else {
      return false;
    }
  } catch (error) {
    return false;
  }
};


export const ping = async () => {
  let data = await fetchData("ping.view", {});
  if (data) {
    return true;
  }
  return false;
}



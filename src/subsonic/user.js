import { setConfig } from "../local/config";
import { ping } from "./Index";

export const Login = (url, username, passw, version = "1.16.1", client = "Music_Client") => {
  setConfig("url", url);
  setConfig("username", username);
  setConfig("password", passw);
  setConfig("version", version);
  setConfig("client", client);
  if (ping()) {
    return true;
  }
  else {
    console.error("Error al iniciar sesión.");
    return false;
  }
}


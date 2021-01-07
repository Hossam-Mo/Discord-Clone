import { combineReducers } from "redux";

export const muting = {
  type: "mute",
};
export const unMuting = {
  type: "unMute",
};
export const setPeersJs = {
  type: "setPeers",
};
export const setSocket = {
  type: "setSocket",
};
export const setUser = {
  type: "setUser",
};

export const reduser = (state = true, action) => {
  switch (action.type) {
    case "mute":
      return false;
    case "unMute":
      return true;
    default:
      return state;
  }
};
export const setpeerJs = (state = [], action) => {
  switch (action.type) {
    case "setPeers":
      if (action.peers) {
        return action.peers;
      } else {
        return state;
      }

    default:
      return state;
  }
};
export const setSocketio = (state = {}, action) => {
  switch (action.type) {
    case "setSocket":
      return action.socket;
    default:
      return state;
  }
};

export const setUsername = (state = null, action) => {
  switch (action.type) {
    case "setUser":
      return action.user;
    default:
      return state;
  }
};

export const rootReducer = combineReducers({
  mute: reduser,
  peerDisc: setpeerJs,
  socketDisc: setSocketio,
  setUser: setUsername,
});

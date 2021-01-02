export const muting = {
  type: "mute",
};
export const unMuting = {
  type: "unMute",
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

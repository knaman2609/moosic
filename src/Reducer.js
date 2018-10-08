const player = (state = "u2" , action) => {
  switch(action.type) {
    case "play":
      return action.payload;

  }

  return state;
}

export default player

import * as R from "ramda"

var AppState = {
  songList: []
}

const player = (state = AppState , action) => {
  switch(action.type) {
    case "FETCH_SONGS":
      var newState = {}
      newState.songList = action.payload;
      return R.merge(state, newState);

  case "UPDATE_SONGS":
    var newState = {}
    newState.songList = action.payload;
    return R.merge(state, newState);
  }

  return state;
}

export default player

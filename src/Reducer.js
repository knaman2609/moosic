import * as R from "ramda"

var AppState = {
  songList: [],
  currentSongData: null,
  renderedSongData: null,
  startedAt: null,
  pausedAt: null,
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

  case "RENDER_SONG":
    var newState = {}
    newState.renderedSongData = action.renderedSongData;
    return R.merge(state, newState);

  case "LOAD_SONG":
    var newState = {}
    newState.currentSongData = action.payload;
    newState.startedAt = null;
    newState.pausedAt = null;

    return R.merge(state, newState);

  case "UPDATE_SONG_DATA_PAUSE":
    var newState = {}
    newState.pausedAt = action.payload.pausedAt;
    return R.merge(state, newState);

  case "UPDATE_SONG_DATA_PLAY":
    var newState = {}
    newState.currentSongData = action.payload.source;
    newState.startedAt = action.payload.startedAt;
    return R.merge(state, newState);
  }

  return state;
}

export default player

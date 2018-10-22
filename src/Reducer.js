import * as R from "ramda"

var AppState = {
  songList: [],
  currentSongData: null,
  startedAt: null,
  pausedAt: null,
  currentSongIndex: 0
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

  case "LOAD_SONG":
    var newState = {};
    var songList = R.clone(state.songList);
    var songIndex = 0;

    songList.forEach(function(song, index) {
      if (song.name == action.payload.song.name) {
        song.rawSource = action.payload.data.rawSource;
        song.renderedSource = action.payload.data.renderedSource;
        songIndex = index;
      }
    });

    newState.songList = songList;
    newState.currentSongData = action.payload.data.rawSource;
    newState.currentSongIndex = songIndex;
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

  case "UPDATE_CURRENTSONG":
    var newState = {}
    newState.currentSongIndex = action.payload.songIndex;
    newState.currentSongData = action.payload.songData;
    newState.startedAt = null;
    newState.pausedAt = null;

    return R.merge(state, newState);
  }

  return state;
}

export default player

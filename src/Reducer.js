import * as R from "ramda"

var AppState = {
  songList: [],
  currentSong: {
    song: {},
    data: null,
    index: 0,
    startedAt: null,
    pausedAt: null,
  },
  isPlaying: false
}

const player = (state = AppState , action) => {
  switch(action.type) {
    case "FETCH_SONGS":
      var newState = R.clone(state);
      newState.songList = action.payload;
      return R.merge(state, newState);

  case "UPDATE_SONGS":
    var newState = R.clone(state);
    newState.songList = action.payload;
    return R.merge(state, newState);

  case "LOAD_SONG":
    var newState = R.clone(state);
    var songList = newState.songList;
    var songIndex = 0;

    songList.forEach(function(song, index) {
      if (song.name == action.payload.song.name) {
        song.rawSource = action.payload.data.rawSource;
        song.renderedSource = action.payload.data.renderedSource;
        songIndex = index;
      }
    });

    newState.songList = songList;
    newState.isPlaying = false;
    newState.currentSong = {};

    newState.currentSong.song = action.payload.song;
    newState.currentSong.data = action.payload.data.rawSource;
    newState.currentSong.index = songIndex;
    newState.currentSong.startedAt = null;
    newState.currentSong.pausedAt = null;

    return R.merge(state, newState);

  case "UPDATE_SONG_DATA_PAUSE":
    var newState = R.clone(state);

    newState.isPlaying = false;
    newState.currentSong.pausedAt = action.payload.pausedAt;
    return R.merge(state, newState);

  case "UPDATE_SONG_DATA_PLAY":
    var newState = R.clone(state);

    newState.isPlaying = true;
    newState.currentSong.data = action.payload.source;
    newState.currentSong.startedAt = action.payload.startedAt;
    return R.merge(state, newState);

  case "UPDATE_CURRENTSONG":
    var newState = R.clone(state);

    newState.isPlaying = false;
    newState.currentSong.song = action.payload.song;
    newState.currentSong.index = action.payload.songIndex;
    newState.currentSong.data = action.payload.songData;
    newState.currentSong.startedAt = null;
    newState.currentSong.pausedAt = null;

    return R.merge(state, newState);
  }

  return state;
}

export default player

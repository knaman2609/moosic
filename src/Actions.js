import {getDuration, renderSongAudio} from "./Utils";
import {store} from "./index"

function fetchSongs(dispatch) {
  return function(event){
    var songList = [];
    var promiseList = [];

    Array.prototype.forEach.call(event.target.files, function(song) {
      songList.push(
        {
          name: song.name,
          artist: "Coldplay",
          duration: ".."
        }
      );

      promiseList.push(getDuration(song.name));
    });

    dispatch({
      type: "FETCH_SONGS",
      payload: songList
    });

    Promise.all(promiseList).then(function(values) {
      songList.forEach(function(song, index) {
        var time  = Math.ceil(values[index]);
        var minutes = Math.floor(time / 60);
        var seconds = time - minutes * 60;

        if (seconds < 10)
          seconds = "0" + seconds;

        song.durationInSeconds = time;
        song.duration = minutes + ":" + seconds;
      });

      dispatch({
        type: "UPDATE_SONGS",
        payload: songList
      });
    });
  };
}

function initSong(dispatch) {
  return function(song){
    var state = store.getState();
    var promise = renderSongAudio(song.name);

    var resultPromise = new Promise(function(resolve, reject) {
      stopCurrentSong(state);

      promise.then(function(data) {
          dispatch({
            type: "LOAD_SONG",
            payload: {data: data, song: song}
          });

          resolve();
      });
    });

    return resultPromise;
  }
}

function stopCurrentSong(state) {

  if (state.currentSong.data && state.currentSong.startedAt)
    state.currentSong.data.stop(0);
}

function _playSong(dispatch) {
  return function() {
    var audioCtx = new AudioContext();
    var source = audioCtx.createBufferSource();
    var state = store.getState();

    stopCurrentSong(state);

    source = audioCtx.createBufferSource();
	  source.connect(audioCtx.destination);
	  source.buffer = state.currentSong.data.buffer;

    if (state.currentSong.pausedAt) {
		  var startedAt = Date.now() - state.currentSong.pausedAt;
      source.start(0, state.currentSong.pausedAt / 1000);

      dispatch({
        type: "UPDATE_SONG_DATA_PLAY",
        payload: {startedAt: startedAt, source: source}
      });

    } else {
		  var startedAt = Date.now();
      source.start(0);

      dispatch({
        type: "UPDATE_SONG_DATA_PLAY",
        payload: {startedAt: startedAt, source: source}
      });
    }
  }
}

function _pauseSong(dispatch) {
  return function() {
    var state = store.getState();
    console.log("pausing....");

    stopCurrentSong(state);

	  var pausedAt = Date.now() - state.currentSong.startedAt;

    dispatch({
      type: "UPDATE_SONG_DATA_PAUSE",
      payload: {pausedAt: pausedAt}
    });
  }
}

function playNextPreviousSong(dispatch, song, songIndex) {
  if (song) {
    if (!song.rawSource) {
      var promise = initSong(dispatch)(song);

      promise.then(function() {
        var rawSource = store.getState().currentSong.data;

        dispatch({
          type: "UPDATE_CURRENTSONG",
          payload: {songIndex: songIndex, songData: rawSource, song: song}
        });

        _playSong(dispatch)();
      });

    } else {
      stopCurrentSong(store.getState());

      dispatch({
        type: "UPDATE_CURRENTSONG",
        payload: {songIndex: songIndex, songData: song.rawSource, song: song}
      });

      _playSong(dispatch)();
    }
  }
}

function playNext(dispatch) {
  return function() {
    var state = store.getState();
    var songIndex = state.currentSong.index + 1;
    var song = state.songList[songIndex];

    console.log("next", song);
    playNextPreviousSong(dispatch, song, songIndex);
  }
}

function playPrevious(dispatch) {
  return function(state) {
    var state = store.getState();
    var songIndex = state.currentSong.index - 1;
    var song = state.songList[songIndex];

    console.log("prev", song);
    playNextPreviousSong(dispatch, song, songIndex);
  }
}

export default function(dispatch) {
  return {
    fetchSongs: fetchSongs(dispatch),
    initSong: initSong(dispatch),
    playNext: playNext(dispatch),
    playPrevious: playPrevious(dispatch),
    _playSong: _playSong(dispatch),
    _pauseSong: _pauseSong(dispatch),
  }
}

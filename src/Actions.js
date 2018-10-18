import {getDuration, renderSongAudio} from "./Utils";

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
  return function(state, song){
    var promise = renderSongAudio(song.name);

    var resultPromise = new Promise(function(resolve, reject) {
      promise.then(function(data) {
        if (state.currentSongData && state.startedAt)
          state.currentSongData.stop(0);

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

function _playSong(dispatch) {
  return function(state, song) {
    var audioCtx = new AudioContext();
    var source = audioCtx.createBufferSource();
    source = audioCtx.createBufferSource();
	  source.connect(audioCtx.destination);
	  source.buffer = state.currentSongData.buffer;

    if (state.pausedAt) {
		  var startedAt = Date.now() - state.pausedAt;
      source.start(0, state.pausedAt / 1000);

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
  return function(state) {
    state.currentSongData.stop(0);
	  var pausedAt = Date.now() - state.startedAt;

    dispatch({
      type: "UPDATE_SONG_DATA_PAUSE",
      payload: {pausedAt: pausedAt}
    });
  }
}

export default function(dispatch) {
  return {
    fetchSongs: fetchSongs(dispatch),
    initSong: initSong(dispatch),
    _playSong: _playSong(dispatch),
    _pauseSong: _pauseSong(dispatch),
  }
}

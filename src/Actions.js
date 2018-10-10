import {getDuration} from "./Utils";

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
  }
}

export default function(dispatch) {
  return {
    fetchSongs: fetchSongs(dispatch)
  }
}

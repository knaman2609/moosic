function getDuration(songName) {
  var promise = new Promise(function(resolve, reject){
    if (!songName)
      return resolve(4000);

    var audioCtx = new AudioContext();
    var source = audioCtx.createBufferSource();
    var request = new XMLHttpRequest();

    request.open('GET', songName, true);
    request.responseType = 'arraybuffer';


    request.onload = function() {
      var audioData = request.response;

      audioCtx.decodeAudioData(audioData, function(buffer) {
        source.buffer = buffer;
        resolve(source.buffer.duration);
      },

      function(e){
        reject(e.err);
        console.log("Error with decoding audio data" + e.err);
      });
    }

    request.send();
  });


  return promise;
}


function renderSongAudio(songName) {
  var promise = new Promise(function(resolve, reject){
    if (!songName)
      return resolve(null);

    var request = new XMLHttpRequest();

    request.open('GET', songName, true);
    request.responseType = 'arraybuffer';

    request.onload = function() {
      var audioData = request.response;
      var audioCtx = new AudioContext();

      audioCtx.decodeAudioData(audioData, function(buffer) {
        var offlineCtx = new OfflineAudioContext(2,44100*40,44100);
        var source = offlineCtx.createBufferSource();

        source.buffer = buffer;
        source.connect(offlineCtx.destination);

        resolve({type: "buffer_load", source: source});

        offlineCtx.startRendering().then(function(renderedBuffer) {
          console.log('Rendering completed successfully');
          var audioCtx = new AudioContext();
          var source = audioCtx.createBufferSource();

          source.buffer = renderedBuffer;
          resolve({type: "buffer_rendered", source: source});
          return;

        }).catch(function(err) {
            reject(err);
            console.log('Rendering failed: ' + err);
        });
      });
    };

    request.send();
  });

  return promise;
}

export {
  getDuration,
  renderSongAudio
}

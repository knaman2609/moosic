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

export {
  getDuration
}

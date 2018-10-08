function getData(songName) {
  if (!songName)
    return "0:00";

  var  audioCtx = new AudioContext();
  var source = audioCtx.createBufferSource();
  var request = new XMLHttpRequest();

  request.open('GET', songName, true);
  request.responseType = 'arraybuffer';


  request.onload = function() {
    var audioData = request.response;

    audioCtx.decodeAudioData(audioData, function(buffer) {
      source.buffer = buffer;
      console.log(source.buffer.duration);
      source.connect(audioCtx.destination);
      source.loop = true;
    },

    function(e){
      console.log("Error with decoding audio data" + e.err);
    });
  }

  request.send();
}

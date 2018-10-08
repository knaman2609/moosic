export default function(dispatch){
  return {
    doThis: function(action) {
      dispatch({"payload": "coldplay", type: "play"});
    }
  }
}

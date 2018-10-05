import React, { Component } from 'react';

class App extends Component {
  render(){
    return (
      <audio controls="controls" style={{display:"none"}}>
		    <source src={this.props.songName} type="audio/mpeg"/>
	    </audio>
    );
  }
}

export default App;

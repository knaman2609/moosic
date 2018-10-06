import React, { Component } from 'react';

class Audio extends Component {
  componentWillMount() {
    this.toggle = false;
  }

  componentWillReceiveProps (props) {
    if (this.props.songName !== props.songName) {
      this.toggle = !this.toggle;
    }
  }

  render(){
    if (this.toggle) {
      return (
        <audio controls="controls" style={{display:"none"}}>
          <source src={this.props.songName} type="audio/mpeg"/>
        </audio>
      );
    } else {
      return (
        <div>
          <audio controls="controls" style={{display:"none"}}>
            <source src={this.props.songName} type="audio/mpeg"/>
          </audio>
        </div>
      );
    }

  }
}

export default Audio;

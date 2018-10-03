import React, { Component } from 'react';
import TimeView from './TimeView'

import './App.css';

class PlayerControls extends Component {
  componentWillMount() {
  }

  render() {
    return (
      <div className="PlayerControls">
        <TimeView/>
        <div className="PlayerControlsPanel">
          <img className="ShuffleIcon" src="ic_shuffle.png"/>
          <img className="PrevIcon" src="ic_prev_song.png"/>
          <img className="PlayIcon" src="ic_play.png"/>
          <img className="NextIcon" src="ic_next_song.png"/>
          <img className="RepeatIcon" src="ic_repeat.png"/>
        </div>
      </div>
    );
  }
}

export default PlayerControls;

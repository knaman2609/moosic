import React, { Component } from 'react';
import TimeView from './TimeView'

import './App.css';

class PlayerControls extends Component {
  componentWillMount() {
  }

  handlePlayClick = () =>{
    this.props.onPlay();
  }

  renderPlayIcon = () =>{
    if (this.props.isPlaying) {
      return (
        <img onClick={this.handlePlayClick} className="PlayIcon" src="ic_pause.png"/>
      )
    } else {
      return (
        <img onClick={this.handlePlayClick} className="PlayIcon" src="ic_play.png"/>
      )
    }
  }

  render() {
    return (
      <div className="PlayerControls">
        <TimeView onMoreClick = {this.props.onMoreClick}/>
        <div className="PlayerControlsPanel">
          <img className="ShuffleIcon" src="ic_shuffle.png"/>
          <img className="PrevIcon" src="ic_prev_song.png"/>
          {this.renderPlayIcon()}
          <img className="NextIcon" src="ic_next_song.png"/>
          <img className="RepeatIcon" src="ic_repeat.png"/>
        </div>
      </div>
    );
  }
}

export default PlayerControls;

import React, { Component } from 'react';
import TimeView from './TimeView'

import './App.css';

class PlayerControls extends Component {
  componentWillMount() {
  }

  renderPlayIcon = () =>{
    if (this.props.isPlaying) {
      return (
        <img onClick={this.props.onPause} className="PlayIcon" src="ic_pause.png"/>
      )
    } else {
      return (
        <img onClick={this.props.onPlay} className="PlayIcon" src="ic_play.png"/>
      )
    }
  }

  render() {
    return (
      <div className="PlayerControls">

        <TimeView
          onSongFinished={this.props.onSongFinished}
          isPlaying = {this.props.isPlaying}
          song = {this.props.song}
          onMoreClick = {this.props.onMoreClick}/>

        <div className="PlayerControlsPanel">

          <img className="ShuffleIcon" src="ic_shuffle.png"/>

          <img onClick={this.props.onPrev} className="PrevIcon" src="ic_prev_song.png"/>

          {this.renderPlayIcon()}

          <img onClick={this.props.onNext} className="NextIcon" src="ic_next_song.png"/>
          <img className="RepeatIcon" src="ic_repeat.png"/>
        </div>
      </div>
    );
  }
}

export default PlayerControls;

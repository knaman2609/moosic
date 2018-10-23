import React, { Component } from 'react';
import Progress from './Progress'

import './App.css';

class TimeView extends Component {
  componentWillMount() {
    this.setState({
      currDurationInSeconds: 0,
      currDuration: "0:00",
    });

    this.newSong = true;
    this.timerId = null;
  }

  componentWillReceiveProps(props) {
    if (this.props.song.name != props.song.name) {
      console.log("resetTimer");
      this.resetTimer();
    } else {
      console.log("oldSong");
      this.newSong = false;
    }

    if (props.isPlaying) {
      console.log("startTimer attempted");
      this.startTimer();
    } else if (!props.isPlaying) {
      console.log("stopTimer attempted");
      this.stopTimer();
    }
  }

  resetTimer() {
    this.newSong = true;
    this.state.currDuration = 0;
    this.state.currDurationInSeconds = 0;
    this.state.currDuration = "0:00";
    this.stopTimer();
  }

  startTimer() {
    return;

    if (this.timerId)
      return;

    console.log("timerStarted");
    var _this = this;

    _this.timerId = setInterval(function() {
      if (_this.state.currDurationInSeconds >= _this.props.song.durationInSeconds) {
        _this.resetTimer();
        _this.props.onSongFinished();
        return;
      }

      var time  = _this.state.currDurationInSeconds;
      var minutes = Math.floor(time / 60);
      var seconds = time - minutes * 60;

      if (seconds < 10)
        seconds = "0" + seconds;

      _this.setState({
        currDuration: minutes + ":" + seconds,
        currDurationInSeconds: time + 1
      })
    }, 1000);
  }

  stopTimer() {
    if (!this.timerId)
      return;


    console.log("timerStopped");
    clearInterval(this.timerId);
    this.timerId = null;
  }

  render() {
    if (this.newSong &&
        this.props.song.durationInSeconds > 0) {
      this.startTimer();
    }

    return (
      <div className="TimeViewContainer">
        <Progress
          total={this.props.song.durationInSeconds}
          value={this.state.currDurationInSeconds}/>

        <div className="TimeView">
          <img className="MoreIcon" src="ic_more.png" onClick={this.props.onMoreClick}/>
          <span style={{display: "inlineBock", width: "80px"}}> {this.state.currDuration} / {this.props.song.duration}</span>
        </div>
      </div>
    );
  }
}

export default TimeView;

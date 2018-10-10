import React, { Component } from 'react';
import './App.css';

class TimeView extends Component {
  componentWillMount() {
    this.setState({
      currDurationInSeconds: 0,
      currDuration: "0:00",
    });

    this.restartTimer = true;
    this.timerId = null;
  }

  componentWillReceiveProps(props) {
    if (this.props.song.name != props.song.name) {
      this.restartTimer = true;
      this.state.currDuration = 0;
      this.state.currDurationInSeconds = 0;
      this.state.currDuration = "0:00";
      clearInterval(this.timerId);
    } else {
      this.restartTimer = false;
    }
  }

  render() {
    var _this = this;

    if (this.restartTimer && this.props.song.durationInSeconds > 0) {
      _this.timerId = setInterval(function() {
        if (_this.state.currDurationInSeconds > _this.props.song.durationInSeconds) {
          clearInterval(_this.timerId);
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

    return (
      <div className="TimeView">
        <img className="MoreIcon" src="ic_more.png" onClick={this.props.onMoreClick}/>
        <span> {this.state.currDuration} / {this.props.song.duration}</span>
      </div>
    );
  }
}

export default TimeView;

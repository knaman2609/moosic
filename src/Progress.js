import React, { Component } from 'react';
import './App.css';

class Progress extends Component {
  componentWillMount() {
  }

  render() {
    var boxWidth = Math.floor((300/this.props.total));
    var boxToLightUp = this.props.value*boxWidth;

    return (
      <div className="ProgressContainer">
        <div  style={{width: boxToLightUp + "px"}} className="ProgressView"/>
      </div>
    )
  }
}

export default Progress;

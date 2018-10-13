import React, { Component } from 'react';
import './App.css';

class Progress extends Component {
  componentWillMount() {
  }

  render() {
    var boxWidth = ((300/this.props.total)).toFixed(2);
    var boxToLightUp = (this.props.value*boxWidth).toFixed(2);

    if (this.props.total == this.props.value)
      boxToLightUp = 300;

    return (
      <div className="ProgressContainer">
        <div  style={{width: boxToLightUp + "px"}} className="ProgressView"/>
      </div>
    )
  }
}

export default Progress;

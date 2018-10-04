import React, { Component } from 'react';
import './App.css';

class TimeView extends Component {
  componentWillMount() {
  }

  render() {
    return (
      <div className="TimeView">
        <img className="MoreIcon" src="ic_more.png" onClick={this.props.onMoreClick}/>
        <span>1.22 / 4.02</span>
      </div>
    );
  }
}

export default TimeView;

import React, { Component } from 'react';
import './App.css';

class PlayerDisplay extends Component {
  componentWillMount() {
  }

  render() {
    return (
          <div className="PlayerDisplay">
            <div className="SongName"> {this.props.songName} </div>
            <div className="ArtistName"> Coldplay </div>
          </div>
    );
  }
}

export default PlayerDisplay;

import React, { Component } from 'react';
import './App.css';

class PlayerDisplay extends Component {
  componentWillMount() {
  }

  render() {
    return (
          <div className="PlayerDisplay">
            <div className="SongName"> I wanna love you </div>
            <div className="ArtistName"> Snoop Dogg </div>
          </div>
    );
  }
}

export default PlayerDisplay;

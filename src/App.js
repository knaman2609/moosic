import React, { Component } from 'react';
import PlayerDisplay  from './PlayerDisplay';
import PlayerControls  from './PlayerControls';

import logo from './logo.svg';
import './App.css';

class App extends Component {
  componentWillMount() {
  }

  render() {
    return (
      <div className="Main">
        <div className="PlayerContainer">
          <PlayerDisplay/>
          <PlayerControls/>
        </div>
      </div>
    );
  }
}

export default App;

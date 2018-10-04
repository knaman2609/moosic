import React, { Component } from 'react';
import PlayerDisplay  from './PlayerDisplay';
import PlayerControls  from './PlayerControls';
import PlayList  from './PlayList';

import logo from './logo.svg';
import './App.css';

class App extends Component {
  componentWillMount() {
    this.setState(
      {playListVisible: false}
    );
  }

  renderPlayList() {
    if (this.state.playListVisible) {
      return <PlayList onCloseClick={this.hidePlayList}/>
    } else {
      return <div/>
    }
  }

  showPlayList = () => {
    this.setState({playListVisible: true});
  }

  hidePlayList = () => {
    this.setState({playListVisible: false});
  }

  render() {
    return (
      <div className="Main">
        <div className="PlayerContainer">
          <PlayerDisplay/>
          <PlayerControls onMoreClick={this.showPlayList}/>
          {this.renderPlayList()}
        </div>
      </div>
    );
  }
}

export default App;

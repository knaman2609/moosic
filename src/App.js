import React, { Component } from 'react';
import PlayerDisplay  from './PlayerDisplay';
import PlayerControls  from './PlayerControls';
import PlayList  from './PlayList';
import Audio  from './Audio';

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

  playSlelectedSong = (playing) => {
    var player = document.getElementsByTagName("audio")[0];

    if (playing) {
      player.play();
    } else {
      player.pause();
    }
  }

  render() {
    return (
      <div className="Main">
        <div className="PlayerContainer">
          <PlayerDisplay/>
          <PlayerControls
            onMoreClick={this.showPlayList}
            onPlay={this.playSlelectedSong}
            />
          {this.renderPlayList()}
          <Audio songName="Coldplay - Adventure Of A Lifetime (Official Video).mp3"/>
        </div>
      </div>
    );
  }
}

export default App;

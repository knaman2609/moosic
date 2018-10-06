import React, { Component } from 'react';
import PlayerDisplay  from './PlayerDisplay';
import PlayerControls  from './PlayerControls';
import PlayList  from './PlayList';
import Audio  from './Audio';

import './App.css';

class App extends Component {
  componentWillMount() {
    this.setState(
      {
        playListVisible: false,
        playing: false,
        songName: "",
        songList: []
      }
    );
  }

  renderPlayList() {
    if (this.state.playListVisible) {
      return <PlayList list={this.state.songList} onSongSelect={this.updateCurrentSong}/>
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

  updateCurrentSong = (songName) => {
    var _this = this;

    this.setState({
      songName: songName,
      playing: false
    });

    this.hidePlayList();

    setTimeout(function() {
      _this.playSlelectedSong();
    },0);
  }

  playSlelectedSong = () => {
    var player = document.getElementsByTagName("audio")[0];

    if (!this.state.playing) {
      player.play();
    } else {
      player.pause();
    }

    this.setState({playing: !this.state.playing});
  }

  handleFileSelect = (event) => {
    var songList = [];

    Array.prototype.forEach.call(event.target.files, function(song) {
      songList.push(
        {
          song: song.name,
          artist: "Coldplay",
          duration: "1:00"
        }
      );
    });

    this.setState({
      songList: songList
    });

    var fileInput = document.getElementsByTagName("input")[0];

    fileInput.style.display = "none";
  }

  render() {
    return (
      <div className="Main">
        <div className="PlayerContainer">
          <input onChange={this.handleFileSelect} type="file" multiple/>
          <PlayerDisplay songName={this.state.songName}/>
          <PlayerControls
            isPlaying={this.state.playing}
            onMoreClick={this.showPlayList}
            onPlay={this.playSlelectedSong}
            />
          {this.renderPlayList()}

          <Audio songName={this.state.songName}/>
        </div>
      </div>
    );
  }
}

export default App;

import React, { Component } from 'react';
import { connect } from 'react-redux'

import PlayerDisplay  from './PlayerDisplay';
import PlayerControls  from './PlayerControls';
import PlayList  from './PlayList';
import Audio  from './Audio';
import Actions  from './Actions'


import './App.css';


const mapStateToProps = (state, ownProps) => {
  return {
    player: state
  }
}
const mapDispatchToProps = dispatch =>  Actions(dispatch)

class App extends Component {
  componentWillMount() {

    this.setState(
      {
        playListVisible: false,
        isPlaying: false,
        song: {name: "", duration: "0:00", durationInSeconds: 0}
      }
    );
  }

  renderPlayList() {
    if (this.state.playListVisible) {
      return <PlayList list={this.props.player.songList} onSongSelect={this.updateCurrentSong}/>
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

  updateCurrentSong = (song) => {
    var _this = this;

    this.setState({
      song: song,
      isPlaying: false
    });

    this.hidePlayList();

    setTimeout(function() {
      _this.playSlelectedSong();
    },0);
  }

  playSlelectedSong = () => {
    var player = document.getElementsByTagName("audio")[0];

    if (!this.state.isPlaying) {
      player.play();
    } else {
      player.pause();
    }

    this.setState({isPlaying: !this.state.isPlaying});
  }

  handleFileSelect = (event) => {
    this.props.fetchSongs(event);

    var fileInput = document.getElementsByTagName("input")[0];
    fileInput.style.display = "none";
  }

  handleSongFinished = () => {
    var player = document.getElementsByTagName("audio")[0];

    player.pause();
    console.log("handleSongFinished");

    this.setState({ isPlaying: false});
  }

  render() {

    return (
      <div className="Main">
        <div className="PlayerContainer">
          <input onChange={this.handleFileSelect} type="file" multiple/>

          <PlayerDisplay songName={this.state.song.name}/>

          <PlayerControls
            onSongFinished={this.handleSongFinished}
            song={this.state.song}
            isPlaying={this.state.isPlaying}
            onMoreClick={this.showPlayList}
            onPlay={this.playSlelectedSong}
            />

          {this.renderPlayList()}

          <Audio songName={this.state.song.name}/>
        </div>
      </div>
    );
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App)

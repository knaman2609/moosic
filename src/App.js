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
        song: {name: "", duration: "0:00", durationInSeconds: 0},
        currentSongIndex: 0,
      }
    );
  }

  showPlayList = () => {
    this.setState({playListVisible: true});
  }

  hidePlayList = () => {
    this.setState({playListVisible: false});
  }

  runPlayer = () => {
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

  handleNextClick = () => {
    var nextSongIndex = this.state.currentSongIndex + 1;
    var nextSong = this.props.player.songList[nextSongIndex];

    if (nextSong)
    this.updateCurrentSong(nextSong , nextSongIndex);
  }

  handlePrevClick = () => {
    var prevSongIndex = this.state.currentSongIndex - 1;
    var prevSong = this.props.player.songList[prevSongIndex];

    if (prevSong)
    this.updateCurrentSong(prevSong , prevSongIndex);
  }

  updateCurrentSong = (song, songIndex) => {
    var _this = this;

    this.setState({
      song: song,
      isPlaying: false,
      currentSongIndex: songIndex,
    });

    setTimeout(function() {
      _this.runPlayer();
    },0);
  }

  handlePlayListClick = (song, songIndex) => {
    this.updateCurrentSong(song, songIndex);
    this.hidePlayList();
  }

  renderPlayList() {
    if (this.state.playListVisible) {
      return <PlayList
      onClose={this.hidePlayList}
      list={this.props.player.songList}
      onSongSelect={this.handlePlayListClick}/>

    } else {
      return <div/>
    }
  }

  render() {
    return (
      <div className="MainContainer">
        <input onChange={this.handleFileSelect} type="file" multiple/>

        <div className="MainView">
          <div className="PlayerContainer">

            <PlayerDisplay songName={this.state.song.name}/>

            <PlayerControls
              song={this.state.song}
              isPlaying={this.state.isPlaying}

              onSongFinished={this.handleSongFinished}
              onMoreClick={this.showPlayList}
              onPlay={this.runPlayer}
              onNext={this.handleNextClick}
              onPrev={this.handlePrevClick}
              />

            {this.renderPlayList()}

            <Audio songName={this.state.song.name}/>
          </div>
        </div>
      </div>
    );
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App)

import React, { Component } from 'react';
import { connect } from 'react-redux'

import PlayerDisplay  from './PlayerDisplay';
import PlayerControls  from './PlayerControls';
import PlayList  from './PlayList';
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

  handleFileSelect = (event) => {
    this.props.fetchSongs(event);

    var fileInput = document.getElementsByTagName("input")[0];
    fileInput.style.display = "none";
  }

  handleSongFinished = () => {
    return;

    var player = document.getElementsByTagName("audio")[0];
    var _this = this;

    player.pause();
    console.log("handleSongFinished");

    this.setState({ isPlaying: false});

    setTimeout(function() {
      _this.handleNextClick();
    }, 1000);
  }

  handleNextClick = () => {
    this.props.playNext();
  }

  handlePrevClick = () => {
    this.props.playPrevious();
  }

  playSong = (song, songIndex) =>{
    this.props._playSong();
  }

  pauseSong = () =>{
    this.props._pauseSong();
  }

  updateCurrentSong = (song, songIndex) => {
    var _this = this;

    this.playSong(song, songIndex);
  }

  handlePlayListClick = (song, songIndex) => {
    var _this = this;

    this.hidePlayList();
    var promise = this.props.initSong(song);

    promise.then(function() {
      _this.updateCurrentSong(song, songIndex);
    });
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

            <PlayerDisplay songName={this.props.player.currentSong.song.name}/>

            <PlayerControls
              song={this.state.song}
              isPlaying={this.props.player.isPlaying}
              onSongFinished={this.handleSongFinished}
              onMoreClick={this.showPlayList}
              onPlay={this.playSong}
              onPause={this.pauseSong}
              onNext={this.handleNextClick}
              onPrev={this.handlePrevClick}
              />

            {this.renderPlayList()}
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

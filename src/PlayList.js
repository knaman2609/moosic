import React, { Component } from 'react';
import './App.css';

class PlayListItem extends Component {
  componentWillMount() {
  }

  render() {
    return (
      <div className="PlayListItem">
        <div className="SongName">{this.props.song}</div>
        <div className="ArtistName">{this.props.artist}</div>
        <div className="Duration">{this.props.duration}</div>
        <div className="Separator"/>
      </div>
    );
  }
}

class PlayList extends Component {
  componentWillMount() {
  }

  renderPlayListItems() {
    return [
      {song: "One Thing", artist: "San Holo", duration: "4:01"},
      {song: "One Thing", artist: "San Holo", duration: "4:01"},
      {song: "One Thing", artist: "San Holo", duration: "4:01"},
      {song: "One Thing", artist: "San Holo", duration: "4:01"},
      {song: "One Thing", artist: "San Holo", duration: "4:01"},
      {song: "One Thing", artist: "San Holo", duration: "4:01"},
      {song: "One Thing", artist: "San Holo", duration: "4:01"},
      {song: "One Thing", artist: "San Holo", duration: "4:01"},
      {song: "One Thing", artist: "San Holo", duration: "4:01"},
      {song: "One Thing", artist: "San Holo", duration: "4:01"},
      {song: "One Thing", artist: "San Holo", duration: "4:01"},
      {song: "Kamikaze", artist: "Eminem", duration: "3:21"}]

      .map(function(music, index) {
        return <PlayListItem
        key = {index}
        duration={music.duration}
        song = {music.song}
        artist = {music.artist}/>
    })
  }

  render() {
    return (
      <div className="PlayList" onClick={this.props.onCloseClick}>
        {this.renderPlayListItems()}
      </div>
    );
  }
}

export default PlayList;

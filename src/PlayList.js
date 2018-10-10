import React, { Component } from 'react';
import './App.css';

class PlayListItem extends Component {
  componentWillMount() {
  }

  handleSongSlect =() => {
    this.props.onSongSelect(this.props.song);
  }

  render() {
    return (
      <div className="PlayListItem" onClick={this.handleSongSlect}>
        <div className="SongName">{this.props.song.name}</div>
        <div className="ArtistName">{this.props.song.artist}</div>
        <div className="Duration">{this.props.song.duration}</div>
        <div className="Separator"/>
      </div>
    );
  }
}

class PlayList extends Component {
  componentWillMount() {
  }

  renderPlayListItems = () => {
    var _this = this;

    return this.props.list
      .map(function(song, index) {
        return <PlayListItem
        key = {index}
        onSongSelect = {_this.props.onSongSelect}
        song = {song} />
    });
  }

  render() {
    return (
      <div className="PlayList" >
        {this.renderPlayListItems()}
      </div>
    );
  }
}

export default PlayList;

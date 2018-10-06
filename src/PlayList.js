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

  renderPlayListItems = () => {
    var _this = this;

    return this.props.list
      .map(function(music, index) {
        return <PlayListItem
        key = {index}
        onSongSelect = {_this.props.onSongSelect}
        duration={music.duration}
        song = {music.song}
        artist = {music.artist}/>
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

import React, { Component } from 'react';
import './PlayList.css';

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
      <div className="PlayListContainer" >
        <div className="PlayListBackground"/>

        <div className="PlayListView">
          <img onClick={this.props.onClose} className="HideSongs" src="ic_hide_songs.png"/>

          <div className="PlayList">
            {this.renderPlayListItems()}
          </div>
        </div>

      </div>
    );
  }
}

export default PlayList;

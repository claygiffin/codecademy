import React, { Component } from 'react';
import './App.css';
import SearchBar from '../SearchBar/SearchBar';
import SearchResults from '../SearchResults/SearchResults';
import Playlist from '../Playlist/Playlist';
import Spotify from '../../util/Spotify';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      searchResults: [
        // {
        //   name: 'Dog Paddle',
        //   artist: 'Modest Mouse',
        //   album: 'This is a long drive...',
        //   id: '4',
        //   uri:'test-4'
        // },
        // {
        //   name: 'Your Dog',
        //   artist: 'Soccer Mommy',
        //   album: 'Clean',
        //   id: '5',
        //   uri:'test-5'
        // },
        // {
        //   name: '1 Billion Dogs',
        //   artist: 'Jay Som',
        //   album: 'Everybody Works',
        //   id: '6',
        //   uri:'test-6'
        // }
      ],
      playlistName: 'New Playlist',
      playlistTracks: [
        // {
        //   name: 'Born in the U.S.A.',
        //   artist: 'Bruce Springsteen',
        //   album: 'Born in the U.S.A.',
        //   id: '1',
        //   uri:'test-1'
        // },
        // {
        //   name: 'Dramamine',
        //   artist: 'Modest Mouse',
        //   album: 'This is a long drive...',
        //   id: '2',
        //   uri:'test-2'
        // },
        // {
        //   name: 'Fool On The Hill',
        //   artist: 'The Beatles',
        //   album: 'Magical Mystery Tour',
        //   id: '3',
        //   uri:'test-3'
        // }
      ]

    }
    this.addTrack = this.addTrack.bind(this);
    this.removeTrack = this.removeTrack.bind(this);
    this.updatePlaylistName = this.updatePlaylistName.bind(this);
    this.savePlaylist = this.savePlaylist.bind(this);
    this.search = this.search.bind(this);
  }

  addTrack(track){
    if( this.state.playlistTracks.find(savedTrack => savedTrack.id === track.id )) {
      return;
    } 
    let tracks = this.state.playlistTracks;
    tracks.push(track);
    this.setState({
      playlistTracks: tracks
    });
  }

  removeTrack(track){
    let tracks = this.state.playlistTracks;
    tracks.splice(tracks.indexOf(track), 1);
    this.setState({
      playlistTracks: tracks
    });
  }

  updatePlaylistName(name){
    this.setState({
      playlistName: name
    });
  }

  savePlaylist(){
    let trackURIs = this.state.playlistTracks.map(track => {
      return track.uri
    });
    Spotify.savePlaylist(this.state.playlistName, trackURIs)
    .then(this.setState({
      playlistName: 'New Playlist',
      playlistTracks: []
    }));
  }

  search(term){
    // this.setState({
    //   searchResults: Spotify.search(term)
    // })
    Spotify.search(term).then(tracks => {
      this.setState({
        searchResults: tracks
      })
    });
  }

  render() {
    return (
      <div>
        <h1>Ja<span className="highlight">mmm</span>ing</h1>
        <div className="App">
          <SearchBar onSearch={this.search} />
          <div className="App-playlist">
            <SearchResults 
              searchResults={this.state.searchResults} 
              onAdd={this.addTrack}
            />
            <Playlist 
              playlistName={this.state.playlistName}
              tracks={this.state.playlistTracks} 
              onRemove={this.removeTrack} 
              onNameChange={this.updatePlaylistName} 
              onSave={this.savePlaylist}
            />
          </div>
        </div>
      </div>
    );
  }
}

export default App;
let accessToken = '';
let expiresIn = '';
const clientID = process.env.REACT_APP_CLIENT_ID;
const redirectURI = process.env.REACT_APP_REDIRECT_URI;

const Spotify = {

  getAccessToken(){
    if(accessToken){
      return accessToken;
    } else {
      const accessTokenMatch = window.location.href.match(/access_token=[^&]*/);
      const expiresInMatch = window.location.href.match(/expires_in=[^&]*/);
      if(accessTokenMatch && expiresInMatch) {
        accessToken = accessTokenMatch[0].replace('access_token=', '');
        expiresIn = expiresInMatch[0].replace('expires_in=', '');
        window.setTimeout(() => accessToken = '', expiresIn * 1000);
        window.history.pushState('Access Token', null, '/');
        return accessToken;
      } else {
        window.location.assign(`https://accounts.spotify.com/authorize?client_id=${clientID}&response_type=token&scope=playlist-modify-public&redirect_uri=${redirectURI}`);
      }
    }
  },

  search(term){
    localStorage.setItem('searchTerm', term);
    let accessToken = Spotify.getAccessToken();
    let endpoint = `https://api.spotify.com/v1/search?type=track&q=${term}`;
    return fetch(endpoint, {
      headers: {
        Authorization: `Bearer ${accessToken}`
      }
    }).then(response => {
      if(response.ok){
        return response.json();
      } 
      throw new Error('Request failed!');
    }, networkError => {
      console.log(networkError.message);
    }).then(jsonResponse => {
      if(jsonResponse.tracks){
        return jsonResponse.tracks.items.map(track => {
          return ({
            id: track.id,
            name: track.name,
            artist: track.artists[0].name,
            album: track.album.name,
            uri: track.uri
          })
        });
      } else {
        return [];
      }
    });
  },

  savePlaylist(playlistName, trackURIs){
    if(playlistName && trackURIs){
      let accessToken = Spotify.getAccessToken();
      let authorization = {
        Authorization: `Bearer ${accessToken}`   
      };
      let clientID = '';
      return fetch('https://api.spotify.com/v1/me', {headers: authorization} )
      .then(response => {
        if(response.ok){
          return response.json();
        }
        throw new Error('Request failed!');
      }, networkError => {
        console.log(networkError.message);
      })
      .then(jsonResponse => {
        if(jsonResponse.id){
          clientID = jsonResponse.id;
          console.log(clientID);
          return fetch(`https://api.spotify.com/v1/users/${clientID}/playlists/`, {
            headers: authorization,
            method: 'POST',
            body: JSON.stringify({name: playlistName})
          })
          .then(response => {
            if(response.ok){
              return response.json();
            }
            throw new Error('Request failed!');
          }, networkError => {
            console.log(networkError.message);
          })
          .then(jsonResponse => {
            let playlistID = jsonResponse.id;
            console.log(playlistID);
            return fetch(`https://api.spotify.com/v1/users/${clientID}/playlists/${playlistID}/tracks`, {
              headers: authorization,
              method: 'POST',
              body: JSON.stringify({uris: trackURIs})
            })
            .then(response => {
              if(response.ok){
                return response.json();
              }
              throw new Error('Request failed!');
            }, networkError => {
              console.log(networkError.message);
            })
            .then(jsonResponse => {
              let playlistID = jsonResponse.id;
              alert('Playlist saved!');
              return playlistID;
            })
          })
        }
      })
    } else {
      return [];
    }
  }
  

}

export default Spotify;
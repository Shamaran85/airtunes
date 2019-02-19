import React, { Component } from 'react';

import AddFiles from './AddFiles';
import Playlist from './Playlist';

class App extends Component {
  render() {
    return (
      <div className="container">
        <div className="player__container">
          <h1>AirTunes</h1>
        </div>
        <div className="playlist__container">
          <AddFiles />
          <Playlist />
        </div>
      </div>
    );
  }
}

export default App;

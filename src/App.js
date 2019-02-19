import React, { Component } from 'react';

import AddFiles from './AddFiles';
import Playlist from './Playlist';

class App extends Component {
  render() {
    return (
      <div>
        <p>AirTunes</p>
        <AddFiles />
        <Playlist />
      </div>
    );
  }
}

export default App;

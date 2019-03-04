import React, { Component } from 'react';

import AddFiles from './AddFiles';
import Playlist from './Playlist';
// import Controls from './Controls';

class App extends Component {
  render() {
    return (
      <div className="container">
        <Playlist />
        <AddFiles />
      </div>
    );
  }
}

export default App;

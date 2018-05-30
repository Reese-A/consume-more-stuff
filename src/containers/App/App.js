import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

import HomeContent from '../../components/HomeContent';

class App extends Component {
  render() {
    return (
      <div>
        Consume More Stuff
        <HomeContent />
      </div>
    );
  }
}

export default App;

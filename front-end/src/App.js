import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Axios from 'axios'


class App extends Component {

  async componentDidMount() {
    let res = await Axios.get('/')
    console.log(res)
  }

  render() {
    return (
      <div className="App">
      <h1>No Tocar Web App</h1>
      </div>
    );
  }
}

export default App;

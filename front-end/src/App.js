import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Axios from 'axios'


class App extends Component {

  state = {
    territory: ''
  }

  async componentDidMount() {
    let res = await Axios.get('http://localhost:5000/Profile')
    console.log(res)
    this.setState({
      territory: res.data.message
    })
  }

  sendMessageToServer = async () => {
    await Axios.post('')
  }

  render() {
    return (
      <div className="App">
      <h1>No Tocar Web App</h1>
      <h4>{this.state.territory}</h4>
      </div>
    );
  }
}
export default App;

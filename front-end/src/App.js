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
      <p>I hope that the end product will allow us to create a dynamic do not call list to add, delete, and edit the list with ease but accessible to elders that obtain password.</p>
      <h4>{this.state.territory}</h4>
      </div>
    );
  }
}
export default App;

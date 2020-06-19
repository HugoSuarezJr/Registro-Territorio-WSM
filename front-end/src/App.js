import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Axios from 'axios'


class App extends Component {

  state = {
    territory: '',
    data: ''
  }

  async componentDidMount() {
    let res = await Axios.get('http://localhost:5000')
    console.log(res)
    this.setState({
      territory: res.data.message
    })
  }


  sendMessageToServer = async () => {
    let res = await Axios.post('http://localhost:5000/Do-Not-Call-Contacts', {name: "Bobby", address:"574 woodgate circle, sunrise fl 33326", phone: '954-709-6265'});
    this.setState({
      data: res.data.info
    })
  }

  render() {
    return (
      <div className="App">
      <h1>No Tocar Web App</h1>
      <p>I hope that the end product will allow us to create a dynamic do not call list to add, delete, and edit the list with ease but accessible to elders that obtain password.</p>
      <h4>{this.state.territory}</h4>
      <button onClick={this.sendMessageToServer}>Send message to server</button>
      <h5>{this.state.data}</h5>
      </div>
    );
  }
}
export default App;

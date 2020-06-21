import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Axios from 'axios'


class App extends Component {

  state = {
    territory: '',
    data: '',
    contacts: [],
    contactId: ''
  }

  async componentDidMount() {
    let res = await Axios.get('http://localhost:5000')
    console.log(res)

    let res2 = await Axios.get('http://localhost:5000/Do-Not-Call-Contacts')
    console.log(res2)
    this.setState({
      territory: res.data.message,
      contacts: res2.data.contacts
    })
  }


  sendMessageToServer = async () => {
    let res = await Axios.post('http://localhost:5000/Do-Not-Call-Contacts', this.state);
    console.log(res)

    this.setState({
      data: res.data.message,
      contactId: res.data.newContactId
    })
  }

  doNotCallList = () => {
    return this.state.contacts.map(contact => {
     return <div key={contact._id}>
     <div style={{backgroundColor: 'lightblue', maxWidth: "500px"}}>{contact.name} | {contact.address}</div>
    
     <br/>
     </div>
    })
  }

  saveTyping = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    })
  }

  render() {
    return (
      <div className="App">
      <h1>No Tocar Web App</h1>
      <p>I hope that the end product will allow us to create a dynamic do not call list to add, delete, and edit the list with ease but accessible to elders that obtain password.</p>
      <h4>{this.state.territory}</h4>
      

      <input type="text" placeholder="name" name="name" onChange={this.saveTyping}></input>
      <input type="text" placeholder="address" name="address" onChange={this.saveTyping}></input>
      <input type="text" placeholder="phone" name="phone" onChange={this.saveTyping}></input>
      <button onClick={this.sendMessageToServer}>Save New Contact to database</button>
      
      { this.state.data === 'success' ? 
      <>
      <h5>Your Post to database is: {this.state.data}</h5>
      <h6>The new do not call contact with the ID of "{this.state.contactId}" has been added!</h6> 
      </>
      : <h4>Add Contact</h4> }
      <div style={{textAlign: 'center'}}>
      {this.doNotCallList()}
      </div>

      
      </div>
    );
  }
}
export default App;

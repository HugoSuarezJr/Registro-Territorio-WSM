import React, { Component } from 'react';
import Axios from 'axios'


class Home extends Component {
    state = {
        data: '',
        contacts: [],
        contactId: '',
        openAddContactForm: false
      }
    
      async componentDidMount() {
        let res = await Axios.get('http://localhost:5000')
        console.log(res)
    
        let res2 = await Axios.get('http://localhost:5000/Contacts')
        console.log(res2)
        this.setState({
          territory: res.data.message,
          contacts: res2.data.contacts
        })
      }
    
    
      sendMessageToServer = async () => {
        let res = await Axios.post('http://localhost:5000/Contacts', this.state);
        console.log(res)
    
        let newContacts = [...this.state.contacts]
        newContacts.push({_id: res.data.newContactId, territoryNum: this.state.territoryNum, name: this.state.name, houseNumber: this.state.houseNumber, street: this.state.street, city: this.state.city, zipCode: this.state.zipCode, phone: this.state.phone})
    
        this.setState({
          data: res.data.message,
          contactId: res.data.newContactId,
          newHouse: `${res.data.newHouse} ${res.data.newStreet}`,
          contacts: newContacts,
          openAddContactForm: !this.state.openAddContactForm
        })
      }
    
      doNotCallList = () => {
        return this.state.contacts.map(contact => {
         return <div key={contact._id}>
         <div>{contact.territoryNum} | {contact.name} | {contact.houseNumber} {contact.street} {contact.city} {contact.zipCode} | {contact.phone}</div>
         <button id={contact._id} name={contact.name} onClick={this.deleteContact}>Delete Contact</button>
         <br/>
         </div>
        })
      }
    
      deleteContact = async (e) => {
    
        let id = e.target.id
        let res = await Axios.post('http://localhost:5000/Delete',{_id: id})
        console.log(res)
    
        let newContacts = [...this.state.contacts]
        newContacts.splice(newContacts.findIndex(x => x._id === id), 1)
        console.log(newContacts)
        this.setState({
          contacts: newContacts
        })
      }
    
      saveTyping = (e) => {
        this.setState({
          [e.target.name]: e.target.value,
        })
      }
    
      openAddContactForm = () => {
        this.setState({
          openAddContactForm: !this.state.openAddContactForm
        })
      }
    render() {
        return (
            <div>
        <div className="App">
      <h1>West Spanish Miramar Congregation</h1>
      <h2>Registro de No Tocar</h2>

         <br/>

         { this.state.data === 'success' ? 

      <>
      <h5> {this.state.newHouse} ha sido añadido, gracias! - has been added, thank you!</h5> 
      </>
      : "" }

<div>
      {this.state.openAddContactForm ? 
      <>
      <input type="number" placeholder="# de Territorio" name="territoryNum" onChange={this.saveTyping} required></input>
      <input type="text" placeholder="name" name="name" onChange={this.saveTyping}></input>
      <input type="number" placeholder="# de Casa" name="houseNumber" onChange={this.saveTyping} required></input>
      <input type="text" placeholder="Calle" name="street" onChange={this.saveTyping} required></input>
      <input list="city" type="text" placeholder="Ciudad" name="city" onChange={this.saveTyping} required></input>
        <datalist id="city">
          <option value="Miramar, FL"/>
          <option value="Pembroke Pines, FL"/>
        </datalist>
      <input type="text" placeholder="Zip Code" name="zipCode" onChange={this.saveTyping} required></input>
      <input type="text" placeholder="phone" name="phone" onChange={this.saveTyping}></input>
      <button onClick={this.sendMessageToServer}>Save New Contact to database</button> 
      </> : 
      <button style={{backgroundColor: "lightgreen"}} onClick={this.openAddContactForm}>Añadir Casa / Add House</button> }
</div>

      <br/>
      
     <div>
      {this.doNotCallList()}
     </div>
      </div>
            </div>
        );
    }
}

export default Home;
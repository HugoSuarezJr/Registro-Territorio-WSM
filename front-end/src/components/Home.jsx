import React, { Component } from 'react';
import Axios from 'axios'
import { Link } from 'react-router-dom'

function getAge(dateString) {
  var today = new Date();
  var birthDate = new Date(dateString);
  var age = today.getFullYear() - birthDate.getFullYear();
  var m = today.getMonth() - birthDate.getMonth();
  if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
      age--;
  }
  return age;
}

class Home extends Component {
  state = {
    data: "",
    contacts: [],
    contactId: "",
    openAddContactForm: false,
  };

  async componentDidMount() {
    let res = await Axios.get("http://localhost:5000");
    console.log(res);

    let res2 = await Axios.get("http://localhost:5000/Contacts");
    console.log(res2);
    this.setState({
      territory: res.data.message,
      contacts: res2.data.contacts,
    });
  }

  sendMessageToServer = async (e) => {
    e.preventDefault();
    let res = await Axios.post("http://localhost:5000/Contacts", this.state);
    console.log(res);

    let newContacts = [...this.state.contacts];
    newContacts.push({
      _id: res.data.newContactId,
      territoryNum: this.state.territoryNum,
      name: this.state.name,
      houseNumber: this.state.houseNumber,
      street: this.state.street,
      city: this.state.city,
      zipCode: this.state.zipCode,
      phone: this.state.phone,
      date: this.state.date,
    });

    this.setState({
      data: res.data.message,
      contactId: res.data.newContactId,
      newHouse: `${res.data.newHouse} ${res.data.newStreet}`,
      contacts: newContacts,
      openAddContactForm: !this.state.openAddContactForm,
    });
  };

  doNotCallList = () => {
    return this.state.contacts.map((contact) => {
      return (
        <div key={contact._id}>
          {getAge(contact.date) < 2 ? (
            <div>
              <Link
                to={`/HouseInfo/${contact._id}`}
                style={{ textDecoration: "none", color: "blue" }}
              >
                {contact.territoryNum} | {contact.name} | {contact.houseNumber}
                {contact.street} {contact.city} {contact.zipCode} |
                {contact.phone} | {contact.date}
              </Link>
            </div>
          ) : (
            <div>
              <Link
                to={`/HouseInfo/${contact._id}`}
                style={{ textDecoration: "none", color: "red" }}
              >
                {contact.territoryNum} | {contact.name} | {contact.houseNumber}
                {contact.street} {contact.city} {contact.zipCode} |
                {contact.phone} | {contact.date}
              </Link>
            </div>
          )}
          <button id={contact.date} onClick={this.getMonth}>getMonth</button>
          <button
            id={contact._id}
            name={contact.name}
            style={{ backgroundColor: "red" }}
            onClick={this.deleteContact}
          >
            X
          </button>
          <br />
        </div>
      );
    });
  };

  getMonth = (e) => {
    var dt = new Date(e.target.id);
          var dtm = dt.getMonth();
          var dty = dt.getFullYear();
          console.log(dtm + "/" + dty)
  }

  sortByTerNum = () => {
    let contactsSortedCopy = [...this.state.contacts].sort(
      (a, b) => a.territoryNum - b.territoryNum
    );
    this.setState({
      contacts: contactsSortedCopy,
    });
  };

  sortByDate = () => {
    let contactsSortedCopy = [...this.state.contacts].sort(
      (a, b) => new Date(a.date) - new Date(b.date)
    );
    this.setState({
      contacts: contactsSortedCopy,
    });
  };

  deleteContact = async (e) => {
    if (
      window.confirm(`
        Are you sure you want to DELETE?
        This cannot be undone.`)
    ) {
      let id = e.target.id;
      let res = await Axios.post("http://localhost:5000/Delete", { _id: id });
      console.log(res);

      let newContacts = [...this.state.contacts];
      newContacts.splice(
        newContacts.findIndex((x) => x._id === id),
        1
      );
      console.log(newContacts);
      this.setState({
        contacts: newContacts,
      });
    }
  };

  saveTyping = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };

  openAddContactForm = () => {
    this.setState({
      openAddContactForm: !this.state.openAddContactForm,
    });
  };
  render() {
    return (
      <div>
        <div className="App">
          <h1>West Spanish Miramar Congregation</h1>
          <h2>Registro de No Tocar</h2>

          <br />

          {this.state.data === "success" ? (
            <>
              <h5>
                {" "}
                {this.state.newHouse} ha sido añadido, gracias! - has been
                added, thank you!
              </h5>
            </>
          ) : (
            ""
          )}

          <div>
            {this.state.openAddContactForm ? (
              <form onSubmit={this.sendMessageToServer}>
                <input
                  type="text"
                  placeholder="# de Territorio"
                  name="territoryNum"
                  onChange={this.saveTyping}
                  required
                ></input>
                <input
                  type="text"
                  placeholder="Nombre"
                  name="name"
                  onChange={this.saveTyping}
                ></input>
                <input
                  type="number"
                  placeholder="# de Casa"
                  name="houseNumber"
                  onChange={this.saveTyping}
                  required
                ></input>
                <input
                  type="text"
                  placeholder="Calle"
                  name="street"
                  onChange={this.saveTyping}
                  required
                ></input>
                <input
                  list="city"
                  type="text"
                  placeholder="Ciudad"
                  name="city"
                  onChange={this.saveTyping}
                  required
                ></input>
                <datalist id="city">
                  <option value="Miramar, FL" />
                  <option value="Pembroke Pines, FL" />
                </datalist>
                <input
                  type="text"
                  placeholder="Zip Code"
                  name="zipCode"
                  onChange={this.saveTyping}
                  required
                ></input>
                <input
                  type="text"
                  placeholder="# de Telefono"
                  name="phone"
                  onChange={this.saveTyping}
                ></input>
                <input
                  type="date"
                  placeholder="Fecha"
                  name="date"
                  onChange={this.saveTyping}
                  required
                ></input>
                <input
                  type="text"
                  placeholder="Notas"
                  name="notes"
                  onChange={this.saveTyping}
                ></input>
                <input type="submit" value="Save New Contact to database" />
              </form>
            ) : (
              <button
                style={{ backgroundColor: "lightgreen" }}
                onClick={this.openAddContactForm}
              >
                Añadir Casa / Add House
              </button>
            )}
          </div>

          <br />

          <button onClick={this.sortByTerNum}>Sort By Territory Number</button>
          <button onClick={this.sortByDate}>Sort By Date</button>

          <div>{this.doNotCallList()}</div>
        </div>
      </div>
    );
  }
}

export default Home;
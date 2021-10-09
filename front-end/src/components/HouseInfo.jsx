import React, { Component } from 'react';
import Axios from 'axios'
import { Link } from 'react-router-dom'

function dateFormat(date) {
  let mydate = new Date(date.replace(/-/g, '\/').replace(/T.+/, ''))
  var month = ["January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"][mydate.getMonth()];
  var str = month + ' ' + mydate.getDate() + ', ' + mydate.getFullYear();
  console.log(date)
  console.log(mydate)
  return str
}

class HouseInfo extends Component {

    state = {
        contact: {},
        showForm: false,
    }

async componentDidMount(){
    let res = await Axios.get(`http://localhost:5000/HouseInfo/${this.props.match.params.id}`)
    console.log(res)
    this.setState({
        contact: res.data.contact,
        name: res.data.contact.name,
        date: dateFormat(res.data.contact.date)
    })
    console.log(this.state.date)
}


    showForm = () => {
        this.setState({
            showForm: !this.state.showForm
        })
    }

    saveTyping = (e) => {
        console.log(e.target.value)

        let contact = {...this.state.contact}
        contact[e.target.name] = e.target.value
        this.setState({
          contact,
          [e.target.name]: e.target.value
        })
    }

    updateContact = async (e) => {
        e.preventDefault()
        let res = await Axios.post('http://localhost:5000/Update',this.state)
        console.log(res)

        this.setState({
            showForm: !this.state.showForm
        })
    }

    deleteContact = async () => {
      if(window.confirm("Do you really want to DELETE?")){
      await Axios.post('http://localhost:5000/Delete',this.state.contact).then(() => {
        this.props.history.push('/')
      })
      }
      
    }

    cancelButton = async () => {
      let res = await Axios.get(`http://localhost:5000/HouseInfo/${this.props.match.params.id}`)
    console.log(res)
    this.setState({
        contact: res.data.contact,
        name: res.data.contact.name,
        showForm: !this.state.showForm
    })
    }


    render() {
        return (
          
          <div>
          {/* {this.showDate()} */}
            <Link to="/">
              <button>{"<---"}</button>
            </Link>
            <h1>Territory Info</h1>
            {this.state.showForm ? (
              <>
              <form onSubmit={this.updateContact}>
                <input
                  type="text"
                  placeholder="# de Territorio"
                  name="territoryNum"
                  onChange={this.saveTyping}
                  defaultValue={this.state.contact.territoryNum}
                  required
                ></input>
                <input
                contentEditable="true"
                  type="text"
                  placeholder="Nombre"
                  name="name"
                  defaultValue={this.state.name}
                  onChange={this.saveTyping}
                ></input>
                <input
                  type="text"
                  placeholder="Nombre de Territorio"
                  name="territoryName"
                  onChange={this.saveTyping}
                  defaultValue={this.state.contact.territoryName}
                  required
                ></input>
                <input
                  type="text"
                  placeholder="# de Telefono"
                  name="phone"
                  onChange={this.saveTyping}
                  defaultValue={this.state.contact.phone}
                ></input>
                <input
                  type="date"
                  placeholder="Fecha"
                  name="date"
                  onChange={this.saveTyping}
                  defaultValue={this.state.contact.date}
                  required
                ></input>
                <input
                  type="text"
                  placeholder="Notas"
                  name="notes"
                  onChange={this.saveTyping}
                  defaultValue={this.state.contact.notes}
                ></input>
                <input
                  type="submit"
                  value="Update"
                ></input>
              </form>
              <button onClick={this.cancelButton}>Cancel</button>
              </>
            ) : (
              <>
                <h3>{this.state.contact.name}</h3>
                <h4>{this.state.date}</h4>
                <h4> Terr. #{this.state.contact.territoryNum} </h4>
                <h4>
                  {this.state.contact.territoryName}
                </h4>
                <h4> {this.state.contact.phone} </h4>
                <p>{this.state.contact.notes}</p>
                <button onClick={this.showForm}>Edit</button><button style={{backgroundColor: "red"}} onClick={this.deleteContact}>Delete</button>
              </>
            )}
          </div>
        );
    }
}

export default HouseInfo;
import React, { Component } from 'react';
import Axios from 'axios'

class HouseInfo extends Component {

    state = {
        contact: {}
    }

async componentDidMount(){
    let res = await Axios.get(`http://localhost:5000/HouseInfo/${this.props.match.params.id}`)
    console.log(res)
    this.setState({
        contact: res.data.contact
    })
}

    render() {
        return (
            <div>
                <h1>House Info</h1>
                <h3>{this.state.contact.name}</h3>
            </div>
        );
    }
}

export default HouseInfo;
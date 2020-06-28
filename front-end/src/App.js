import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom'
import './App.css';
import Axios from 'axios'
import Home from './components/Home'
import HouseInfo from './components/HouseInfo'


class App extends Component {

  

  render() {
    return (
      <div className="App">
        <Switch>
          <Route path='/' render={props => <Home {...props}/>}/>
          <Route exact path='/HouseInfo' render={props => <HouseInfo {...props}/>}/>
        </Switch>
      </div>
    );
  }
}
export default App;

import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom'
import './App.css';
import Home from './components/Home'
import HouseInfo from './components/HouseInfo'


class App extends Component {

  

  render() {
    return (
      <div className="App">
        <Switch>
          <Route exact path='/HouseInfo/:id' render={props => <HouseInfo {...props}/>}/>
          <Route path='/' render={props => <Home {...props}/>}/>
        </Switch>
      </div>
    );
  }
}
export default App;

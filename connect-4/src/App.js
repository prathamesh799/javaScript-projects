import React from 'react'
import {BrowserRouter, Switch, Route, Link} from 'react-router-dom'
import Footer from './components/footer'
import Nav from './components/navBar'
import Rules from './components/rules'
import Players from './components/players'
import Game from './components/game'
import './styles.css';

function App() {
  return (
    <BrowserRouter>
    <div className="App">
      <Nav/>            
      <Switch>  
        <Route exact path = "/"> <Rules/> </Route>
        <Route exact path = "/players"> <Game/> </Route>        
      </Switch>
      <Footer/>
    </div>
    </BrowserRouter>
  );
}

export default App;

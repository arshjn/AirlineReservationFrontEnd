import React from 'react';
//import logo from './logo.svg';
import './App.css';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import SearchPage from './SearchPage';
import ReservePage from './ReservePage';
import {Flight} from './SearchTable';
import HomePage from './HomePage';

var testFlight: Flight = {FlightID: 0, SourceCode : "NYC", DestinationCode : "DAL", departure : undefined, arrival : undefined};

function App() {

  return (
    <React.Fragment>
      <Router>
        <Switch>
          <Route exact path = "/" component = {HomePage} />
          <Route path = "/home" component = {HomePage} />
          <Route path = "/search" component = {SearchPage}/>
          <Route path = "/reserve" component = {ReservePage}/>
        </Switch>
      </Router>
    </React.Fragment>
  );
}

export default App;

import React from 'react';
//import logo from './logo.svg';
import './App.css';
import SearchPage from './SearchPage';
import ReservePage from './ReservePage';
import {Flight} from './SearchTable';

var testFlight: Flight = {FlightID: 0, SourceCode : "NYC", DestinationCode : "DAL", departure : undefined, arrival : undefined};

function App() {

  return (
    <div className="App">
      {/*<header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
      */}
      <div>
        {console.log("Started")}
        <ReservePage flight = {testFlight} Class = "E"/>
        {/*<SearchPage />*/}
      </div>
    </div>
  );
}

export default App;

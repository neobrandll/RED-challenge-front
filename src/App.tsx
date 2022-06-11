import React from 'react';
import './App.css';
import Loader from './components/Loader';
import Home from "./views/Home";

function App() {
  return (
    <div className="App">
      <Loader />
      <Home />
    </div>
  );
}

export default App;

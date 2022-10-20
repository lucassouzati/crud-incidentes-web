import { useState } from 'react'
import reactLogo from './assets/react.svg'
import './App.css'
import Create from './components/incidents/create';

  function App() {
    return (
    <div className="main">
      <h2 className="main-header">React Crud Operations</h2>
      <div>
        <Create />
      </div>
    </div>
    );
  }
  
  export default App;

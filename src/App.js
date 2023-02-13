import logo from './logo.svg';
import './App.css';
import Home from './components/Home';
// import Add from './components/Add';
import Add from './components/CreateParticipate';
import Edit from './components/Edit';
import ViewProfile from './components/ViewProfile';
import SupportMessages from './components/SupportMessages';

// import {BrowserRouter as Router, Route, Routes} from 'react-dom';
import { BrowserRouter as Router, Route, Routes} from 'react-router-dom';

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path='/' element={<Home />} />
          {/* <Route path='/create' element={<Add />} /> */}
          <Route path='/create' element={<Add />} />
          <Route path='/edit' element={<Edit />} />
          <Route path='/viewprofile' element={<ViewProfile />} />
          <Route path='/supportmessage' element={<SupportMessages />} />
        </Routes>
      </Router>
    </div>
  );
}




export default App;


{/* <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn Reac
        </a>
      </header> */}

import React, { useContext } from 'react';
import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from './components/Header/Header';
import AddWord from './components/AddWord/AddWord';
import Learn from './components/Learn/Learn';
import Repeat from './components/Repeat/Repeat';
import Home from './components/Home/Home';
import { AppContext } from "./index"
import { useAuthState } from 'react-firebase-hooks/auth';

const App: React.FC = () => {
  const context = useContext(AppContext)
  const [user] = useAuthState(context?.auth)
  console.log(user)

  return (
    <div className="App">
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path='/' element={<Home />}></Route>
          {user &&
            (<><Route path='/addingWord' element={<AddWord />}></Route>
              <Route path='/repeatWords' element={<Repeat />}></Route>
              <Route path='/learnWords' element={<Learn />}> </Route></>)}
        </Routes>
      </BrowserRouter>

    </div>
  );
}

export default App;

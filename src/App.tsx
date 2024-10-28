import React from 'react';
import Navbar from './Navbar.tsx';
import File from './File.tsx'; // Import the File component
import Footer from "./Footer.tsx"
import { Switch, Route } from "wouter";
import Home from "./Home.tsx"
import Chat from "./Chat.tsx"
import { ToastContainer } from 'react-toastify'
  import 'react-toastify/dist/ReactToastify.css';

const App = (props: {}) => {
  return (
    <>
    <div className="main">
      <Navbar /> {/* Navbar is always rendered */}
      <Switch>
        <Route path="/file" component={File} />
        <Route path="/chat" component={() => <Chat/>} />
        <Route>
         <Home/>
        </Route>
      </Switch>
    </div>

      <Footer/>
      <ToastContainer/>
      </>
  );
};

export default App;

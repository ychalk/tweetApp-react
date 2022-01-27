import { useEffect, useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Profile from "./Components/Profile";
import Login from "./Components/Login";
import Signup from "./Components/Signup";
import Home from "./Components/Home";
import Navbar from "./Components/Navbar";
import AppContext from "./Context/AppContext";
import PrivateRoute from "./Components/PrivateRoute";

import "./App.css";

function App() {
  const [user, setUser] = useState();
  const [redirect, setRedirect] = useState();
  const [noteInput, setNoteInput] = useState();
  const [titleInput, setTitleInput] = useState();
  const [formData, setFormData] = useState();
  const [noteArray, setNoteArray] = useState([]);
  const [editArray, setEditArray] = useState([]);
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState(null)
  const [isFormComplete, setIsFormComplete] = useState(false);



  useEffect(() => {
    // After user logs in, get user object from successful login
    if (user) {
      console.log(user);
    }
  }, [user]);

  useEffect(() => {
    console.log(redirect);
    setRedirect();
  }, [redirect]);
 
  return (
    <div className="app">
      <AppContext.Provider value={{
        user: user,
        setUser: setUser,
        noteInput:noteInput,
        setNoteInput:setNoteInput,
        noteArray:noteArray,
        setNoteArray:setNoteArray,
        titleInput:titleInput,
        setTitleInput:setTitleInput,
        formData:formData,
        setFormData:setFormData,
        isFormComplete:isFormComplete,
        setEditArray:setEditArray,
        redirect: redirect,
        setRedirect: setRedirect,
      }} >
      
      <Router>
          <Navbar />

          <Route exact path="/login" component={Login} />
          <Route exact path="/signup" component={Signup} />

          <PrivateRoute exact path="/user/:id" component={Profile} />
      
          <Route exact path="/" component={Home} />
          <Route exact path="/Profile" component={Profile} />          

        </Router>

        </AppContext.Provider>

    </div>
  
  );
}

export default App;

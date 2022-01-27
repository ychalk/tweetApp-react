import { useState, useContext } from "react";
import { useEffect } from "react/cjs/react.development";
import { Redirect } from "react-router-dom";
import AppContext from "../Context/AppContext";


import "../App.css";



function Form(props) {
  const appContext = useContext(AppContext);

  const {
    noteInput,
    setNoteInput,
    setNoteArray,
    setFormData,
    isFormComplete,
    setIsFormComplete, 
    
  } = props;
  const [isLoading, setIsLoading] = useState(null)
  const [error, setError] = useState(null)

  const handleChangeNote = (e) => {

    setNoteInput(e.target.value);

    if (e.target.value.length>140){
        setIsFormComplete(false);         
              }
  };

  const date= new Date().toISOString()
  const userName="savedUsername"
 
  const handleSubmit = () => {

    const finalData = {
        content: noteInput,
        userName: JSON.parse(
        localStorage.getItem('users')),
        date: date,   
    }

    setIsLoading(true);
    fetch(
      "https://micro-blogging-dot-full-stack-course-services.ew.r.appspot.com/tweet",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(finalData),
      }
    )
      .then((response) => response.json())
       
      .then((data) => {
        setIsLoading(false);
      })
      .catch((error) => {
        console.error("Error:", error);
      });       
   
    setNoteArray((prevState) => {
      return [finalData, ...prevState];
    });
    setNoteInput("");
    setFormData({});  
    
  }


  return (
 
    <div className="tweetWrapper">
      {/* Form */}
      <textarea 
       maxLength="140"
       className="tweet" 
       type="text" 
       cols="40" rows="5" 
       placeholder= "What you have in mind..." 
       value={noteInput}
       onChange={handleChangeNote}
      />
      <br></br>
    <div className="buttonWrapper">
      
     {!isLoading && <button 
      disabled={!isFormComplete}
      className={`submitButton-${!isFormComplete}`} 
      onClick={handleSubmit}>
        TWEET
      </button>}
      {isLoading && <button
      disabled className="addingTweet">
       ADDING TWEET...
      </button>}
      </div>
    </div>

  );
}

export default Form;

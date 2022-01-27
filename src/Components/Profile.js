import { useEffect, useState } from "react";
import "../App.css";

function Profile() {  
      
      const [userName, setUserName] = useState('Anonymous');    
     
      const handleUserSubmit = () => {   
        console.log(userName);
        setUserName(userName);
      }

      useEffect(() => {
       const savedUsername = JSON.parse(
         localStorage.getItem('users'));
         if(savedUsername){
           setUserName(savedUsername);
         }

      }, []);
    
      useEffect(() => {
        console.log(localStorage)
        localStorage.setItem('users', 
        JSON.stringify(userName))
        
      }, [handleUserSubmit]); 
   
 
  return (
    <div className="pageWrapper">

      <div className="profile">
      Profile
      </div>         
     
      <div className="username">
      Username
      </div>

      <div className="inputButtonWrapper">
        <input
          type="text"
          placeholder="Username"
          className= "usernameInput"
          name={`username`}
          value={userName}

        onChange={(e)=>setUserName(e.target.value)}

        />
        <button
         className="saveButton"
         onClick={handleUserSubmit} >
            Save
         </button>
      </div>  
    
    </div> 
  );
}

export default Profile;
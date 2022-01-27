import "../App.css";
import { useContext, useState } from "react";
import AppContext from "../Context/AppContext";
import { handleChangeInput } from "../Lib/functions";
import { useEffect } from "react/cjs/react.development";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";

function Signup() {
  const appContext = useContext(AppContext);
  const [formData, setFormData] = useState({});
  const [isFormComplete, setIsFormComplete] = useState(false);
  const [showAlert, setShowAlert] = useState(true);

  const handleInput = (e) => {
    handleChangeInput(e, formData, setFormData);
  };

  

  const handleSubmit = () => {

    console.log("handlesubmit")

    const auth = getAuth();
    createUserWithEmailAndPassword(auth, formData.email, formData.password)
    .then((userCredential) => {
      // Signed in 
      const user = userCredential.user;
      console.log(user)
      const userObj = {
                  email: user.email,
                  authId: user.uid,
                  created_date: Date.now(),
                  updated_date: Date.now(),
                };
    
                console.log(userObj)
    
                getAuth
                          .database()
                          .ref("users/" + user.uid)
                          .set(userObj);
                      })
    
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
    });
    
  }

  useEffect(() => {
    if (
      formData.email &&
      formData.password &&
      formData.confirmPassword &&
      formData.password === formData.confirmPassword
    ) {
      setIsFormComplete(true);
    } else {
      setIsFormComplete(false);
    }
  }, [formData]);

  useEffect(() => {
    if (
      formData.password !== formData.confirmPassword ||
      !formData.password ||
      !formData.confirmPassword
    ) {
      setShowAlert(true);
    } else {
      setShowAlert(false);
    }
  }, [formData]);

  return (
    <div className={``}>
      <h1>Signup</h1>
      <div>
        <input
          type="text"
          placeholder="Email"
          className={``}
          name={`email`}
          onChange={handleInput}
        />
        <input
          type="password"
          placeholder="Password"
          className={``}
          name={`password`}
          onChange={handleInput}
        />
        <input
          type="password"
          placeholder="Confirm password"
          className={``}
          name={`confirmPassword`}
          onChange={handleInput}
        />
        {showAlert && <div>Passwords must match</div>}
        <button disabled={!isFormComplete} onClick={handleSubmit}>
          Submit
        </button>
      </div>
    </div>
  );
}

export default Signup;
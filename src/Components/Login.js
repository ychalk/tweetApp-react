import { useContext, useEffect, useState } from "react/cjs/react.development";
import { Redirect, useHistory } from "react-router-dom";
import "../App.css";
import AppContext from "../Context/AppContext";
import { getUserById } from "../Lib/firebaseFunctions";
import { getAuth, signInWithEmailAndPassword} from "firebase/auth";


function Login() {
  const appContext = useContext(AppContext);
  const [formData, setFormData] = useState({});
  const [redirect, setRedirect] = useState();
  const history=useHistory();


  const handleChangeInput = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setFormData({ ...formData, [name]: value });
  };

  useEffect(() => {
    console.log(formData);
  }, [formData]);

  const handleLogin = () => {

    console.log("handlelogin")

    const auth = getAuth();
    signInWithEmailAndPassword(auth, formData.email, formData.password)
      .then((userCredential) => {
        // Signed in 
        const user = userCredential.user;
        const userById = getUserById(user.uid);
            console.log(userCredential)

        if (appContext.user) {
          console.log(appContext.user)
          history.push('/');
        }    
      })
      
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
      });

}


useEffect(() => {
 
  if (appContext.user) {
    console.log(appContext.user)
    history.push('/');
  }
  if (!appContext.user) {
    history.replace("/login");
  }
}, [appContext.user]); 


  return (
    <div>
      {redirect && <Redirect to={redirect} />}
      <input
        type="text"
        placeholder="email"
        onChange={handleChangeInput}
        value={formData["email"]}
        name="email"
      />
      <input
        type="text"
        placeholder="password"
        onChange={handleChangeInput}
        value={formData["password"]}
        name="password"
      />
      <button onClick={handleLogin}>Login</button>
    </div>
  );
}

export default Login;
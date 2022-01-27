import { useEffect, useState, useContext } from "react";
import List from "./List.js";
import Form from "./Form.js";
import Loader from "./Loader";
import AppContext from "../Context/AppContext";
import "../App.css";

function Home() {

  const appContext = useContext(AppContext);

  const [noteInput, setNoteInput] = useState();
  const [titleInput, setTitleInput] = useState();
  const [formData, setFormData] = useState();
  const [noteArray, setNoteArray] = useState([]);
  const [editArray, setEditArray] = useState([]);
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState(null)
  const [isFormComplete, setIsFormComplete] = useState(false);
  const [reload, setReload] = useState(true);

  useEffect(() => {
    if (
      formData &&
      formData ["noteInput"]
    ) {
      setIsFormComplete(true);
    } 
   
    else {
      setIsFormComplete(false);
    }

  }, [formData]);
  
  const date=new Date().toISOString()

  useEffect(() => {
    const newFormData = {

      noteInput: noteInput,
      date: date,
     
    };

    setFormData(newFormData);
  }, [noteInput]);
 
  useEffect(() => {

    const interval = setInterval(()=>{
  
    fetch(`https://micro-blogging-dot-full-stack-course-services.ew.r.appspot.com/tweet`)
       .then(res=>{
         if(!res.ok){
           throw Error('Error')
         }
         return res.json()
       })
       .then(data=>{

        console.log(data.tweets);  
        setNoteArray(data.tweets);
        setIsLoading(false);
        setError(null)

       })

       .catch(err=>{
         setIsLoading(false)
         setError(err.message)
       })

      },40000);
      return () => {
          clearInterval(interval)
      }

  }, []);

  useEffect(() => { 
  
    fetch(`https://micro-blogging-dot-full-stack-course-services.ew.r.appspot.com/tweet`)
       .then(res=>{
         if(!res.ok){
           throw Error('Error')
         }
         return res.json()
       })
       .then(data=>{

        console.log(data.tweets);  
        setNoteArray(data.tweets);
        setIsLoading(false);
        setError(null)

       })

       .catch(err=>{
         setIsLoading(false)
         setError(err.message)
       })      

  }, []);

  return (
    <div className="pageWrapper">
      <Form
        noteInput={noteInput}
        setNoteInput={setNoteInput}
        setNoteArray={setNoteArray}
        titleInput={titleInput}
        setTitleInput={setTitleInput}
        formData={formData}
        setFormData={setFormData}
        isFormComplete={isFormComplete}
        setEditArray={setEditArray}
      />
{error && <div>{error}</div>} 
{ isLoading && <Loader />} 
{ noteArray && <List noteArray={noteArray} setNoteArray={setNoteArray} />}

    </div>
  );
}

export default Home;

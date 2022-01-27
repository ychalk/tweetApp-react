import "../App.css";
import { useEffect, useState, useContext } from "react";
import AppContext from "../Context/AppContext";


function List(props) {

  const appContext = useContext(AppContext);


  const [isEditing, setIsEditing] = useState(null);
  const { 
    noteArray,   
  } = props;
  

  return (
    <div className="listContainer">
      {/* List */}
      {noteArray.map((item, index) => {
        return (
          <div className="listItem" key={item.noteInput + index}>

           <div className="nameDateWrapper">
            <div>{item.userName}</div>
            <div className="date">{item.date}</div>
           </div> 
            <div> <br></br>  </div>
            <div>{item.content}</div>

      
          </div>
        );
      })}
    </div>
  );
}

export default List;
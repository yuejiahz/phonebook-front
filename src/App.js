//external imports
import { useState, useEffect } from 'react';
import axios from 'axios';

//internal imports
import './App.css';



function App() {

  const [phonelist,setPhoneList]=useState();

  const handlers={
    getPhoneList:async ()=>{
      const promise = await axios.get('http://localhost:3001/info');
      console.log(promise)
    }
  }
useEffect(()=>{
console.log("jello")
},[])
handlers.getPhoneList();
console.log("jello2")

  return (
    <div className="App">
      <header className="App-header">
       Phonebook
       <br/>
       <br/>
       <div style={{display:"flex", justifyContent:"space-around", width:"550px"}}>
       <input  style={{width:"200px"}} placeholder='Please insert contact name'></input>
       <input  style={{width:"200px"}} placeholder='Please insert contact number'></input>
       <button type="html"> Submit</button>
       </div>
       <br/>

       <ul  style={{width:"550px"}}>
        <li>list</li>
        <li>list</li>
        <li>list</li>
        <li>list</li>
       </ul>
      </header>
    </div>
  );
}

export default App;

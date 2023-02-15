//external imports
import { useState, useEffect } from "react";
import axios from "axios";

//internal imports
import "./App.css";

function App() {
  const [phonelist, setPhoneList] = useState();
  const [phoneInfo, setPhoneInfo] = useState();
  const [newContactInfo, setNewContactInfo] = useState(
  { name:"", number:""}
  ) 

  const handlers = {
    getPhoneList: async () => {
      const promise = await axios.get("http://localhost:3001/info");
      const list = await axios.get("http://localhost:3001/api/persons");
      setPhoneList(list.data);
      setPhoneInfo(promise.data);
    },
    submit: async (e) => {
      console.warn("submit");
      e.preventDefault();
      console.log(newContactInfo)
      const rs =await axios.post("http://localhost:3001/api/persons",newContactInfo);
      if(rs){
        handlers.getPhoneList();
      }

    },
  };

  useEffect(() => {
    handlers.getPhoneList();
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        Phonebook
        <br />
        <br />
        <form onSubmit={handlers.submit}>
          <div
            style={{
              display: "flex",
              justifyContent: "space-around",
              width: "550px",
            }}
          >
            <input
              style={{ width: "200px" }}
              placeholder="Please insert contact name"
              name="name"
              value={newContactInfo.name}
              onChange={(event)=>setNewContactInfo({...newContactInfo, name:event.target.value})}
            ></input>
            <input
              style={{ width: "200px" }}
              placeholder="Please insert contact number"
              name="number"
              value={newContactInfo.number}
              onChange={(event)=>setNewContactInfo({...newContactInfo, number:event.target.value})}
            ></input>
            <button type="html"> Submit</button>
          </div>
        </form>
        <br />
        {phonelist &&
          phonelist.map((i) => (
            <ul style={{ width: "550px" }} key={i.id}>
              {i.name} {i.number}
            </ul>
          ))}
        {phoneInfo}
      </header>
    </div>
  );
}

export default App;

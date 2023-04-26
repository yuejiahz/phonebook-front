//external imports
import { useState, useEffect, useMemo } from "react";
import axios from "axios";
import {Table} from 'antd';


//internal imports
import "./App.css";

function App() {
  const [phonelist, setPhoneList] = useState();
  const [phoneInfo, setPhoneInfo] = useState();
  const [newContactInfo, setNewContactInfo] = useState({
    name: "",
    number: "",
  });

  const handlers = {
    getPhoneList: async () => {
      const promise = await axios.get("http://localhost:3001/info");
      const list = await axios.get("http://localhost:3001/api/persons");
      setPhoneList(list.data);
      setPhoneInfo(promise.data);
    },
    submit: async (e) => {
      e.preventDefault();
      const rs = await axios.post(
        "http://localhost:3001/api/persons",
        newContactInfo
      );
      if (rs) {
        handlers.getPhoneList();
      }
    },
    delete: async (id) => {
      console.log(id);
      // const rs = await axios.delete(`http://localhost:3001/api/persons/${id}`);
      // if (rs) {
      //   await handlers.getPhoneList();
      // }
    },
  };

  useMemo(async() => {
    if(!phonelist){
       await handlers.getPhoneList()
    }
  },[]);

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
              onChange={(event) =>
                setNewContactInfo({
                  ...newContactInfo,
                  name: event.target.value,
                })
              }
            ></input>
            <input
              style={{ width: "200px" }}
              placeholder="Please insert contact number"
              name="number"
              value={newContactInfo.number}
              onChange={(event) =>
                setNewContactInfo({
                  ...newContactInfo,
                  number: event.target.value,
                })
              }
            ></input>
            <button type="html"> Submit</button>
          </div>
        </form>
        <br />
        <form >
          <Table columns={[{dataIndex:"name", title:"Name"},{dataIndex:"number", title:"Contact"},
          // { title:"Action", render:(i)=>(<button onChange={(e) => {
          //   handlers.delete(i.id)}}>Delete</button>)}
          ]}
           pagination={false} dataSource={phonelist}
           rowKey="id"
           />
      
          </form> 
          <div style={{position:"absolute", bottom:0}}>

        {phoneInfo}
          </div>
      </header>
    </div>
  );
}

export default App;

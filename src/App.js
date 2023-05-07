//external imports
import { useState, useMemo } from "react";
import axios from "axios";
import { Table, Button, Input, Row, Col, Typography} from "antd";

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
      // try{
      const rs = await axios.post(
        "http://localhost:3001/api/persons",
        newContactInfo
      ).then((rs)=>{
        if (rs) {
          handlers.getPhoneList();
          }
      }).catch((err)=>{
        console.error(err.response.data.error)
        alert(`${err.response.data.error}`)
      })
    },
    delete: async (id) => {
      const rs = await axios.delete(`http://localhost:3001/api/persons/${id}`);
      if (rs) {
        await handlers.getPhoneList();
      }
    },
  };

  useMemo(async () => {
    if (!phonelist) {
      await handlers.getPhoneList();
    }
  }, [phonelist]);

  return (
    <div className="App">
      <header className="App-header">
       <h1> Phonebook </h1>
        <br />
        <form onSubmit={handlers.submit}>
          <Row gutter={[16,16]}>
            <Col>
            <Input
              style={{ width: "300px" }}
              placeholder="Please insert contact name"
              name="name"
              value={newContactInfo.name}
              onChange={(event) =>
                setNewContactInfo({
                  ...newContactInfo,
                  name: event.target.value,
                })
              }
            ></Input>
            </Col>
            <Col>
            <Input
              style={{ width: "300px" }}
              placeholder="Please insert contact number"
              name="number"
              value={newContactInfo.number}
              onChange={(event) =>
                setNewContactInfo({
                  ...newContactInfo,
                  number: event.target.value,
                })
              }
            ></Input>
            </Col>
            <Col>
            <Button  type="primary" htmlType="submit"> Submit</Button>
            </Col>
          </Row>
           
        </form>
        <br />
        <br />
        <form>
          <Table 
          style={{width:"1000px"}}
            columns={[
              { dataIndex: "name", title: "Name" },
              { dataIndex: "number", title: "Contact" },
              {
                title: "Action",
                width:200,
                render: (data) => (
                  <Button
                    onClick={() => {
                      handlers.delete(data.id);
                    }}
                    danger
                  >
                    Delete
                  </Button>
                ),
              },
            ]}
            pagination={false}
            dataSource={phonelist}
            rowKey="id"
          />
        </form>
        <div style={{ position: "absolute", bottom: "80px", fontSize:"1.3rem" }}>
          {phoneInfo}</div>
      </header>
    </div>
  );
}

export default App;

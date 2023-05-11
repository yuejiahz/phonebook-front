//external imports
import { useState, useMemo } from "react";
import axios from "axios";
import { Table, Button, Input, Row, Col, Space, Modal, Form } from "antd";

//internal imports
import "./App.css";
import FormItem from "antd/es/form/FormItem";

function App() {
  const [phonelist, setPhoneList] = useState();
  const [phoneInfo, setPhoneInfo] = useState();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newContactInfo, setNewContactInfo] = useState({
    name: "",
    number: "",
  });
  const [editFormValue, setEditFormValue] = useState();

  const [form] = Form.useForm();
  const [editForm] = Form.useForm();
  const handlers = {
    getPhoneList: async () => {
      const promise = await axios.get("http://localhost:3001/info");
      const list = await axios.get("http://localhost:3001/api/persons");
      setPhoneList(list.data);
      setPhoneInfo(promise.data);
    },
    submit: async (e) => {
      e.preventDefault();
      await axios
        .post("http://localhost:3001/api/persons", newContactInfo)
        .then((rs) => {
          if (rs) {
            handlers.getPhoneList();
          }
        })
        .catch((err) => {
          console.error(err.response.data.error);
          alert(`${err.response.data.error}`);
        });
    },
    delete: async (id) => {
      const rs = await axios.delete(`http://localhost:3001/api/persons/${id}`);
      if (rs) {
        await handlers.getPhoneList();
      }
    },
    edit: async (id, value) => {
      const rs = await axios.put(
        `http://localhost:3001/api/persons/${id}`,
        value
      );
      if (rs) {
        await handlers.getPhoneList();
      }
    },
  };

  useMemo(async () => {
    if (!phonelist) {
      return handlers.getPhoneList();
    }
  }, [phonelist]);

  return (
    <div className="App">
      <header className="App-header">
        <h1> Phonebook </h1>
        <br />
        <form onSubmit={handlers.submit}>
          <Row gutter={[16, 16]}>
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
              <Button type="primary" htmlType="submit">
                {" "}
                Submit
              </Button>
            </Col>
          </Row>
        </form>
        <br />
        <br />
        <form>
          <Table
            style={{ width: "1000px" }}
            columns={[
              { dataIndex: "name", title: "Name" },
              { dataIndex: "number", title: "Contact" },
              {
                title: "Action",
                width: 200,
                render: (data) => (
                  <Space>
                    <Button
                      onClick={() => {
                        setIsModalOpen(true);
                        setEditFormValue({ ...editFormValue, id: data.id });
                      }}
                    >
                      Edit
                    </Button>
                    <Button
                      onClick={() => {
                        handlers.delete(data.id);
                      }}
                      danger
                    >
                      Delete
                    </Button>
                  </Space>
                ),
              },
            ]}
            pagination={false}
            dataSource={phonelist}
            rowKey="id"
          />
        </form>
        <Modal
          title="Edit Contact"
          open={isModalOpen}
          onCancel={() => setIsModalOpen(false)}
          onOk={() => {
            handlers.edit(editFormValue?.id, editFormValue);
            editForm.resetFields();
            setIsModalOpen(false);
          }}
        >
          <Form
            form={editForm}
            onValuesChange={(v) =>
              setEditFormValue({ ...v, id: editFormValue?.id })
            }
          >
            <Row gutter={[16, 16]}>
              <Col span={12}>
                <Form.Item name="name">
                  <Input
                    style={{ width: "300px" }}
                    placeholder="Please insert contact name"
                    // value={}
                  ></Input>
                </Form.Item>
              </Col>
              <Col>
                <Form.Item name="number">
                  <Input
                    style={{ width: "300px" }}
                    placeholder="Please insert contact number"
                    // value={newContactInfo.number}
                  ></Input>
                </Form.Item>
              </Col>
              {/* <Col>
            <Button  type="primary" htmlType="submit"> Submit</Button>
            </Col> */}
            </Row>
          </Form>
        </Modal>
        <div
          style={{ position: "absolute", bottom: "80px", fontSize: "1.3rem" }}
        >
          {phoneInfo}
        </div>
      </header>
    </div>
  );
}

export default App;

import React, { useState } from "react";
import { useDispatch } from "react-redux";
import "antd/dist/antd.css";
import { Input, InputNumber, Form, Button, Modal, Select } from "antd";
import { addAccountBook } from "../../actions/visualizations";
const AddAccountBook = () => {
  const initialAddAccountState = {
    type: "",
    title: "",
    description: "",
    total: null,
  };

  const { Option } = Select;

  const [addAccount, setAddAccount] = useState(initialAddAccountState);
  const [type, setType] = useState([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [total, setTotal] = useState();
  const [visibleForm, setVisibleForm] = useState(false);
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const dispatch = useDispatch();

  const addNewAccount = () => {
    dispatch(addAccountBook(type, title, description, total))
      .then((data) => {
        setAddAccount({
          id: data.id,
          type: data.type,
          title: data.title,
          description: data.description,
          total: data.total,
        });
        setSubmitted(true);
        setType("");
        setTitle("");
        setDescription("");
        setTotal();
        setVisibleForm(false);
        console.log(type);
        console.log(title);
        console.log(description);
        console.log(total);
        window.location.reload();
      })
      .catch((e) => {
        console.log(e);
      });
  };

  const newAccount = () => {
    setAddAccount(initialAddAccountState);
    setSubmitted(false);
  };

  const showAddForm = () => {
    setVisibleForm(true);
  };

  const handleSubmitForm = () => {
    setVisibleForm(false);
  };

  const handleCancelForm = () => {
    setVisibleForm(false);
  };

  const handleErrorForm = (err) => {
    console.log(err);
  };

  return (
    <div style={{ fontFamily: "'Kanit', sans-serif" }}>
      <p align="right" className="buttonplus">
        <Button
          type="primary"
          style={{ background: "#52c41a", borderColor: "#0a1931" }}
          onClick={showAddForm}
          size="middle"
        >
          + ???????????????????????????????????????????????????-?????????????????????
        </Button>
      </p>
      <Modal
        visible={visibleForm}
        title="??????????????????????????????????????????/?????????????????????"
        centered
        width="500px"
        onOk={handleSubmitForm}
        onCancel={handleCancelForm}
        style={{ fontFamily: "'Kanit', sans-serif", fontWeight: "bolder" }}
        footer={[
          <Button type="danger" onClick={handleCancelForm}>
            ?????????
          </Button>,
          <Button
            key="submit"
            type="primary"
            loading={loading}
            onClick={addNewAccount}
          >
            ??????????????????
          </Button>,
        ]}
      >
        <Form
          labelCol={{ span: 6 }}
          wrapperCol={{ span: 15 }}
          layout="horizontal"
          size={"middle"}
          className="addformmodal"
          name="control-ref"
          style={{ fontFamily: "'Kanit', sans-serif", fontWeight: "bolder" }}
        >
          <Form.Item label="??????????????????/?????????????????????">
            <Select
              showSearch
              style={{ fontFamily: "'Kanit', sans-serif", width: 200 }}
              placeholder="????????????????????????????????????????????????????????????"
              optionFilterProp="children"
              filterOption={(input, option) =>
                option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
              }
              onChange={(value) => setType(value)}
              value={type}
            >
              <Option
                value="??????????????????"
                style={{ fontFamily: "'Kanit', sans-serif" }}
              >
                ??????????????????
              </Option>
              <Option
                value="?????????????????????"
                style={{ fontFamily: "'Kanit', sans-serif" }}
              >
                ?????????????????????
              </Option>
            </Select>
          </Form.Item>
          <Form.Item label="??????????????????">
            <Input onChange={(e) => setTitle(e.target.value)} />
          </Form.Item>
          <Form.Item label="????????????????????????">
            <Input onChange={(e) => setDescription(e.target.value)} />
          </Form.Item>
          <Form.Item label="???????????????????????????(?????????)">
            <InputNumber onChange={(value) => setTotal(value)} />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default AddAccountBook;

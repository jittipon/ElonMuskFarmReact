import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { saveTask } from "../../actions/tasks";
import "antd/dist/antd.css";
import {
  Select,
  Input,
  Form,
  InputNumber,
  Upload,
  Switch,
  Button,
  Checkbox,
  Modal,
} from "antd";
import { QrcodeOutlined, UploadOutlined } from "@ant-design/icons";
import QrReader from "react-qr-reader";
import "./AddTask.css";
const { Option } = Select;

const AddTask = () => {
  const initialTaskState = {
    id: null,
    type: "",
    water: null,
    fertilizer: "",
    disease: false,
    etc: "",
    durian_id: "",
  };
  const [task, setTask] = useState(initialTaskState);
  const [submitted, setSubmitted] = useState(false);
  const [type, setType] = useState([]);
  const [water, setWater] = useState();
  const [fertilizer, setFertilizer] = useState("");
  const [disease, setDisease] = useState(false);
  const [etc, setEtc] = useState("");
  const [durian_id, setDurian_id] = useState("");
  const [saveAll, setSaveAll] = useState(false);
  const [visible, setVisible] = useState(false);
  const [loading, setLoading] = useState(false);

  const dispatch = useDispatch();

  const saveNewTask = () => {
    dispatch(
      saveTask(type, water, fertilizer, disease, etc, durian_id, saveAll)
    )
      .then((data) => {
        setTask({
          id: data.id,
          type: data.type,
          water: data.water,
          fertilizer: data.fertilizer,
          disease: data.disease,
          etc: data.etc,
          durian_id: data.durian_id,
          saveAll: data.saveAll,
        });
        setSubmitted(true);
        setType();
        setWater();
        setFertilizer();
        setDisease();
        setEtc();
        setDurian_id();
        setSaveAll(false);
        console.log(task);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  const newTask = () => {
    setTask(initialTaskState);
    setSubmitted(false);
  };

  const normFile = (e) => {
    console.log("Upload event: ", e);
    if (Array.isArray(e)) {
      return e;
    }
    return e && e.fileList;
  };

  const handleScan = (data) => {
    if (data) {
      setDurian_id(data);
    }
  };

  const handleError = (err) => {
    console.log(err);
  };

  const showModal = () => {
    setVisible(true);
  };

  const handleOk = () => {
    setVisible(false);
  };

  const handleCancel = () => {
    setVisible(false);
  };

  return (
    <div className="container-form">
      <div
        className="title"
        style={{
          fontFamily: "'Kanit', sans-serif",
          textAlign: "center",
          paddingTop: "20px",
          fontSize: "40px",
          color: "black",
        }}
      >
        <p>ลงข้อมูลการทำงาน</p>
      </div>
      <Form
        labelCol={{
          span: 6,
        }}
        wrapperCol={{
          span: 15,
        }}
        layout="horizontal"
        size={"middle"}
        className="taskform"
        name="control-ref"
        style={{ fontFamily: "'Kanit', sans-serif", fontWeight: "bolder" }}
      >
        <Form.Item label="ประเภทงาน">
          <Select
            showSearch
            style={{ width: "200" }}
            placeholder="กรุณาเลือกประเภทงาน"
            optionFilterProp="children"
            filterOption={(input, option) =>
              option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
            }
            onChange={(value) => setType(value)}
            value={type}
          >
            <Option
              value="ให้น้ำ"
              style={{ fontFamily: "'Kanit', sans-serif" }}
            >
              ให้น้ำ
            </Option>
            <Option
              value="ให้ปุ๋ย"
              style={{ fontFamily: "'Kanit', sans-serif" }}
            >
              ให้ปุ๋ย
            </Option>
            <Option
              value="ตัดเเต่งกิ่ง"
              style={{ fontFamily: "'Kanit', sans-serif" }}
            >
              ตัดเเต่งกิ่ง
            </Option>
            <Option
              value="โรคพืช"
              style={{ fontFamily: "'Kanit', sans-serif" }}
            >
              โรคพืช
            </Option>
            <Option
              value="พ่นยา สารเคมี"
              style={{ fontFamily: "'Kanit', sans-serif" }}
            >
              พ่นยา สารเคมี
            </Option>
            <Option
              value="ผลผลิตเเละการเปลี่ยนแปลง"
              style={{ fontFamily: "'Kanit', sans-serif" }}
            >
              ผลผลิตเเละการเปลี่ยนแปลง
            </Option>
            <Option value="อื่นๆ" style={{ fontFamily: "'Kanit', sans-serif" }}>
              อื่นๆ
            </Option>
          </Select>
        </Form.Item>
        <Form.Item label="ระยะเวลาให้น้ำ">
          <InputNumber onChange={(value) => setWater(value)} />
        </Form.Item>
        <Form.Item label="ปุ๋ย/สารเคมี">
          <Input onChange={(e) => setFertilizer(e.target.value)} />
        </Form.Item>
        <Form.Item label="โรคพืช">
          <Switch
            defaultChecked={false}
            onChange={(checked) => setDisease(checked)}
          />
        </Form.Item>
        <Form.Item label="อื่นๆ">
          <Input onChange={(e) => setEtc(e.target.value)} />
        </Form.Item>
        <Form.Item
          name="upload"
          label="เพิ่มรูป"
          valuePropName="fileList"
          getValueFromEvent={normFile}
          extra="อัพโหลดรูปการทำงาน"
        >
          <Upload name="logo" listType="picture">
            <Button icon={<UploadOutlined />}>กดเพื่อเพิ่มรูปภาพ</Button>
          </Upload>
        </Form.Item>
        <Form.Item name="upload" label="ไอดีต้นทุเรียน">
          <Button onClick={showModal} size="middle" icon={<QrcodeOutlined />}>
            กดเพื่อแสกน QRcode
          </Button>
          <Modal
            visible={visible}
            title="ลงตารางการทำงาน"
            centered
            width="500px"
            onOk={handleOk}
            onCancel={handleCancel}
            style={{ fontFamily: "'Kanit', sans-serif", fontWeight: "bolder" }}
            footer={[
              <Button type="danger" onClick={handleCancel}>
                ปิด
              </Button>,
              <Button
                key="submit"
                type="primary"
                loading={loading}
                onClick={handleOk}
              >
                บันทึก
              </Button>,
            ]}
          >
            <div>
              <QrReader
                delay={300}
                onError={handleError}
                onScan={handleScan}
                style={{ width: "100%" }}
              />
              <p>{durian_id}</p>
            </div>
          </Modal>
          <Form.Item>
            <Checkbox onChange={(e) => setSaveAll(e.target.checked)}>
              เลือกต้นทุเรียนทั้งหมด
            </Checkbox>
          </Form.Item>
        </Form.Item>
      </Form>
      <div className="btn-submit">
        <Button
          key="submit"
          type="primary"
          onClick={saveNewTask}
          style={{ fontFamily: "'Kanit', sans-serif" }}
        >
          บันทึก
        </Button>
      </div>
    </div>
  );
};

export default AddTask;

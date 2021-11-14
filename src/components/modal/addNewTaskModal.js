import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import "antd/dist/antd.css";
import {
  Input,
  Form,
  Button,
  Modal,
  Select,
  Upload,
  InputNumber,
  Switch,
  Checkbox,
} from "antd";
import { saveTask } from "../../actions/tasks";
import QrReader from "react-qr-reader";
import { QrcodeOutlined, UploadOutlined } from "@ant-design/icons";

const { Option } = Select;

const AddNewTaskModal = () => {
  const initialAddTaskState = {
    id: null,
    type: "",
    water: null,
    fertilizer: "",
    disease: false,
    etc: "",
    durian_id: "",
    saveAll: false,
  };

  const [addTask, setAddTask] = useState(initialAddTaskState);
  const [submitted, setSubmitted] = useState(false);
  const [type, setType] = useState("");
  const [water, setWater] = useState();
  const [fertilizer, setFertilizer] = useState("");
  const [disease, setDisease] = useState(false);
  const [etc, setEtc] = useState("");
  const [durian_id, setDurian_id] = useState("");
  const [saveAll, setSaveAll] = useState(false);
  const [visibleForm, setVisibleForm] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [visibleScanner, setVisibleScanner] = useState(false);
  const [loadingScanner, setLoadingScanner] = useState(false);

  const dispatch = useDispatch();

  const fetchAddTask = () => {
    dispatch(
      saveTask(type, water, fertilizer, disease, etc, durian_id, saveAll)
    )
      .then((data) => {
        setAddTask({
          id: data.id,
          type: data.type,
          water: data.water,
          fertilizer: data.fertilizer,
          disease: data.disease,
          etc: data.etc,
          durian_id: data.durian_id,
          saveAll: data.saveAll,
        });
        setIsLoading(true);
        setSubmitted(true);
        setVisibleForm(false);
        setType();
        setWater();
        setFertilizer();
        setDisease();
        setEtc();
        setDurian_id();
        setSaveAll(false);
        setIsLoading(false);
        window.location.reload();
      })
      .catch((e) => {
        console.log(e);
      });
  };

  const normFile = (e) => {
    console.log(`Upload Event : ${e}`);
    if (Array.isArray(e)) {
      return e;
    }
    return e && e.fileList;
  };

  const showAddForm = () => {
    setVisibleForm(true);
  };

  const handleCancelForm = () => {
    setVisibleForm(false);
  };

  const handleOkForm = () => {
    setVisibleForm(false);
  };

  const handleScanner = (data) => {
    if (data) {
      setDurian_id(data);
    }
    setVisibleScanner(false);
  };

  const handleScanError = (err) => {
    console.log(err);
  };

  const handleCheckDisease = (checked) => {
    if (checked === true) {
      setDisease("พบโรค");
      console.log(`พบโรค`);
    }
  };

  return (
    <div style={{ fontFamily: "'Kanit', sans-serif" }}>
      <p align="right" className="buttonplus">
        <Button
          type="primary"
          style={{ background: "#52c41a", borderColor: "#0a1931" }}
          onClick={showAddForm}
          size="large"
        >
          ลงบันทึกตารางงาน
        </Button>
      </p>
      <Modal
        visible={visibleForm}
        title="ลงบันทึกตารางงาน"
        centered
        width="500px"
        onOk={handleOkForm}
        onCancel={handleCancelForm}
        style={{ fontFamily: "'Kanit', sans-serif", fontWeight: "bolder" }}
        footer={[
          <Button type="danger" onClick={handleCancelForm}>
            ปิด
          </Button>,
          <Button
            key="submit"
            type="primary"
            loading={isLoading}
            onClick={fetchAddTask}
          >
            บันทึก
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
              <Option
                value="อื่นๆ"
                style={{ fontFamily: "'Kanit', sans-serif" }}
              >
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
            <Switch defaultChecked={false} onChange={handleCheckDisease} />
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
          <Form.Item label="ไอดีต้นทุเรียน" name="upload">
            <Button
              onClick={() => setVisibleScanner(true)}
              size="middle"
              icon={<QrcodeOutlined />}
            >
              กดเพื่อสแกน QRcode
            </Button>
            <Modal
              visible={visibleScanner}
              title="สแกนคิวอาร์โค้ดเพื่อระบุต้นทุเรียน"
              centered
              width="500px"
              onOk={(data) => setDurian_id(data)}
              onCancel={() => setVisibleScanner(false)}
              style={{
                fontFamily: "'Kanit', sans-serif",
                fontWeight: "bolder",
              }}
              footer={[
                <Button type="danger" onClick={() => setVisibleScanner(false)}>
                  ปิด
                </Button>,
                <Button
                  key="submit"
                  type="primary"
                  loading={loadingScanner}
                  onClick={handleScanner}
                >
                  บันทึก
                </Button>,
              ]}
            >
              <QrReader
                delay={300}
                onError={(err) => console.log(err)}
                onScan={(data) => setDurian_id(data)}
                style={{ width: "100%" }}
              />
              <p>{durian_id}</p>
            </Modal>
            <Form.Item>
              <Checkbox onChange={(e) => setSaveAll(e.target.checked)}>
                เลือกต้นทุเรียนทั้งหมด
              </Checkbox>
            </Form.Item>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default AddNewTaskModal;

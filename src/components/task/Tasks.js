import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import "antd/dist/antd.css";
import { Table, Space, Row, Col, Select, Popconfirm } from "antd";
import { deleteTask } from "../../actions/tasks";
import TaskDataService from "../../services/task.service";
import AddNewTaskModal from "../modal/addNewTaskModal";
import "./Task.css";

const Task = () => {
  const { Option } = Select;

  const [task, setTask] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();

  const columns = [
    {
      title: "ประเภทของงาน",
      dataIndex: "type_of_task",
      width: "10%",
      key: "type_of_task",
    },
    {
      title: "ปริมาณน้ำ (นาที)",
      dataIndex: "water",
      width: "10%",
      key: "water",
    },
    {
      title: "ปุ๋ย/สารเคมี",
      dataIndex: "fertilizer",
      width: "10%",
      key: "fertilizer",
    },
    {
      title: "โรคพืช",
      dataIndex: "disease",
      width: "7%",
      key: "disease",
    },
    {
      title: "คำอธิบายเพิ่มเติม",
      dataIndex: "etc",
      key: "etc",
    },
    {
      title: "วันเเละเวลา",
      dataIndex: "datetime",
      width: "15%",
      key: "datetime",
    },
    {
      title: "รูปภาพ",
      dataIndex: "image",
      key: "image",
    },
    {
      title: "",
      key: "action",
      width: "5%",
      render: (text, record) => (
        <Space size="middle">
          <Popconfirm
            title="ยืนยันการลบหรือไม่ ?"
            onConfirm={() => fetchDeleteTask(record.id)}
          >
            <a>ลบ</a>
          </Popconfirm>
        </Space>
      ),
    },
  ];

  useEffect(() => {
    TaskDataService.showAll()
      .then((res) => {
        setIsLoading(true);
        setTask(res.data);
        setIsLoading(false);
      })
      .catch((e) => {
        console.log(e);
      });
  }, []);

  const onChange = (value) => {
    console.log(`เเสดงตารางของงาน  ${value}`);
    if (value === "แสดงทั้งหมด") {
      TaskDataService.showAll()
        .then((res) => {
          setIsLoading(true);
          setTask(res.data);
          setIsLoading(false);
          console.log(task);
        })
        .catch((e) => {
          console.log(e);
        });
    } else {
      fetchShowSelectedType(value);
      console.log(task);
    }
  };

  const fetchShowSelectedType = (type) => {
    TaskDataService.showSelectedType(type)
      .then((res) => {
        setIsLoading(true);
        setTask(res.data);
        setIsLoading(false);
      })
      .catch((e) => {
        console.log(e);
        window.location.reload();
      });
  };
  const onFocus = () => {
    console.log("Focus");
  };

  const onSearch = (val) => {
    console.log(`เเสดงตารางของงาน${val}`);
  };

  const fetchDeleteTask = (id) => {
    dispatch(deleteTask(id));
    setTask(task.filter((item) => item.id !== id));
    window.location.reload();
  };

  return (
    <div className="container">
      <Row
        style={{
          fontFamily: "'Kanit', sans-serif",
          textAlign: "center",
          paddingTop: "20px",
          fontSize: "40px",
        }}
      >
        <Col span={24}>
          <p>ตารางการทำงาน</p>
        </Col>
      </Row>
      <Row className="row-container" style={{ alignItems: "center" }}>
        <Row align="left">
          <div className="search-selection">
            <Select
              showSearch
              style={{ fontFamily: "'Kanit', sans-serif", width: 200 }}
              placeholder="เลือกประเภทของงาน"
              optionFilterProp="children"
              onChange={onChange}
              onFocus={onFocus}
              onSearch={onSearch}
              filterOption={(input, option) =>
                option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
              }
            >
              <Option
                value="แสดงทั้งหมด"
                style={{ fontFamily: "'Kanit', sans-serif" }}
              >
                กิจกรรมทั้งหมด
              </Option>
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
          </div>
        </Row>
        <Row>
          <div className="btn-add-task">
            <AddNewTaskModal />
          </div>
        </Row>
      </Row>
      <br />
      <Row>
        <Col span={24} className="table-1">
          <Table
            columns={columns}
            pagination={{ position: "bottomCenter", pageSize: ["5"] }}
            dataSource={task}
            style={{ fontFamily: "'Kanit', sans-serif" }}
            loading={isLoading}
          />
        </Col>
      </Row>
    </div>
  );
};

export default Task;

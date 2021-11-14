import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import "antd/dist/antd.css";
import { Row, Col, Table, Space, Select, Popconfirm } from "antd";
import AddNewAppointmentModal from "../modal/addNewAppointmentModal";
import appointmentService from "../../services/appointment.service";
import { deleteAppointment } from "../../actions/appointments";
import Weather from "../weather/Weather";
import "./Appointment.css";

const { Option } = Select;

const Appointments = () => {
  const [appointment, setAppointment] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();

  const fetchDeleteAppointment = (id) => {
    dispatch(deleteAppointment(id))
      .then((data) => {
        setAppointment(appointment.filter((item) => item.id !== id));
      })
      .catch((e) => console.log(e));
  };

  const fetchShowByPriority = (priority) => {
    console.log(priority);
    if (priority === "เลือกทั้งหมด") {
      setIsLoading(true);
      appointmentService
        .show()
        .then((res) => {
          setAppointment(res.data);
        })
        .catch((e) => {
          console.log(e);
        });
      setIsLoading(false);
      console.log(appointment);
    } else {
      appointmentService
        .findByPriority(priority)
        .then((res) => {
          setIsLoading(true);
          setAppointment(res.data);
          setIsLoading(false);
          console.log(appointment);
        })
        .catch((e) => {
          console.log(e);
          window.location.reload();
        });
    }
  };

  const columns = [
    {
      title: "หัวข้อ",
      dataIndex: "title",
    },
    {
      title: "รายละเอียด",
      dataIndex: "description",
    },
    {
      title: "วันเเละเวลา",
      dataIndex: "datetime",
    },
    {
      title: "ความสำคัญ",
      dataIndex: "priority",
    },
    {
      title: "",
      key: "action",
      render: (text, record) => (
        <Space size="middle">
          <Popconfirm
            title="ยืนยันการลบหรือไม่ ?"
            onConfirm={() => fetchDeleteAppointment(record.id)}
          >
            <a>ลบ</a>
          </Popconfirm>
        </Space>
      ),
    },
  ];
  useEffect(() => {
    setIsLoading(true);
    appointmentService
      .show()
      .then((res) => {
        setAppointment(res.data);
      })
      .catch((e) => {
        console.log(e);
      });
    setIsLoading(false);
  }, []);

  return (
    <div>
      <Row>
        <Col span={24}>
          <Weather />
        </Col>
      </Row>
      <br />
      <Row>
        <Col
          span={24}
          style={{
            fontFamily: "'Kanit', sans-serif",
            textAlign: "center",
            paddingTop: "20px",
            fontSize: "40px",
          }}
        >
          <p>ตารางนัดหมาย</p>
        </Col>
      </Row>
      <Row className="row-container">
        <div className="search-selection">
          <Col span={20} align="left">
            <Select
              align="left"
              showSearch
              style={{ fontFamily: "'Kanit', sans-serif", width: 200 }}
              placeholder="เลือกลำดับความสำคัญ"
              optionFilterProp="children"
              onChange={fetchShowByPriority}
              filterOption={(input, option) =>
                option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
              }
            >
              <Option
                value="เลือกทั้งหมด"
                style={{ fontFamily: "'Kanit', sans-serif" }}
              >
                เลือกทั้งหมด
              </Option>
              <Option
                value="ความสำคัญน้อย"
                style={{ fontFamily: "'Kanit', sans-serif" }}
              >
                ความสำคัญน้อย
              </Option>
              <Option
                value="ความสำคัญปานกลาง"
                style={{ fontFamily: "'Kanit', sans-serif" }}
              >
                ความสำคัญปานกลาง
              </Option>
              <Option
                value="ความสำคัญมาก"
                style={{ fontFamily: "'Kanit', sans-serif" }}
              >
                ความสำคัญมาก
              </Option>
            </Select>
          </Col>
        </div>
        <div className="green-btn">
          <Col span={4}>
            <AddNewAppointmentModal />
          </Col>
        </div>
      </Row>
      <Row>
        <Col
          span={24}
          style={{ fontFamily: "'Kanit', sans-serif", textAlign: "center" }}
        >
          <Table
            columns={columns}
            pagination={{ position: "bottomCenter", pageSize: ["5"] }}
            dataSource={appointment}
            loading={isLoading}
          />
        </Col>
      </Row>
    </div>
  );
};

export default Appointments;

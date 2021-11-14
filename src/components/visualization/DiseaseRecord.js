import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import visualizationService from "../../services/visualization.service";
import "antd/dist/antd.css";
import { Table, Row, Col, Space, Popconfirm } from "antd";
import "./DiseaseRecord.css";
import { deleteRecordDisease } from "../../actions/visualizations";

const DiseaseRecord = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [record, setRecord] = useState([]);

  const dispatch = useDispatch();

  useEffect(() => {
    setIsLoading(true);
    visualizationService
      .showRecordDisease()
      .then((res) => {
        setRecord(res.data);
      })
      .catch((e) => {
        console.log(e);
      });
    setIsLoading(false);
  }, []);

  const fetchUpdateRecord = (durian_id) => {
    dispatch(deleteRecordDisease(durian_id));
    handleDelete(durian_id);
  };

  const handleDelete = (durian_id) => {
    console.log(`durian id : ${durian_id} is now good health`);
    const dataSource = [...record];
    setRecord(dataSource.filter((item) => item.durian_id !== durian_id));
  };

  const columns = [
    {
      title: "ตำแหน่ง",
      dataIndex: "location",
      width: "10%",
    },
    {
      title: "โรคพืช",
      dataIndex: "disease",
      width: "10%",
    },
    {
      title: "รายละเอียดเเละโรคที่พบ",
      dataIndex: "description",
    },
    {
      title: "วันเเละเวลาที่พบโรค",
      dataIndex: "latest_update",
      width: "30%",
    },
    {
      title: "",
      key: "action",
      render: (text, record) => (
        <Space size="middle">
          <Popconfirm
            title="ยืนยันหรือไม่ ?"
            onConfirm={() => fetchUpdateRecord(record.durian_id)}
          >
            <a>หายเเล้ว ?</a>
          </Popconfirm>
        </Space>
      ),
      width: "10%",
    },
  ];

  return (
    <div>
      <Row>
        <Col span={24}>
          <p
            style={{
              fontFamily: "'Kanit', sans-serif",
              textAlign: "center",
              paddingTop: "20px",
              fontSize: "40px",
              color: "black",
            }}
          >
            ตารางติดตามโรคในต้นทุเรียน
          </p>
        </Col>
      </Row>
      <Row>
        <Col className="bottom-margin" span={24}>
          <Table
            pagination={{ position: ["bottomCenter"], pageSize: ["5"] }}
            columns={columns}
            dataSource={record}
            loading={isLoading}
            style={{ fontFamily: "'Kanit', sans-serif" }}
          />
        </Col>
      </Row>
    </div>
  );
};

export default DiseaseRecord;

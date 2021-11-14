import React, { useState, useEffect } from "react";
import { MockDataDurian } from "../../MockData";
import { Space, Popconfirm, Table } from "antd";
import "antd/dist/antd.css";
import AddNewDurians from "../modal/addNewDurian";
import "./Durians.css";

const Durians = () => {
  const columns = [
    {
      title: "ตำแหน่งของต้นทุเรียน",
      dataIndex: "location",
      width: "15%",
      key: "location",
    },
    {
      title: "พันธุ์ทุเรียน",
      dataIndex: "type",
      width: "15%",
      key: "type",
    },
    {
      title: "ภาพประกอบ",
      dataIndex: "image",
      key: "image",
    },
    {
      title: "สถานะ",
      dataIndex: "status",
      key: "status",
    },
    {
      title: "",
      key: "action",
      render: (text, record) => (
        <Space size="middle">
          <Popconfirm
            title="ยืนยันการลบหรือไม่ ?"
            onConfirm={() => handleDelete(record.durianId)}
          >
            <a>ลบ</a>
          </Popconfirm>
        </Space>
      ),
    },
  ];

  const [durians, setDurians] = useState([]);

  const fetchDurians = () => {
    const { data } = MockDataDurian;
    const durians = data;
    setDurians(durians);
  };

  const handleDelete = (id) => {
    console.log(id);
  };
  useEffect(() => {
    fetchDurians();
  }, []);

  return (
    <div class="container" style={{ alignItems: "center" }}>
      <div className="title" style={{ textAlign: "center", color: "black" }}>
        <p>สวนสับปะรดอีลอนมัสก์</p>
      </div>
      <AddNewDurians />
      <Table
        columns={columns}
        pagination={{ position: "bottomCenter", pageSize: ["5"] }}
        dataSource={durians}
        style={{ fontFamily: "'Kanit', sans-serif" }}
      />
    </div>
  );
};

export default Durians;

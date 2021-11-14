import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import "antd/dist/antd.css";
import {
  Table,
  Row,
  Space,
  Popconfirm,
  PageHeader,
  Tag,
  Statistic,
  Button,
} from "antd";
import AddAccountBook from "../modal/addNewAccountModal";
import visualizationService from "../../services/visualization.service";
import { deleteAccountBook } from "../../actions/visualizations";
import "./AccountBook.css";
import { RedoOutlined } from "@ant-design/icons";

const AccountBook = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [accountList, setAccountList] = useState([]);
  const [sumIncome, setSumIncome] = useState();
  const [sumOutcome, setSumOutcome] = useState();

  const dispatch = useDispatch();

  useEffect(() => {
    setIsLoading(true);
    visualizationService
      .showAccountBook()
      .then((res) => {
        setAccountList(res.data);
      })
      .catch((e) => {
        console.log(e);
      });
    visualizationService
      .showSummaryIncomeOutcome()
      .then((res) => {
        setSumIncome(res.data.income.sum);
        setSumOutcome(res.data.outcome.sum);
      })
      .catch((e) => console.log(e));
    setIsLoading(false);
  }, []);

  const fetchDeleteAccountList = (id) => {
    console.log(id);
    dispatch(deleteAccountBook(id));
    handleDelete(id);
    visualizationService
      .showSummaryIncomeOutcome()
      .then((res) => {
        setSumIncome(res.data.income.sum);
        setSumOutcome(res.data.outcome.sum);
      })
      .catch((e) => console.log(e));
  };

  const handleDelete = (id) => {
    const dataSource = [...accountList];
    setAccountList(dataSource.filter((item) => item.id !== id));
  };
  const columns = [
    {
      title: "รายรับ-รายจ่าย",
      dataIndex: "type",
    },
    {
      title: "หัวข้อ",
      dataIndex: "title",
    },
    {
      title: "รายละเอียด",
      dataIndex: "description",
    },
    {
      title: "จำนวนเงิน(บาท)",
      dataIndex: "total",
    },
    {
      title: "วันเเละเวลา",
      dataIndex: "datetime",
    },
    {
      title: "",
      key: "action",
      render: (text, record) => (
        <Space size="middle">
          <Popconfirm
            title="ยืนยันการลบหรือไม่ ?"
            onConfirm={() => fetchDeleteAccountList(record.id)}
          >
            <a>ลบ</a>
          </Popconfirm>
        </Space>
      ),
    },
  ];

  return (
    <div className="container" style={{ verticalAlign: "middle" }}>
      <PageHeader
        title="สมุดบันทึกรายรับ-รายจ่าย"
        tags={<Tag color="green">Active</Tag>}
        subTitle="การบักทึกรายรับ-รายจ่ายช่วยให้เห็นภาพรวมการลงทุนเเละการบริหารจัดการภายในฟาร์ม"
        extra={[
          <AddAccountBook />,
          <Button onClick={() => window.location.reload()}>
            <RedoOutlined />
            รีเฟรช
          </Button>,
        ]}
        style={{ background: "#ffbf00", fontFamily: "'Kanit', sans-serif" }}
      >
        <Row>
          <div className="income-text">
            <Statistic
              title="รายรับ"
              suffix="บาท"
              value={sumIncome}
              style={{ fontFamily: "'Kanit', sans-serif" }}
            />
          </div>

          <Statistic
            className="outcome-text"
            title="รายจ่าย"
            suffix="บาท"
            value={sumOutcome}
            style={{ fontFamily: "'Kanit', sans-serif" }}
          />
        </Row>
      </PageHeader>
      <div className="table-account">
        <Table
          pagination={{ position: ["bottomCenter"], pageSize: ["5"] }}
          columns={columns}
          dataSource={accountList}
          loading={isLoading}
          style={{ fontFamily: "'Kanit', sans-serif" }}
        />
      </div>
    </div>
  );
};

export default AccountBook;

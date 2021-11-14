import React, { useEffect, useState } from "react";
import "antd/dist/antd.css";
import taskService from "../../services/task.service";
import visualizationService from "../../services/visualization.service";
import { Row, Col, Button } from "antd";
import { PieChart, Pie, Cell, ResponsiveContainer } from "recharts";
import "./SummaryCurrentSeason.css";
import FeedingWaterChart from "./FeedingWaterChart";

const SummaryCurrentSeason = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [sumIncome, setSumIncome] = useState();
  const [sumOutcome, setSumOutcome] = useState();
  const [sumDiseaseFound, setSumDiseaseFound] = useState();
  const [sumDiseaseNow, setSumDiseaseNow] = useState();
  const [averageWater, setAverageWater] = useState();
  const [sumTaskRecord, SetSumTaskRecord] = useState();
  useEffect(() => {
    setIsLoading(true);
    visualizationService
      .showSummaryIncomeOutcome()
      .then((res) => {
        setSumIncome(res.data.income.sum);
        setSumOutcome(res.data.outcome.sum);
      })
      .catch((e) => {
        console.log(e);
      });
    taskService
      .showAll()
      .then((res) => {
        var count = 0;
        var sum_time_feeding = 0;
        var count_disease_found = 0;
        for (var i = 0; i < res.data.length; i++) {
          if (res.data[i].type_of_task === "ให้น้ำ") {
            sum_time_feeding = sum_time_feeding + res.data[i].water;
            count = count + 1;
          } else if (res.data[i].type_of_task === "โรคพืช") {
            count_disease_found = count_disease_found + 1;
          }
        }
        var avg = parseInt(sum_time_feeding / count);
        SetSumTaskRecord(res.data.length);
        setAverageWater(avg);
        setSumDiseaseFound(count_disease_found);
      })
      .catch((e) => {
        console.log(e);
      });
    visualizationService.showRecordDisease().then((res) => {
      var count_disease_now = 0;
      for (var j = 0; j < res.data.length; j++) {
        if (res.data[j].disease === "พบโรค") {
          count_disease_now = count_disease_now + 1;
        }
      }
      setSumDiseaseNow(count_disease_now);
    });
    setIsLoading(false);
  }, []);

  const data = [
    { name: "Group A", value: 400 },
    { name: "Group B", value: 300 },
    { name: "Group C", value: 300 },
    { name: "Group D", value: 200 },
  ];

  const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];

  const RADIAN = Math.PI / 180;
  const renderCustomizedLabel = ({
    cx,
    cy,
    midAngle,
    innerRadius,
    outerRadius,
    percent,
    index,
  }) => {
    const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
    const x = cx + radius * Math.cos(-midAngle * RADIAN);
    const y = cy + radius * Math.sin(-midAngle * RADIAN);
    return (
      <text
        x={x}
        y={y}
        fill="white"
        textAnchor={x > cx ? "start" : "end"}
        dominantBaseline="central"
      >
        {`${(percent * 100).toFixed(0)}%`}
      </text>
    );
  };

  const handleEndSeason = (e) => {
    console.log(e.target.innerText);
  };
  return (
    <div className="container">
      <Row className="row-1">
        <Col span={6}>
          <div className="sum-task-record-box">
            <Row>
              <h2>ลงข้อมูลงาน(ครั้ง)</h2>
            </Row>
            <Row>
              <p6>{sumTaskRecord}</p6>
            </Row>
          </div>
        </Col>
        <Col span={6}>
          <div className="avg-water-feeding-time-box">
            <Row>
              <h2>เวลาให้น้ำเฉลี่ย(นาที)</h2>
            </Row>
            <Row>
              <p6>{averageWater}</p6>
            </Row>
          </div>
        </Col>
        <Col span={6}>
          <div className="disease-found-box">
            <Row>
              <h2>พบโรคในต้นทุเรียน(ครั้ง)</h2>
            </Row>
            <Row>
              <p6>{sumDiseaseFound}</p6>
            </Row>
          </div>
        </Col>
        <Col span={6}>
          <div className="disease-now-box">
            <Row>
              <h2>จำนวนที่ยังพบโรค(ต้น)</h2>
            </Row>
            <Row>
              <p6>{sumDiseaseNow}</p6>
            </Row>
          </div>
        </Col>
      </Row>
      <hr />
      <Row className="row-2">
        <Col span={12}>
          <PieChart width={300} height={300}>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              labelLine={false}
              label={renderCustomizedLabel}
              outerRadius={120}
              fill="#8884d8"
              dataKey="value"
            >
              {data.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={COLORS[index % COLORS.length]}
                />
              ))}
            </Pie>
          </PieChart>
        </Col>
        <Col span={6}>
          <div className="income-box">
            <Row>
              <h2>รายรับ(บาท)</h2>
            </Row>
            <Row>
              <p2>{1500000}</p2>
            </Row>
          </div>
        </Col>
        <Col span={6}>
          <div className="outcome-box">
            <Row>
              <h2>รายจ่าย(บาท)</h2>
            </Row>
            <Row>
              <p2>{15100000}</p2>
            </Row>
          </div>
        </Col>
      </Row>
      <hr />
      <Row>
        <Col span={24}>
          <FeedingWaterChart />
        </Col>
      </Row>
      <hr />
      <div className="btn-end-season">
        <Button
          key="submit"
          type="primary"
          onClick={handleEndSeason}
          size="large"
        >
          <b>จบฤดูกาล</b>
        </Button>
      </div>
    </div>
  );
};

export default SummaryCurrentSeason;

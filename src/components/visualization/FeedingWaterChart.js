import React, { useState, useEffect } from "react";
import {
  Area,
  AreaChart,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import visualizationService from "../../services/visualization.service";
import "./FeedingWaterChart.css";

const FeedingWaterChart = () => {
  const [waterData, setWaterData] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    visualizationService
      .showWaterChart()
      .then((res) => {
        setLoading(true);
        setWaterData(res.data);
        setLoading(false);
      })
      .catch((e) => {
        console.log(e);
      });
  }, []);

  return (
    <div style={{ textAlign: "center", fontFamily: "'Kanit', sans-serif" }}>
      <h1>กราฟเเสดงข้อมูลการให้น้ำในช่วงเวลา 5 วันย้อนหลัง</h1>
      <br />
      <div style={{ width: "100%", height: 300, marginBottom: "28rem" }}>
        <ResponsiveContainer>
          <AreaChart
            width={1300}
            height={400}
            data={waterData}
            margin={{
              top: 10,
              right: 30,
              left: 0,
              bottom: 0,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="datetime" />
            <YAxis />
            <Tooltip />
            <Area
              type="monotone"
              dataKey="water"
              stroke="black"
              fill="#0E49B5"
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default FeedingWaterChart;

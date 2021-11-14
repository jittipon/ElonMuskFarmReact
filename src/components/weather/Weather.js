import React from "react";
import ReactWeather, { useOpenWeather } from "react-open-weather";
import "./Weather.css";
import "dayjs/locale/th";
import dayjs from "dayjs";
dayjs.locale("th");

const Weather = () => {
  const { data, isLoading, errorMessage } = useOpenWeather({
    key: "c45f648717d4791e6155e27c061b9b41",
    lat: "12.406218",
    lon: "102.386275",
    lang: "th",
    unit: "metric", 
  });

  const customStyles = {
    fontFamily: "'Kanit', sans-serif",
    gradientStart: "#0181C2",
    gradientMid: "#04A7F9",
    gradientEnd: "#4BC4F7",
    locationFontColor: "#FFF",
    todayTempFontColor: "#FFF",
    todayDateFontColor: "#B5DEF4",
    todayRangeFontColor: "#B5DEF4",
    todayDescFontColor: "#B5DEF4",
    todayInfoFontColor: "#B5DEF4",
    todayIconColor: "#FFF",
    forecastBackgroundColor: "#FFF",
    forecastSeparatorColor: "#DDD",
    forecastDateColor: "#777",
    forecastDescColor: "#777",
    forecastRangeColor: "#777",
    forecastIconColor: "#4BC4F7",
  };

  return (
    <div>
      <div style={{ fontFamily: "'Kanit', sans-serif" }}>
        <ReactWeather
          isLoading={isLoading}
          errorMessage={errorMessage}
          data={data}
          lang="th"
          locationLabel="สวนสับปะรดอีลอนมัสก์"
          unitsLabels={{ temperature: "C", windSpeed: "Km/h" }}
          showForecast
          theme={customStyles}
        />
      </div>
    </div>
  );
}

export default Weather;

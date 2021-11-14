import React from "react";
import "./AboutUs.css";
import tel from "../images/telephone.png";
import address from "../images/home-address.png";
import { Form } from "antd";

const my_addr =
  "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3896.651945792989!2d102.3840859148162!3d12.406218091228551!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMTLCsDI0JzIyLjQiTiAxMDLCsDIzJzEwLjYiRQ!5e0!3m2!1sth!2sth!4v1627152854995!5m2!1sth!2sth";

const AboutUs = () => {
  return (
    <div>
      <div className="title">
        <span style={{ fontWeight: "normal", color: "black" }}>
          ข้อมูลการติดต่อ
        </span>
      </div>
      <div className="container">
        <Form style={{ paddingTop: "5vh" }}>
          <Form.Item>
            <div
              className="tel-num"
              style={{ textAlign: "left", paddingLeft: "10%" }}
            >
              <img src={tel} style={{ width: "30px", height: "30px" }} />
              <span style={{ marginLeft: "10px" }}>
                0800000000, 0900000000
              </span>
            </div>
          </Form.Item>
          <Form.Item>
            <div
              className="address"
              style={{ textAlign: "left", paddingLeft: "10%" }}
            >
              <img src={address} style={{ width: "30px", height: "30px" }} />
              <span style={{ marginLeft: "10px" }}>
                สวนสับปะรดมังกรฟ้า ตำบลเเสนตุ้ง อำเภอเขาสมิง จังหวัดตราด
              </span>
            </div>
          </Form.Item>
          <Form.Item>
            <div
              className="map"
              style={{
                textAlign: "center",
                fontSize: "30px",
                fontWeight: "normal",
                alignItems: "center",
              }}
            >
              <p>แผนที่</p>
              <div class="responsive-map-container">
                <iframe
                  src={my_addr}
                  style={{
                    width: "100%",
                    height: "100%",
                    margin: "auto",
                    marginRight: "0px",
                  }}
                  allowfullscreen=""
                  loading="lazy"
                ></iframe>
              </div>
            </div>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};

export default AboutUs;

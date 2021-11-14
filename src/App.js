import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { Nav, Navbar, Container, NavDropdown } from "react-bootstrap";
import Task from "./components/task/Tasks";
import AboutUs from "./components/AboutUs";
import FeedingWaterChart from "./components/visualization/FeedingWaterChart";
import AccountBook from "./components/visualization/AccountBook";
import Durians from "./components/durian/Durians";
import Appointments from "./components/appointment/Appointment";
import DiseaseRecord from "./components/visualization/DiseaseRecord";
import Landing from "./components/Landing";
import SummaryCurrentSeason from "./components/visualization/SummaryCurrentSeason";

const App = () => {
  return (
    <Router>
      <Navbar className="color-nav" expand="lg" variant="dark">
        <Container className="navbar-item">
          <Navbar.Brand href="/" style={{ fontSize: "25px", color: "#ffbf00" }}>
            สวนสับปะรดอีลอนมัสก์
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link href="/" style={{ color: "white" }}>
                หน้าเเรก
              </Nav.Link>
              <Nav.Link href="/durian" style={{ color: "white" }}>
                ชมสวนสับปะรด
              </Nav.Link>
              <Nav.Link href="/task" style={{ color: "white" }}>
                ตารางการทำงาน
              </Nav.Link>
              <Nav.Link href="/appointment" style={{ color: "white" }}>
                รายการนัดหมาย
              </Nav.Link>
              <NavDropdown
                title="ภาพรวมข้อมูล"
                id="basiv-nav-dropdown"
                style={{ color: "white" }}
              >
                <NavDropdown.Item href="/visual/chart/water">
                  กราฟการให้น้ำ
                </NavDropdown.Item>
                <NavDropdown.Item href="/visual/table/disease">
                  ตารางติดตามโรคพืช
                </NavDropdown.Item>
                <NavDropdown.Item href="/visual/table/account">
                  รายรับ-รายจ่าย
                </NavDropdown.Item>
                <NavDropdown.Item href="/visual/summary/season/current">
                  สรุปข้อมูลของฤดูกาลปัจจุบัน
                </NavDropdown.Item>
                <NavDropdown.Item href="/visual/label/map">
                  วาดเส้นแผนที่
                </NavDropdown.Item>
              </NavDropdown>
              <Nav.Link href="/about-us" style={{ color: "white" }}>
                ติดต่อเรา
              </Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      <div className="container mt-3">
        <Switch>
          <Route exact path="/" component={Landing} />
          <Route path="/durian" component={Durians} />
          <Route path="/task" component={Task} />
          <Route path="/about-us" component={AboutUs} />
          <Route path="/visual/chart/water" component={FeedingWaterChart} />
          <Route path="/visual/table/account" component={AccountBook} />
          <Route path="/visual/table/disease" component={DiseaseRecord} />
          <Route path="/appointment" component={Appointments} />
          <Route
            path="/visual/summary/season/current"
            component={SummaryCurrentSeason}
          />
        </Switch>
      </div>
      <div className="copy-right">
        ELONMUSK PINEAPPLE FARM MANAGEMENT. COPYRIGHT 2021 ALL RIGHTS RESERVED
      </div>
    </Router>
  );
};

export default App;

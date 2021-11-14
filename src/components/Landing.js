import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { Button } from 'react-bootstrap';
import IconDurian from '../images/logo.png';
import Durians from './durian/Durians';
import './Landing.css';
const Landing = () => {
    return (
        <Router>
            <div>
                <div className="container-welcome">
                <img src={IconDurian} className="icon-durian" />
                <div className="welcome-text1">
                    <span>สวนอีลอนมัสก์ ยินดีต้อนรับ</span>
                </div> 
                <div className="welcome-text2">
                    <span>ที่นี่มีต้นสับปะรดมากกว่า 1000 ต้นให้ท่านเลือกชม</span>
                </div>
                </div><br/>
                <div className="btn-durian">
                <Button variant="outline-success" href="/durian" className="btn-durian">
                    คลิกเพื่อชมสวนสับปะรด
                </Button>
                </div>
            <Switch>
                    <Route exact path="/durian" component={Durians} />
            </Switch>
            </div>
        </Router>
    );
}

export default Landing;
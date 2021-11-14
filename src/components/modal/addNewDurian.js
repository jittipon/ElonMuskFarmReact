import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import 'antd/dist/antd.css';
import { Input, Form, Button, Modal, Select, Upload } from 'antd';
import { addDurian } from '../../actions/durians';
import QrReader from 'react-qr-reader';
import {
    QrcodeOutlined, 
    UploadOutlined
} from '@ant-design/icons';

const { Option } = Select;

const AddNewDurians = () => {
    const initialAddDurianState = {
        durian_id: "",
        location: "",
        type: "",
    }

    const [add, setAdd] = useState(initialAddDurianState);
    const [durian_id, setDurian_id] = useState("");
    const [optionalId, setOptionalId] = useState("");
    const [location, setLocation] = useState("");
    const [type, setType] = useState("");
    const [visibleForm, setVisibleForm] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [submitted, setSubmitted] = useState(false);
    const [visibleScanner, setVisibleScanner] = useState(false);
    const [loadingScanner, setLoadingScanner] = useState(false);
    const [etcType, setEtcType] = useState("");

    const dispatch = useDispatch();

    const fetchAddDurian = () => {
        dispatch(addDurian(durian_id, location, type))
        .then(data => {
            setAdd({
                durian_id: data.durian_id,
                location: data.location,
                type: data.type
            })
            setIsLoading(true);
            setSubmitted(true);
            setVisibleForm(false);
            setDurian_id("");
            setLocation("");
            setType("");
            setIsLoading(false);
        })
        .catch(e => {
            console.log(e);
        })
    }

    const normFile = (e) => {
        console.log(`Upload Event : ${e}`);
        if (Array.isArray(e)) {
            return e;
        }
        return e && e.fileList;
    }

    const showAddForm = () => {
        setVisibleForm(true);
    }

    const handleCancelForm = () => {
        setVisibleForm(false);
    }

    const handleOkForm =() => {
        setVisibleForm(false);
    }
    
    const handleSelectType = (e) => {
        if (type === "อื่นๆ") {
            setType(e.target.value);
        }
    }

    const handleFillOptionalId = (e) => {
        setDurian_id(e.target.value);
    }
    const handleScanner = (data) => {
        if (data) {
            setDurian_id(data);
        }
        setVisibleScanner(false);
    }

    return (
        <div style={{ fontFamily: "'Kanit', sans-serif" }}>
            <p align="right" className="buttonplus">
                <Button 
                    type="primary"
                    style={{ background: "#52c41a", borderColor: "#0a1931" }}
                    onClick={showAddForm}
                    size="large"
                >
                    ลงทะเบียนต้นทุเรียน
                </Button>
            </p>
            <Modal 
                visible={visibleForm}
                title="ลงทะเบียนต้นทุเรียน"
                centered
                width="500px"
                onOk={handleOkForm}
                onCancel={handleCancelForm}
                style={{ fontFamily: "'Kanit', sans-serif", fontWeight: "bolder" }}
                footer={[
                    <Button type="danger" onClick={handleCancelForm}>
                        ปิด
                    </Button>,
                    <Button key="submit" type="primary" loading={isLoading} onClick={fetchAddDurian}>
                        บันทึก
                    </Button>
                ]}
            >
                <Form 
                    labelCol={{ span: 6 }}
                    wrapperCol={{ span: 15 }}
                    layout="horizontal"
                    size={"middle"}
                    className="addformmodal"
                    name="control-ref"
                    style={{ fontFamily: "'Kanit', sans-serif", fontWeight: "bolder" }}
                >
                    <Form.Item label="ไอดีต้นทุเรียน" name="upload">
                        <Button onClick={() => setVisibleScanner(true)}
                                size="middle"
                                icon={<QrcodeOutlined/>}
                        >
                            กดเพื่อสแกน QRcode
                        </Button>
                        <Modal
                            visible={visibleScanner}
                            title="สแกนคิวอาร์โค้ดเพื่อระบุต้นทุเรียน"
                            centered
                            width="500px"
                            onOk={(data) => setDurian_id(data)}
                            onCancel={() => setVisibleScanner(false)}
                            style={{ fontFamily: "'Kanit', sans-serif", fontWeight: "bolder" }}
                            footer={[
                                <Button type="danger" onClick={() => setVisibleScanner(false)}>
                                    ปิด
                                </Button>,
                                <Button
                                    key="submit"
                                    type="primary"
                                    loading={loadingScanner}
                                    onClick={handleScanner}
                                >
                                    บันทึก
                                </Button>,
                            ]}
                        >
                            <QrReader 
                                delay={300}
                                onError={(err) => console.log(err)}
                                onScan={(data) => setDurian_id(data)}
                                style={{ width: "100%" }}
                            />
                            <p>{durian_id}</p>
                        </Modal>
                    </Form.Item>
                    <Form.Item label="หรือกรอกที่นี่">
                        <Input onChange={handleFillOptionalId} />
                    </Form.Item>
                    <Form.Item label="ตำแหน่ง">
                            <Input onChange={(e) => setLocation(e.target.value)} />
                    </Form.Item>
                    <Form.Item label="พันธุ์ทุเรียน">
                        <Select 
                            showSearch
                            style={{ width: "200" }}
                            placeholder="กรุณาเลือกพันธุ์ของต้นทุเรียน"
                            optionFilterProp="children"
                            filterOption={(input, option) =>
                                option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                            }
                            onChange={(value) => setType(value)}
                            value={type}
                        >
                            <Option value="หมอนทอง" style={{ fontFamily: "'Kanit', sans-serif"}}>หมอนทอง</Option>
                            <Option value="พวงมะนี" style={{ fontFamily: "'Kanit', sans-serif"}}>พวงมะนี</Option>
                            <Option value="มูซานคิง" style={{ fontFamily: "'Kanit', sans-serif"}}>มูซานคิง</Option>
                            <Option value="หลงลับแล" style={{ fontFamily: "'Kanit', sans-serif"}}>หลงลับแล</Option>
                            <Option value="หลินลับแล" style={{ fontFamily: "'Kanit', sans-serif"}}>หลินลับแล</Option>
                            <Option value="อื่นๆ" style={{ fontFamily: "'Kanit', sans-serif"}}>อื่นๆ</Option>
                        </Select>
                    </Form.Item>
                    <Form.Item label="ระบุพันธุ์อื่น">
                        <Input onChange={handleSelectType} />
                    </Form.Item>
                    <Form.Item name="upload" label="เพิ่มรูป" valuePropName="fileList" getValueFromEvent={normFile} extra="อัพโหลดรูปต้นทุเรียน">
                        <Upload name="logo" listType="picture" >
                            <Button icon={<UploadOutlined />}>กดเพื่อเพิ่มรูปภาพ</Button>
                        </Upload> 
                    </Form.Item>
                </Form>
            </Modal>
        </div>
    )
}

export default AddNewDurians;
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addDurian } from '../../actions/durians';
import 'antd/dist/antd.css';
import { Select, Input, Form, Upload, Button, Modal } from 'antd';
import {
    QrcodeOutlined, 
    UploadOutlined
} from '@ant-design/icons';
import QrReader from 'react-qr-reader';
import './AddDurian.css';

const { Option } = Select;

const AddDurian = () => {
    const initialDurianState = {
        durian_id: "",
        row: "",
        etc: "",
        image: null
    }
    const [durian, setDurian] = useState(initialDurianState);
    const [submitted, setSubmitted] = useState(false);
    const [durian_id, setDurian_id] = useState("");
    const [row, setRow] = useState("");;
    const [etc, setEtc] = useState("");
    const [visible, setVisible] = useState(false);
    const [loading, setLoading] = useState(false);

    const dispatch = useDispatch();

    const addNewDurian = () => {
        dispatch(addDurian(durian_id, row, etc))
        .then(data => {
            setDurian({
                durian_id: data.duiran_id,
                row: data.row,
                etc: data.etc,
            })
            setSubmitted(true);
            setDurian_id();
            setRow();
            setEtc();
            console.log(durian);
        })
        .catch(e => {
            console.log(e);
        });
    };
    
    const newDurian = () => {
        setDurian(initialDurianState);
        setSubmitted(false);
    };

    const normFile = (e) => {
        console.log("Upload event: ", e);
        if (Array.isArray(e)) {
            return e;
        }
        return e && e.fileList;
    }

    const handleScan = (data) => {
        if (data) {
            setDurian_id(data)
        }
    }

    const handleError = (err) => {
        console.log(err);
    }

    const showModal = () => {
        setVisible(true);
    }

    const handleOk = () => {
        setVisible(false);
    }

    const handleCancel = () => {
        setVisible(false);
    }

    return (
        <div className="container-form">
            <div className="title" style={{ fontFamily: "'Kanit', sans-serif", textAlign: "center", paddingTop: "20px" , fontSize: "40px", color: "black"}}>
                <p>ลงทะเบียนต้นทุเรียน</p>
            </div><br/>
            <Form
                labelCol={{
                    span: 6,
                }}
                wrapperCol={{
                    span: 15,
                }}
                layout="horizontal"
                size={"middle"}
                className="durianform"
                name="control-ref"
                style={{ fontFamily: "'Kanit', sans-serif", fontWeight: "bolder" }}
            >
                <Form.Item
                    name="upload"
                    label="ไอดีต้นทุเรียน"
                >
                    <Button
                        onClick={showModal}
                        size="middle"
                        icon={<QrcodeOutlined />}
                    >
                        กดเพื่อแสกน QRcode
                    </Button>
                    <Modal
                        visible={visible}
                        title="ลงทะเบียนต้นทุเรียน"
                        centered
                        width="500px"
                        onOk={handleOk}
                        onCancel={handleCancel}
                        style={{ fontFamily: "'Kanit', sans-serif", fontWeight: "bolder"}}
                        footer={[
                        <Button type="danger" onClick={handleCancel}>
                            ปิด
                        </Button>,
                        <Button
                            key="submit"
                            type="primary"
                            loading={loading}
                            onClick={handleOk}
                        >
                            บันทึก
                        </Button>,
                        ]}
                    >
                        <div>
                        <QrReader
                            delay={300}
                            onError={handleError}
                            onScan={handleScan}
                            style={{ width: "100%" }}
                        />
                        <p>{durian_id}</p>
                        </div>
                    </Modal>
                </Form.Item> 
                <Form.Item label="ไอดีต้นทุเรียน">
                    <Input />
                </Form.Item>
                <Form.Item label="เเถว">
                    <Input onChange={(e) => setRow(e.target.value)} placeholder="โปรดระบุเเถวของต้นทุเรียนเพื่อสะดวกในการค้นหา"/>
                </Form.Item>
                <Form.Item label="อื่นๆ">
                    <Input onChange={(e) => setEtc(e.target.value)} placeholder="ข้อมูลเพิ่มเติม เช่น พันธุ์ทุเรียน เป็นต้น"/>
                </Form.Item>
                <Form.Item name="upload" label="เพิ่มรูป" valuePropName="fileList" getValueFromEvent={normFile} extra="อัพโหลดรูปต้นทุเรียน">
                    <Upload name="logo" listType="picture" >
                        <Button icon={<UploadOutlined />}>กดเพื่อเพิ่มรูปภาพ</Button>
                    </Upload> 
                </Form.Item>
            </Form>
            <br/><br/><br/><br/>
            <div className="btn-submit" >
                <Button 
                    key="submit"
                    type="primary"
                    onClick={addNewDurian}
                >
                    บันทึก
                </Button>
            </div>
        </div>
    )
};

export default AddDurian;
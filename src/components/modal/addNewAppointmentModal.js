import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import 'antd/dist/antd.css';
import { Input, Form, Button, Modal, Switch, Radio, DatePicker } from 'antd';
import moment from 'moment';
import { addNewAppointment } from '../../actions/appointments';

const AddNewAppointmentModal = () => {
    const initialAddAppointmentState = {
        id: null,
        title: "",
        description: "",
        datetime: null,
        priority: "",
        alert: false,
    }

    const [addAppointment, setAddAppointment] = useState(initialAddAppointmentState);
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [datetime, setDatetime] = useState();
    const [priority, setPriority] = useState("");
    const [alert, setAlert] = useState(false);
    const [visibleForm, setVisibleForm] = useState(false);
    const [loading, setLoading] = useState(false);
    const [submitted, setSubmitted] = useState(false);
    const dispatch = useDispatch();


    const disabledDate = (current) => {
        return current && current < moment().endOf('day');
    }

    const fetchAddAppointment = () => {
        dispatch(addNewAppointment(title, description, datetime, priority, alert))
        .then(data => {
            setAddAppointment({
                id: data.id,
                title: data.title,
                description: data.description,
                datetime: data.datetime,
                priority: data.priority,
                alert: data.alert
            })
            setSubmitted(true);
            setTitle("");
            setDescription("");
            setDatetime("");
            setPriority("");
            setAlert(false);
            setVisibleForm(false);
            window.location.reload();
        })
        .catch(e => {
            console.log(e);
        });
        console.log(title);
        console.log(description);
        console.log(datetime);
        console.log(priority);
        console.log(alert);
    };

    const newAppointment = () => {
        setAddAppointment(initialAddAppointmentState);
        setSubmitted(false);
    };

    const showAddForm = () => {
        setVisibleForm(true);
    }

    const handleSubmitForm = () => {
        setVisibleForm(false);
    }
    
    const handleCancelForm = () => {
        setVisibleForm(false);
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
                    + ??????????????????????????????????????????????????????
                </Button>
            </p>          
            <Modal 
                visible={visibleForm}
                title="?????????????????????????????????????????????????????????????????????????????????????????????????????????"
                centered
                width="500px"
                onOk={handleSubmitForm}
                onCancel={handleCancelForm}
                style={{ fontFamily: "'Kanit', sans-serif", fontWeight: "bolder" }}
                footer={[
                    <Button type="danger" onClick={handleCancelForm}>
                        ?????????
                    </Button>,
                    <Button key="submit" type="primary" loading={loading} onClick={fetchAddAppointment}>
                        ??????????????????
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
                    <Form.Item label="????????????">
                        <Input onChange={(e) => setTitle(e.target.value)} />
                    </Form.Item>
                    <Form.Item label="??????????????????????????????">
                        <Input onChange={(e) => setDescription(e.target.value)} />
                    </Form.Item>
                    <Form.Item label="?????????-????????????">
                        <DatePicker 
                            format="YYYY-MM-DD HH:mm:ss"
                            disabledDate={disabledDate}
                            showTime={{ defaultValue: moment('00:00:00', 'HH:mm:ss') }}
                            onChange={(value, dateString) => setDatetime(dateString)}
                        />
                    </Form.Item>
                    <Form.Item label="??????????????????????????????????????????" name="size">
                        <Radio.Group>
                            <Radio.Button value="???????????????????????????????????????" style={{ color: "#95de64" }} onClick={(e) => setPriority(e.target.value)}>
                                ????????????
                            </Radio.Button>
                            <Radio.Button value="????????????????????????????????????????????????" style={{ color: "#1890ff" }} onClick={(e) => setPriority(e.target.value)}>
                                ?????????????????????
                            </Radio.Button>
                            <Radio.Button value="????????????????????????????????????" style={{ color: "#f5222d" }} onClick={(e) => setPriority(e.target.value)}>
                                ?????????
                            </Radio.Button>
                        </Radio.Group>
                    </Form.Item>
                    <Form.Item label="??????????????????????????????">
                        <Switch defaultChecked={false} onChange={(checked) => setAlert(checked)} />
                    </Form.Item>
                </Form>
            </Modal>
        </div>
    )
}

export default AddNewAppointmentModal;
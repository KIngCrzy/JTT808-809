import { Button, Input, Card, Select, Form, message } from 'antd';
import React, { useState } from 'react'
import {  connect } from 'umi';
import { JSONEditor } from 'react-json-editor-viewer'
import { PageHeaderWrapper } from '@ant-design/pro-layout';
import styles from './SimulatePage.less'

const Simulate = props => {

    const options = [
        { key: '9101', value: '接受车辆定位信息数量通知消息' },
        { key: '1200', value: '主链路动态信息交换消息' },
        { key: '9200', value: '从链路动态信息交换消息' },
        { key: '1300', value: '主链路平台间信息交互消息' },
        { key: '9300', value: '从链路平台间信息交互消息' },
        { key: '1400', value: '主链路报警信息交互消息' },
        { key: '9400', value: '从链路报警信息交互消息' },
        { key: '1500', value: '主链路车辆监管消息' },
        { key: '9500', value: '从链路车辆监管消息' },
        { key: '1600', value: '主链路静态信息交换消息' },
        { key: '9600', value: '从链路静态信息交换消息' },
    ]

    const subList = {
        '9101':
            [
                { key: '9101', value: '无' },
            ],
        '1200':
            [
                { key: '1201', value: '上传车辆注册信息' },
                { key: '1202', value: '事实上传车辆定位信息' },
                { key: '1203', value: '车辆定位信息自动补报' },
                { key: '1205', value: '启动车辆定位信息交换应答' },
                { key: '1206', value: '结束车辆定位信息交换应答' },
                { key: '1207', value: '申请交换指定车辆定位信息请求' },
                { key: '1208', value: '取消交换指定车辆定位信息请求' },
                { key: '1209', value: '补发车辆定位信息请求' },
                { key: '120a', value: '上报车辆驾驶员身份识别信息应答' },
                { key: '120b', value: '上报车辆电子运单应答' },
            ],
        '9200':
            [
                { key: '9202', value: '交换车辆定位信息' },
                { key: '9203', value: '车辆定位信息交换补发' },
                { key: '9204', value: '交换车辆静态信息' },
                { key: '9205', value: '启动车辆定位信息交换请求' },
                { key: '9206', value: '结束车辆定位信息交换请求' },
                { key: '9207', value: '申请交换指定车辆定位信息应答' },
                { key: '9208', value: '取消交换指定车辆定位信息应答' },
                { key: '9209', value: '补发车辆定位信息应答' },
                { key: '920a', value: '上报车辆驾驶员身份识别信息请求' },
                { key: '920b', value: '上报车辆电子运单请求' },
            ],
        '1300':
            [
                { key: '1301', value: '平台查岗应答' },
                { key: '1302', value: '下发平台间报文应答' },
            ],
        '9300':
            [
                { key: '9301', value: '平台查岗请求' },
                { key: '9302', value: '下发平台间报文请求' },
            ],
        '1400':
            [
                { key: '1401', value: '报警督办应答' },
                { key: '1402', value: '上报报警信息' },
            ],
        '9400':
            [
                { key: '9401', value: '报警督办请求' },
                { key: '9402', value: '报警预警' },
                { key: '9403', value: '实时交换报警消息' },
            ],
        '1500':
            [
                { key: '1501', value: '上传车辆注册信息' },
                { key: '1502', value: '事实上传车辆定位信息' },
                { key: '1503', value: '车辆定位信息自动补报' },
                { key: '1504', value: '启动车辆定位信息交换应答' },
                { key: '1505', value: '启动车辆定位信息交换应答' },
            ],
        '9500':
            [
                { key: '9501', value: '上传车辆注册信息' },
                { key: '9502', value: '事实上传车辆定位信息' },
                { key: '9503', value: '车辆定位信息自动补报' },
                { key: '9504', value: '车辆定位信息自动补报' },
                { key: '9505', value: '启动车辆定位信息交换应答' },

            ],
        '1600':
            [
                { key: '1601', value: '上传车辆注册信息' },
            ],
        '9600':
            [
                { key: '9601', value: '上传车辆注册信息' },
            ],

    }

    const [loginForm] = Form.useForm()
    const [businessForm] = Form.useForm()
    const [messagesForm] = Form.useForm()

    const [encrypt, setEncrypt] = useState(null)
    const [subOptions, setSubOptions] = useState(subList['9101'])
    const [messages, setmessages] = useState({})



    const handleChange = (value) => {

        setEncrypt(value === 1 ? (<div style={{ marginTop: 20 }}>
            {/* <Form.Item name="ia1" label="IA1" >
                <Input style={{ width: 200 }} />
            </Form.Item>
            <Form.Item name="ic1" label="IC1" >
                <Input style={{ width: 200 }} />
            </Form.Item>
            <Form.Item name="m1" label="M1" >
                <Input style={{ width: 200 }} />
            </Form.Item> */}
            <Form.Item name="encrypt_key" label="KEY" rules={[
                {
                    pattern: new RegExp(/^[1-9]\d*$/, "g"),
                    message: '请输入数字',
                },
            ]}>
                <Input style={{ width: 200 }} />
            </Form.Item>
        </div>) : null)
    }

    const handleLogin = () => {
        loginForm.validateFields().then(values => {
            const value = values
            value.center_id = Number(value.center_id)
            value.user_id = Number(value.user_id)
            value.encrypt_key = Number(value.encrypt_key)

            const { dispatch } = props;
            dispatch({
                type: 'protocol/login',
                payload: { value, protocol: 809 },
            }).then((res) => {
                message.success(res.result)
                messagesForm.setFieldsValue({
                    decode: res.Buffer,
                })
                setmessages(res.params)

            });
        }).catch(errorInfo => {
            console.log(errorInfo);
        })
    }

    const handleBusiness = () => {
        const value = businessForm.getFieldsValue()

        const { dispatch } = props;
        dispatch({
            type: 'protocol/business',
            payload: { value, protocol: 809 },
        }).then((res) => {
            if (res.status === 200) {
                message.success(res.message)
                messagesForm.setFieldsValue({
                    decode: res.Buffer,
                })
                setmessages(res.params)
            }
        });
    }

    const handleGenerate = () => {

        const { dispatch } = props;
        dispatch({
            type: 'protocol/generate',
            payload: { value: messages, protocol: 809 },
        }).then((res) => {
            message.success(res.message)
            messagesForm.setFieldsValue({
                decode: res.Buffer
            })
        });
    }

    const handleReset = () => {
        setEncrypt(null)
        loginForm.resetFields()
        messagesForm.resetFields()

    }

    const handleSend = () => {
        messagesForm.validateFields().then(value => {
            const { dispatch } = props;
            dispatch({
                type: 'protocol/send',
                payload: { value, protocol: 809 },
            }).then((res) => {
                if (res.result === '链路已断开，请重新连接') {
                    message.error(res.result)
                } else {
                    message.success(res.result)
                }
            })
        })

    }

    const handleOptionsChange = (value) => {
        setSubOptions(subList[value])
        businessForm.setFieldsValue({
            'sub_business': subList[value][0].key
        })

    }

    const onJsonChange = (key, value, parent, data) => {
        console.log(key, value, parent, data);
        setmessages(data)
    }

    const handleEndup = () => {
        const { dispatch } = props;
        dispatch({
            type: 'protocol/close',
            payload: {},
        }).then((res) => {
            message.success(res.result)
        });
    }

    // useEffect(() => {
    //     handleBusiness()
    // }, [])

    return (
        <PageHeaderWrapper>
            <Card title="登陆报文" >
                <Form form={loginForm} layout='inline' initialValues={{ encrypt_flag: 0 }}>
                    <Form.Item name="center_id" label="接入码" validateFirst rules={[
                        {
                            required: true,
                        },
                        {

                            pattern: new RegExp(/^[1-9]\d*$/, "g"),
                            message: '请输入数字',
                        },
                    ]}>
                        <Input style={{ width: 200 }} />
                    </Form.Item>
                    <Form.Item name="user_id" label="用户名" validateFirst rules={[
                        {
                            required: true,
                        },
                        {

                            pattern: new RegExp(/^[1-9]\d*$/, "g"),
                            message: '请输入数字',
                        },
                    ]}>
                        <Input style={{ width: 200 }} />
                    </Form.Item>
                    <Form.Item name="password" label="密码" rules={[
                        {
                            required: true,
                        },
                    ]}>
                        <Input style={{ width: 200 }} />
                    </Form.Item>
                    <Form.Item name="down_link_ip" label="IP地址" rules={[
                        {
                            required: true,
                        },
                    ]}>
                        <Input style={{ width: 200 }} />
                    </Form.Item>
                    <Form.Item name="down_link_port" label="端口号" rules={[
                        {
                            required: true,
                        },
                    ]}>
                        <Input style={{ width: 200 }} />
                    </Form.Item>
                    <Form.Item name="encrypt_flag" label="是否加密" style={{ marginTop: 20 }}>
                        <Select style={{ width: 200 }} onChange={handleChange}>
                            <Select.Option value={1}>是</Select.Option>
                            <Select.Option value={0}>否</Select.Option>
                        </Select>
                    </Form.Item>
                    {encrypt}
                    <Form.Item  >
                        <Button type="primary" style={{ marginTop: 20 }} onClick={handleLogin}>发起登陆</Button>
                    </Form.Item>
                    <Form.Item >
                        <Button type="primary" style={{ marginTop: 20 }} onClick={handleReset}>重置</Button>
                    </Form.Item>
                </Form>
            </Card>
            <Card title="业务报文">
                <Form form={businessForm} layout='inline' initialValues={{ business: options[0].key, sub_business: subList['9101'][0].key }}>
                    <Form.Item name="business" label="业务类型" >
                        <Select style={{ width: 300 }} onChange={handleOptionsChange}>
                            {
                                options.map(i => {
                                    return <Select.Option key={i.key} value={i.key}>{`${i.key}:${i.value}`}</Select.Option>
                                })
                            }
                        </Select>
                    </Form.Item>
                    <Form.Item name="sub_business" label="子业务类型" >
                        <Select style={{ width: 300 }}>
                            {
                                subOptions.map(i => {
                                    return <Select.Option key={i.key} value={i.key}>{`${i.key}:${i.value}`}</Select.Option>
                                })
                            }
                        </Select>
                    </Form.Item>
                    <Form.Item  >
                        <Button type="primary" onClick={handleBusiness}>生成</Button>
                    </Form.Item>

                </Form>
            </Card>
            <Card title="生成对象">
                <div>
                    <JSONEditor
                        data={messages}
                        onChange={onJsonChange}
                        collapsible
                        view="dual"
                    />
                    <div className={styles.msg_btn}>
                        <Button type="primary" onClick={handleGenerate}>生成报文</Button>
                    </div>
                </div>

            </Card>
            <Card title="生成报文">
                <Form form={messagesForm} layout='inline' style={{ display: 'flex' }}>
                    <Form.Item name="decode" label="报文" rules={[
                        {
                            required: true,
                            message: '请先生成报文',
                        },
                    ]} >
                        <Input.TextArea style={{ width: 600, height: 150 }} />
                    </Form.Item>
                    <Form.Item >
                        <Button type="primary" onClick={handleSend}>发送报文</Button>
                    </Form.Item>
                    <Form.Item >
                        <Button type="primary" onClick={handleEndup}>断开连接</Button>
                    </Form.Item>
                </Form>
            </Card>
        </PageHeaderWrapper >
    );
}


export default connect(({ protocol }) => ({
    protocol,
}))(Simulate);

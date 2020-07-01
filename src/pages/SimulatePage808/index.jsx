import { Button, Input, Card, Select, Form, message } from 'antd';
import React, { useState } from 'react'
import { connect } from 'umi';
import { JSONEditor } from 'react-json-editor-viewer'
import { PageHeaderWrapper } from '@ant-design/pro-layout';
import styles from './SimulatePage.less'

const Simulate = props => {

    const options = [
        { key: '0108', value: '终端升级结果通知' },
        { key: '0200', value: '位置信息汇报' },
        { key: '0301', value: '事件报告' },
        { key: '0700', value: '行驶记录数据上传' },
        { key: '0701', value: '电子运单上报' },
        { key: '0702', value: '驾驶员身份信息采集上报' },
        { key: '0704', value: '定位数据批量上传' },
        { key: '0705', value: 'CAN 总线数据上传' },
        { key: '0800', value: '多媒体事件信息上传' },
        { key: '0900', value: '数据上行透传' },
        { key: '0901', value: '数据压缩上报' },
        { key: '8701', value: '行驶记录参数下传命令' },
    ]

    const result = {
        0: '成功',
        1: '失败',
        2: '消息有误',
        3: '不支持',
        4: '报警处理确认'
    }


    const [loginForm] = Form.useForm()
    const [businessForm] = Form.useForm()
    const [messagesForm] = Form.useForm()

    const [messages, setmessages] = useState({})


    const handleLogin = () => {
        loginForm.validateFields().then(value => {

            const { dispatch } = props;
            dispatch({
                type: 'protocol/login',
                payload: { value, protocol: 808 },
            }).then((res) => {
                if (typeof (res.result) === 'string') {
                    message.error(res.result)
                } else {
                    message.success(result[res.result])
                }
            });
        }).catch(errorInfo => {
            console.log(errorInfo);
        })
    }

    const handleBusiness = () => {
        const value = businessForm.getFieldsValue()
        const { business } = value

        const { dispatch } = props;
        dispatch({
            type: 'protocol/business',
            payload: { business, protocol: 808 },
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
            payload: { value: messages, protocol: 808 },
        }).then((res) => {
            message.success(res.message)
            messagesForm.setFieldsValue({
                decode: res.Buffer
            })
        });
    }

    const handleSend = () => {
        messagesForm.validateFields().then(value => {
            const { dispatch } = props;
            dispatch({
                type: 'protocol/send',
                payload: { value, protocol: 808 },
            }).then((res) => {
                if (typeof (res.result) === 'string') {
                    message.error(res.result)
                } else {
                    message.success(result[res.result])
                }
            })
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
                <Form form={loginForm} layout='inline'>
                    <Form.Item name="deviceSN" label="设备SN" validateFirst rules={[
                        {
                            required: true,
                        },
                    ]}>
                        <Input style={{ width: 300 }} allowClear />
                    </Form.Item>

                    <Form.Item  >
                        <Button type="primary" onClick={handleLogin}>发起登陆</Button>
                    </Form.Item>
                </Form>
            </Card>
            <Card title="业务报文">
                <Form form={businessForm} layout='inline' initialValues={{ business: options[0].key }}>
                    <Form.Item name="business" label="业务类型" >
                        <Select style={{ width: 300 }}>
                            {
                                options.map(i => {
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

/**
 * Created by hao.cheng on 2017/4/13.
 */
import React, { Component } from 'react';
import { Card, Form, Input, Tooltip, Icon,InputNumber, Cascader, Select, Row, Col, Checkbox, Button } from 'antd';
const FormItem = Form.Item;
const Option = Select.Option;
import BreadcrumbCustom from '../BreadcrumbCustom';

class BasicForms extends Component {
    constructor(props) {
        super(props);
        this.state = {
            type:"input",
            format:"image"
        }

        this.handleSubmit = (e) => {
            e.preventDefault();
            this.props.form.validateFieldsAndScroll((err, values) => {
                if (!err) {
                    console.log('Received values of form: ', values);
                }
            });
        };

        this.handleSelectChange = (key,value) => {
            let json = {};
            json[key] = value;
            this.setState(json);
        }

    }

    render() {
        const { getFieldDecorator } = this.props.form;
        const formItemLayout = {
            labelCol: {
                xs: { span: 24 },
                sm: { span: 8 },
            },
            wrapperCol: {
                xs: { span: 24 },
                sm: { span: 14 },
            },
        };
        const tailFormItemLayout = {
            wrapperCol: {
                xs: {
                    span: 24,
                    offset: 0,
                },
                sm: {
                    span: 14,
                    offset: 8,
                },
            },
        };
        let typeDom = null;
        if(this.state.type == 'input'){
            typeDom = (
                <FormItem
                    {...formItemLayout}
                    label="字符长度"
                >
                    {
                        getFieldDecorator('lang', {
                            rules: [{ required: true, message: '请输入字符长度!' }],
                        })(
                            <InputNumber
                                size="large"
                                style={{ width: 200 }}
                            />
                        )
                    }
                </FormItem>
            )
        }else if(this.state.type == 'upload'){
            typeDom = (
                <FormItem
                    {...formItemLayout}
                    label="上传格式"
                >
                    {
                        getFieldDecorator('format', {
                            initialValue: 'image',
                            rules: [{ required: true, message: '请选择上传格式!' }]
                        })(
                            <Select
                                size="large"
                                style={{ width: 200 }}
                                onChange={this.handleSelectChange.bind(this,'format')}
                            >
                                <Option value="image">图片</Option>
                                <Option value="zip">文件</Option>
                            </Select>
                        )
                    }
                </FormItem>
            )
        }
        return (
        <div className="gutter-example">
            <BreadcrumbCustom first="表单" second="表单字段" />
            <Row gutter={16}>
                <Col className="gutter-row" span={24}>
                    <div className="gutter-box">
                        <Card title="新增字段" bordered={false}>
                            <Form onSubmit={this.handleSubmit}>
                                <FormItem
                                    {...formItemLayout}
                                    label="名称"
                                >
                                    {
                                        getFieldDecorator('name', {
                                            rules: [{ required: true, message: '请输入名称!' }],
                                        })(
                                            <Input
                                                size="large"
                                                style={{ width: 200 }}
                                            />
                                        )
                                    }
                                </FormItem>
                                <FormItem
                                    {...formItemLayout}
                                    label="Key"
                                >
                                    {
                                        getFieldDecorator('key', {
                                            rules: [{ required: true, message: '请输入数据库字段名!' }],
                                        })(
                                            <Input
                                                size="large"
                                                style={{ width: 200 }}
                                            />
                                        )
                                    }
                                </FormItem>
                                <FormItem
                                    {...formItemLayout}
                                    label="类型"
                                >
                                    {
                                        getFieldDecorator('type', {
                                            initialValue: 'input',
                                            rules: [{ required: true, message: '请选择字段类型!' }]
                                        })(
                                            <Select
                                                size="large"
                                                style={{ width: 200 }}
                                                onChange={this.handleSelectChange.bind(this,'type')}
                                            >
                                                <Option value="input">输入框</Option>
                                                <Option value="radio">单选</Option>
                                                <Option value="checkbox">多选</Option>
                                                <Option value="upload">上传</Option>
                                            </Select>
                                        )
                                    }
                                </FormItem>
                                {
                                    typeDom
                                }
                                <FormItem {...tailFormItemLayout}>
                                    <Button type="primary" htmlType="submit" size="large">新增</Button>
                                </FormItem>
                            </Form>
                        </Card>
                    </div>
                </Col>
            </Row>
        </div>
        )
    }
}

const BasicForm = Form.create()(BasicForms);

export default BasicForm;
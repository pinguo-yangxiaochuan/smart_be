/**
 * Created by hao.cheng on 2017/4/28.
 */
import React from 'react';
import { Row, Col ,Card , Button, Input,Form,InputNumber} from 'antd';
import BreadcrumbCustom from '../BreadcrumbCustom';
import Canvas from './Canvas';
import Draggable from 'react-draggable';
const FormItem = Form.Item;

class Configs extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            data:[],
            dragIndex:0
        };

        this.handleTypeEvent = (type,event)=>{
            this.state.data.push({
                type:type,
                x:0,
                y:0,
                w:200,
                h:50
            });
            this.setState(this.state.data);
        }

        this.onDrag = (index,event,ui) => {

            clearTimeout(this.timer);
            this.timer = setTimeout(()=>{
                this.state.data[index].x = ui.x;
                this.state.data[index].y = ui.y;

                this.setState({
                    dragIndex:index
                });
            },50);


        }

        this.handeChangeEvent = (name,value)=>{
            this.state.data[this.state.dragIndex][name] = value;
            this.setState(this.state.data);
        }
    }

    componentDidMount() {
        let panelBoxDom = document.getElementById('panelBox');
        this.width = panelBoxDom.clientWidth;
        this.height = panelBoxDom.clientHeight;
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
        const position = this.state.data[this.state.dragIndex] || {
            x:0,
            y:0,
            w:0,
            h:0
        };

        console.log(position);
        let inputDom = null;
        let textaearDom = null;
        let element = this.state.data.map((value,index)=>{
            if(value.type == 'input'){
                return (<Draggable position={{x:value.x,y:value.y}} onDrag={this.onDrag.bind(this,index)} key={index} bounds={{top: 0, left: 0, right: this.width - value.w, bottom: this.height-value.h}}>
                            <Input style={{ height:value.h,width: value.w ,position:'absolute',left:0,top:0}} type="text"/>
                        </Draggable>);
            }else if(value.type == 'textaear'){
                return (<Draggable position={{x:value.x,y:value.y}} onDrag={this.onDrag.bind(this,index)} key={index} bounds={{top: 0, left: 0, right: this.width - value.w, bottom: this.height-value.h}}>
                            <Input style={{ height:value.h,width: value.w ,position:'absolute',left:0,top:0}} type="textarea"/>
                        </Draggable>);
            }
        });
        return (
            <div className="gutter-example button-demo">
                <BreadcrumbCustom first="UI" second="配置组件" />
                <Row gutter={16}>
                    <Col className="gutter-row" span={4}>
                        <Card bordered={false}>
                            <Button onClick={this.handleTypeEvent.bind(this,'input')}>input</Button>
                            <Button onClick={this.handleTypeEvent.bind(this,'textaear')}>textaear</Button>
                        </Card>
                    </Col>
                    <Col className="gutter-row" span={16}>
                        <Canvas id="panelBox" element={element}></Canvas>
                    </Col>
                    <Col className="gutter-row" span={4}>
                        <Card bordered={false}>
                            <Form>
                                <FormItem
                                    {...formItemLayout}
                                    label="X坐标"
                                >
                                    <InputNumber
                                        size="large"
                                        value={position.x.toFixed(0)}
                                        onChange={this.handeChangeEvent.bind(this,'x')}
                                    />
                                </FormItem>
                                <FormItem
                                    {...formItemLayout}
                                    label="Y坐标"
                                >
                                    <InputNumber
                                        size="large"
                                        value={position.y.toFixed(0)}
                                        onChange={this.handeChangeEvent.bind(this,'y')}
                                    />
                                </FormItem>
                                <FormItem
                                    {...formItemLayout}
                                    label="高度"
                                >
                                    <InputNumber
                                        size="large"
                                        value={position.h.toFixed(0)}
                                        onChange={this.handeChangeEvent.bind(this,'h')}
                                    />
                                </FormItem>
                                <FormItem
                                    {...formItemLayout}
                                    label="宽度"
                                >
                                    <InputNumber
                                        size="large"
                                        value={position.w.toFixed(0)}
                                        onChange={this.handeChangeEvent.bind(this,'w')}
                                    />
                                </FormItem>
                            </Form>
                        </Card>
                    </Col>
                </Row>
                <style>{`
                    .canvasBox {
                        position: relative;
                        width:100%;
                        height:100%;
                    }

                    .dragMask {
                        position: absolute;
                        display: flex;
                        align-items: center;
                        justify-content: center;
                        left: 0;
                        top: 0;
                        width: 0;
                        height: 0;
                        z-index: 99;
                    }

                    .dragText {
                        position: absolute;
                        min-width: 30px;
                        left: 0;
                        top: 0;
                        color: #fff;
                        font-size: 12px;
                    }
                `}</style>
            </div>
        )
    }
}

const Config = Form.create()(Configs);


export default Config;
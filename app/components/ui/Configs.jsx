/**
 * Created by hao.cheng on 2017/4/28.
 */
import React from 'react';
import { Row, Col ,Card , Button, Input,Form,InputNumber} from 'antd';
import BreadcrumbCustom from '../BreadcrumbCustom';
import Draggable from 'react-draggable';
const FormItem = Form.Item;

class Configs extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            activeDrags: 0,
            data:[],
            dragIndex:0,
        };

        this.fillBg = () => {
            var cxt = this.cxt;
            cxt.fillStyle = '#1E1E1E';
            cxt.fillRect(0, 0, this.width, this.height);
        }

        this.setText = (startX, startY, text) => {
            var cxt = this.cxt;
            cxt.font = '14';
            cxt.fillStyle = 'gray';
            cxt.fillText(text, startX, startY);
        }

        this.drag = () => {
            var dragMaskDom = this.dragMaskDom;
            var dragTextDom = this.dragTextDom;
            var getClientRect = this.getClientRect;
            var dom = this.canvasDom; // 画布dom
            var domW = dom.width;
            var domH = dom.height;
            var dragStartX = 0; // 鼠标拖拽起点X坐标
            var dragStartY = 0; // 鼠标拖拽起点Y坐标
            var setCss = this.setCss;
            var sign = function (num) {
                var tmpNum = Math.sign(num);
                return tmpNum === -1 ? -2 : tmpNum;
            }

            // 拖拽中移动回调
            // 为了解绑
            var mouseMoveCallback = function (e) {
                var endX = e.clientX - getClientRect.left;
                var endY = e.clientY - getClientRect.top;

                endX = Math.min(Math.max(endX,0),domW);
                endY = Math.min(Math.max(endY,0),domH);

                var w = endX - dragStartX;
                var h = endY - dragStartY;
                var css = {};
                var prop = 'transform-origin';

                setCss(dragTextDom, {
                    left: endX +  sign(w) * 10 + 'px',
                    top: endY + sign(h) * 10 + 'px'
                })

                switch (true) {
                    case w < 0 && h < 0 :
                        w = -w;
                        h = -h;
                        css = {
                            [prop]: 'left top',
                            transform: 'rotate(180deg)'
                        };
                        break;

                    case w < 0 :
                        w = -w;
                        css = {
                            [prop]: 'left center',
                            transform: 'rotate(180deg)'
                        };
                        break;

                   case h < 0 :
                        h = -h;
                        css = {
                            [prop]: 'top center',
                            transform: 'rotate(180deg)'
                        };
                        break;

                   default :
                        css = {
                            [prop]: 'left center',
                            transform: 'rotate(0)'
                        };
                        break;
                }

                setCss(dragMaskDom, Object.assign({
                    width: w + 'px',
                    height: h + 'px',
                    border: '1px solid #fff'
                }, css));

                dragTextDom.innerText = w + ' x ' + h;
            }

            var mouseupCallback = function () {
                setCss(dragMaskDom, {
                     width: 0,
                     height: 0,
                     border: 'none'
                    });
                    dragTextDom.innerText = '';
                    document.removeEventListener('mousemove', mouseMoveCallback);
                    document.removeEventListener('mouseup', mouseupCallback);
            }

            dom.addEventListener('mousedown', function (e) {
                dragStartX = e.clientX - getClientRect.left;
                dragStartY = e.clientY - getClientRect.top;

                setCss(dragMaskDom, {
                    left: dragStartX + 'px',
                    top: dragStartY + 'px'
                });

                document.addEventListener('mousemove', mouseMoveCallback);
                document.addEventListener('mouseup', mouseupCallback);
            }.bind(this))
        }

        this.setCss = (dom, options) => {
            var _str = '';
            for (var i in options) {
                _str += i + ':' + options[i] + ';'
            }
            dom.style.cssText += _str;
        }

        this.drawLine = (startX, startY, dir) => {
            var cxt = this.cxt;
            var lineX = 0;
            var lineY = 0;

            if (dir === 'row') {
                lineY = startY - 0.5;
                cxt.moveTo(startX, lineY);
                cxt.lineTo(this.width, lineY);
            } else if (dir === 'col'){
                lineX = startX - 0.5;
                cxt.moveTo(lineX, startY);
                cxt.lineTo(lineX, this.height);
            }

            cxt.lineWidth = 1;
            cxt.strokeStyle = 'grey';
            cxt.stroke();
        }

        this.drawGrid = () => {
            var w = this.width;
            var h = this.height;
            var rowTimes = 0;
            var colTimes = 0;

            for (var i = 20; i <= h; i = i + 10) {
                var rowStartX = 20;
                if (rowTimes % 5 === 0) {
                    rowStartX = 0;
                    this.setText(rowStartX, i - 2, i - 20);
                }

                rowTimes ++ ;
                this.drawLine(rowStartX, i, 'row');
            }

            for (var j = 20; j <= w; j = j + 10) {
                var rowStartY = 20;
                if (colTimes % 5 === 0) {
                    rowStartY = 0;
                    this.setText(j, 9, j - 20);
                }

                colTimes ++ ;
                this.drawLine(j, rowStartY, 'col');
            }
        }

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

        // this.onStart = () => {
        //     this.setState({activeDrags: ++this.state.activeDrags});
        // };

        // this.onStop = () => {
        //     this.setState({activeDrags: --this.state.activeDrags});
        // };

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
    componentDidMount(){
        this.getClientRect = (() => {
            var clientRect = this.canvasBoxDom.getBoundingClientRect();

            var left = clientRect.left;

            var top = clientRect.top;

            return {
                left:left,
                top:top
            }
        })();
        var dom = this.canvasDom;
        this.cxt = dom.getContext('2d');
        var canvasBox = this.canvasBoxDom;
        var w = canvasBox.clientWidth;
        var h = document.body.clientHeight - this.getClientRect.top - 66;
        this.width = w;
        this.height = h;
        dom.setAttribute('width', w);
        dom.setAttribute('height', h);
        this.fillBg();
        this.drawGrid();
        this.drag();
        document.onselectstart = function () {
            return false;
        };
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
        if(!this.state.data[this.state.dragIndex]){
            this.state.data[this.state.dragIndex] = {};
            this.state.data[this.state.dragIndex].x = 0;
            this.state.data[this.state.dragIndex].y = 0;
            this.state.data[this.state.dragIndex].w = 0;
            this.state.data[this.state.dragIndex].h = 0;
        }
        const position = this.state.data[this.state.dragIndex];
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
                        <div ref={ref => this.canvasBoxDom = ref} className="canvasBox">
                            {
                                element
                            }
                            <div ref={ref => this.dragMaskDom = ref} className="dragMask"></div>
                            <div ref={ref => this.dragTextDom = ref} className="dragText"></div>
                            <canvas ref={ref => this.canvasDom = ref}></canvas>
                        </div>
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
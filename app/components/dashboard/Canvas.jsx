import React, { Component } from 'react';

class Canvas extends Component {
    constructor(props) {
        super(props);
        this.state = {
        };

        this.initCanavs = ()=>{
            this.getClientRect = (() => {
                const clientRect = this.canvasBoxDom.getBoundingClientRect();
                return {
                    left:clientRect.left,
                    top:clientRect.top
                }
            })();
            let dom = this.canvasDom;
            this.cxt = dom.getContext('2d');
            let canvasBox = this.canvasBoxDom;
            let w = canvasBox.clientWidth;
            let h = document.body.clientHeight - this.getClientRect.top - 66;
            this.width = w;
            this.height = h;
            dom.setAttribute('width', w);
            dom.setAttribute('height', h);
        }

        this.fillBg = () => {
            let cxt = this.cxt;
            cxt.fillStyle = '#1E1E1E';
            cxt.fillRect(0, 0, this.width, this.height);
        }

        this.setText = (startX, startY, text) => {
            let cxt = this.cxt;
            cxt.font = '14';
            cxt.fillStyle = 'gray';
            cxt.fillText(text, startX, startY);
        }

        this.drawLine = (startX, startY, dir) => {
            let cxt = this.cxt;
            let lineX = 0;
            let lineY = 0;

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
            let w = this.width;
            let h = this.height;
            let rowTimes = 0;
            let colTimes = 0;

            for (let i = 20; i <= h; i = i + 10) {
                let rowStartX = 20;
                if (rowTimes % 5 === 0) {
                    rowStartX = 0;
                    this.setText(rowStartX, i - 2, i - 20);
                }

                rowTimes ++ ;
                this.drawLine(rowStartX, i, 'row');
            }

            for (let j = 20; j <= w; j = j + 10) {
                let rowStartY = 20;
                if (colTimes % 5 === 0) {
                    rowStartY = 0;
                    this.setText(j, 9, j - 20);
                }

                colTimes ++ ;
                this.drawLine(j, rowStartY, 'col');
            }
        }

        this.setCss = (dom, options) => {
            let _str = '';
            for (let i in options) {
                _str += i + ':' + options[i] + ';'
            }
            dom.style.cssText += _str;
        }

        this.drag = () => {
            let dragMaskDom = this.dragMaskDom;
            let dragTextDom = this.dragTextDom;
            let getClientRect = this.getClientRect;
            let dom = this.canvasDom; // 画布dom
            let domW = dom.width;
            let domH = dom.height;
            let dragStartX = 0; // 鼠标拖拽起点X坐标
            let dragStartY = 0; // 鼠标拖拽起点Y坐标
            let setCss = this.setCss;
            let sign = function (num) {
                let tmpNum = Math.sign(num);
                return tmpNum === -1 ? -2 : tmpNum;
            }

            // 拖拽中移动回调
            // 为了解绑
            let mouseMoveCallback = function (e) {
                let endX = e.clientX - getClientRect.left;
                let endY = e.clientY - getClientRect.top;

                endX = Math.min(Math.max(endX,0),domW);
                endY = Math.min(Math.max(endY,0),domH);

                let w = endX - dragStartX;
                let h = endY - dragStartY;
                let css = {};
                let prop = 'transform-origin';

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

            let mouseupCallback = function () {
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

    }

    componentDidMount() {
        this.initCanavs();
        this.fillBg();
        this.drawGrid();
        this.drag();
    }

    componentWillReceiveProps(nextProps) {

    }

    render() {
        return (
            <div ref={ref => this.canvasBoxDom = ref} className="canvasBox">
                {
                    this.props.element
                }
                <div ref={ref => this.dragMaskDom = ref} className="dragMask"></div>
                <div ref={ref => this.dragTextDom = ref} className="dragText"></div>
                <canvas id={this.props.id} ref={ref => this.canvasDom = ref}></canvas>
            </div>
        )
    }
}

export default Canvas;
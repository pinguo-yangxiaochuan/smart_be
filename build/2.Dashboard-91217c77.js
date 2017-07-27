webpackJsonp([2],{

/***/ 1699:
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _css = __webpack_require__(484);

	var _row = __webpack_require__(487);

	var _row2 = _interopRequireDefault(_row);

	var _css2 = __webpack_require__(524);

	var _inputNumber = __webpack_require__(527);

	var _inputNumber2 = _interopRequireDefault(_inputNumber);

	var _css3 = __webpack_require__(491);

	var _col = __webpack_require__(492);

	var _col2 = _interopRequireDefault(_col);

	var _css4 = __webpack_require__(493);

	var _card = __webpack_require__(496);

	var _card2 = _interopRequireDefault(_card);

	var _css5 = __webpack_require__(509);

	var _button = __webpack_require__(512);

	var _button2 = _interopRequireDefault(_button);

	var _css6 = __webpack_require__(515);

	var _input = __webpack_require__(518);

	var _input2 = _interopRequireDefault(_input);

	var _css7 = __webpack_require__(548);

	var _form = __webpack_require__(552);

	var _form2 = _interopRequireDefault(_form);

	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _react = __webpack_require__(1);

	var _react2 = _interopRequireDefault(_react);

	var _BreadcrumbCustom = __webpack_require__(656);

	var _BreadcrumbCustom2 = _interopRequireDefault(_BreadcrumbCustom);

	var _Canvas = __webpack_require__(1700);

	var _Canvas2 = _interopRequireDefault(_Canvas);

	var _reactDraggable = __webpack_require__(1455);

	var _reactDraggable2 = _interopRequireDefault(_reactDraggable);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /**
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * Created by hao.cheng on 2017/4/28.
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                */


	var FormItem = _form2.default.Item;

	var Configs = function (_React$Component) {
	    _inherits(Configs, _React$Component);

	    function Configs(props) {
	        _classCallCheck(this, Configs);

	        var _this = _possibleConstructorReturn(this, (Configs.__proto__ || Object.getPrototypeOf(Configs)).call(this, props));

	        _this.state = {
	            data: [],
	            dragIndex: 0
	        };

	        _this.handleTypeEvent = function (type, event) {
	            _this.state.data.push({
	                type: type,
	                x: 0,
	                y: 0,
	                w: 200,
	                h: 50
	            });
	            _this.setState(_this.state.data);
	        };

	        _this.onDrag = function (index, event, ui) {

	            clearTimeout(_this.timer);
	            _this.timer = setTimeout(function () {
	                _this.state.data[index].x = ui.x;
	                _this.state.data[index].y = ui.y;

	                _this.setState({
	                    dragIndex: index
	                });
	            }, 50);
	        };

	        _this.handeChangeEvent = function (name, value) {
	            _this.state.data[_this.state.dragIndex][name] = value;
	            _this.setState(_this.state.data);
	        };
	        return _this;
	    }

	    _createClass(Configs, [{
	        key: 'componentDidMount',
	        value: function componentDidMount() {
	            var panelBoxDom = document.getElementById('panelBox');
	            this.width = panelBoxDom.clientWidth;
	            this.height = panelBoxDom.clientHeight;
	        }
	    }, {
	        key: 'render',
	        value: function render() {
	            var _this2 = this;

	            var getFieldDecorator = this.props.form.getFieldDecorator;

	            var formItemLayout = {
	                labelCol: {
	                    xs: { span: 24 },
	                    sm: { span: 8 }
	                },
	                wrapperCol: {
	                    xs: { span: 24 },
	                    sm: { span: 14 }
	                }
	            };
	            var tailFormItemLayout = {
	                wrapperCol: {
	                    xs: {
	                        span: 24,
	                        offset: 0
	                    },
	                    sm: {
	                        span: 14,
	                        offset: 8
	                    }
	                }
	            };
	            var position = this.state.data[this.state.dragIndex] || {
	                x: 0,
	                y: 0,
	                w: 0,
	                h: 0
	            };

	            console.log(position);
	            var inputDom = null;
	            var textaearDom = null;
	            var element = this.state.data.map(function (value, index) {
	                if (value.type == 'input') {
	                    return _react2.default.createElement(
	                        _reactDraggable2.default,
	                        { position: { x: value.x, y: value.y }, onDrag: _this2.onDrag.bind(_this2, index), key: index, bounds: { top: 0, left: 0, right: _this2.width - value.w, bottom: _this2.height - value.h } },
	                        _react2.default.createElement(_input2.default, { style: { height: value.h, width: value.w, position: 'absolute', left: 0, top: 0 }, type: 'text' })
	                    );
	                } else if (value.type == 'textaear') {
	                    return _react2.default.createElement(
	                        _reactDraggable2.default,
	                        { position: { x: value.x, y: value.y }, onDrag: _this2.onDrag.bind(_this2, index), key: index, bounds: { top: 0, left: 0, right: _this2.width - value.w, bottom: _this2.height - value.h } },
	                        _react2.default.createElement(_input2.default, { style: { height: value.h, width: value.w, position: 'absolute', left: 0, top: 0 }, type: 'textarea' })
	                    );
	                }
	            });
	            return _react2.default.createElement(
	                'div',
	                { className: 'gutter-example button-demo' },
	                _react2.default.createElement(_BreadcrumbCustom2.default, { first: 'UI', second: '\u914D\u7F6E\u7EC4\u4EF6' }),
	                _react2.default.createElement(
	                    _row2.default,
	                    { gutter: 16 },
	                    _react2.default.createElement(
	                        _col2.default,
	                        { className: 'gutter-row', span: 4 },
	                        _react2.default.createElement(
	                            _card2.default,
	                            { bordered: false },
	                            _react2.default.createElement(
	                                _button2.default,
	                                { onClick: this.handleTypeEvent.bind(this, 'input') },
	                                'input'
	                            ),
	                            _react2.default.createElement(
	                                _button2.default,
	                                { onClick: this.handleTypeEvent.bind(this, 'textaear') },
	                                'textaear'
	                            )
	                        )
	                    ),
	                    _react2.default.createElement(
	                        _col2.default,
	                        { className: 'gutter-row', span: 16 },
	                        _react2.default.createElement(_Canvas2.default, { id: 'panelBox', element: element })
	                    ),
	                    _react2.default.createElement(
	                        _col2.default,
	                        { className: 'gutter-row', span: 4 },
	                        _react2.default.createElement(
	                            _card2.default,
	                            { bordered: false },
	                            _react2.default.createElement(
	                                _form2.default,
	                                null,
	                                _react2.default.createElement(
	                                    FormItem,
	                                    _extends({}, formItemLayout, {
	                                        label: 'X\u5750\u6807'
	                                    }),
	                                    _react2.default.createElement(_inputNumber2.default, {
	                                        size: 'large',
	                                        value: position.x.toFixed(0),
	                                        onChange: this.handeChangeEvent.bind(this, 'x')
	                                    })
	                                ),
	                                _react2.default.createElement(
	                                    FormItem,
	                                    _extends({}, formItemLayout, {
	                                        label: 'Y\u5750\u6807'
	                                    }),
	                                    _react2.default.createElement(_inputNumber2.default, {
	                                        size: 'large',
	                                        value: position.y.toFixed(0),
	                                        onChange: this.handeChangeEvent.bind(this, 'y')
	                                    })
	                                ),
	                                _react2.default.createElement(
	                                    FormItem,
	                                    _extends({}, formItemLayout, {
	                                        label: '\u9AD8\u5EA6'
	                                    }),
	                                    _react2.default.createElement(_inputNumber2.default, {
	                                        size: 'large',
	                                        value: position.h.toFixed(0),
	                                        onChange: this.handeChangeEvent.bind(this, 'h')
	                                    })
	                                ),
	                                _react2.default.createElement(
	                                    FormItem,
	                                    _extends({}, formItemLayout, {
	                                        label: '\u5BBD\u5EA6'
	                                    }),
	                                    _react2.default.createElement(_inputNumber2.default, {
	                                        size: 'large',
	                                        value: position.w.toFixed(0),
	                                        onChange: this.handeChangeEvent.bind(this, 'w')
	                                    })
	                                )
	                            )
	                        )
	                    )
	                ),
	                _react2.default.createElement(
	                    'style',
	                    null,
	                    '\n                    .canvasBox {\n                        position: relative;\n                        width:100%;\n                        height:100%;\n                    }\n\n                    .dragMask {\n                        position: absolute;\n                        display: flex;\n                        align-items: center;\n                        justify-content: center;\n                        left: 0;\n                        top: 0;\n                        width: 0;\n                        height: 0;\n                        z-index: 99;\n                    }\n\n                    .dragText {\n                        position: absolute;\n                        min-width: 30px;\n                        left: 0;\n                        top: 0;\n                        color: #fff;\n                        font-size: 12px;\n                    }\n                '
	                )
	            );
	        }
	    }]);

	    return Configs;
	}(_react2.default.Component);

	var Config = _form2.default.create()(Configs);

	exports.default = Config;

/***/ },

/***/ 1700:
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _react = __webpack_require__(1);

	var _react2 = _interopRequireDefault(_react);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var Canvas = function (_Component) {
	    _inherits(Canvas, _Component);

	    function Canvas(props) {
	        _classCallCheck(this, Canvas);

	        var _this = _possibleConstructorReturn(this, (Canvas.__proto__ || Object.getPrototypeOf(Canvas)).call(this, props));

	        _this.state = {};

	        _this.initCanavs = function () {
	            _this.getClientRect = function () {
	                var clientRect = _this.canvasBoxDom.getBoundingClientRect();
	                return {
	                    left: clientRect.left,
	                    top: clientRect.top
	                };
	            }();
	            var dom = _this.canvasDom;
	            _this.cxt = dom.getContext('2d');
	            var canvasBox = _this.canvasBoxDom;
	            var w = canvasBox.clientWidth;
	            var h = document.body.clientHeight - _this.getClientRect.top - 66;
	            _this.width = w;
	            _this.height = h;
	            dom.setAttribute('width', w);
	            dom.setAttribute('height', h);
	        };

	        _this.fillBg = function () {
	            var cxt = _this.cxt;
	            cxt.fillStyle = '#1E1E1E';
	            cxt.fillRect(0, 0, _this.width, _this.height);
	        };

	        _this.setText = function (startX, startY, text) {
	            var cxt = _this.cxt;
	            cxt.font = '14';
	            cxt.fillStyle = 'gray';
	            cxt.fillText(text, startX, startY);
	        };

	        _this.drawLine = function (startX, startY, dir) {
	            var cxt = _this.cxt;
	            var lineX = 0;
	            var lineY = 0;

	            if (dir === 'row') {
	                lineY = startY - 0.5;
	                cxt.moveTo(startX, lineY);
	                cxt.lineTo(_this.width, lineY);
	            } else if (dir === 'col') {
	                lineX = startX - 0.5;
	                cxt.moveTo(lineX, startY);
	                cxt.lineTo(lineX, _this.height);
	            }

	            cxt.lineWidth = 1;
	            cxt.strokeStyle = 'grey';
	            cxt.stroke();
	        };

	        _this.drawGrid = function () {
	            var w = _this.width;
	            var h = _this.height;
	            var rowTimes = 0;
	            var colTimes = 0;

	            for (var i = 20; i <= h; i = i + 10) {
	                var rowStartX = 20;
	                if (rowTimes % 5 === 0) {
	                    rowStartX = 0;
	                    _this.setText(rowStartX, i - 2, i - 20);
	                }

	                rowTimes++;
	                _this.drawLine(rowStartX, i, 'row');
	            }

	            for (var j = 20; j <= w; j = j + 10) {
	                var rowStartY = 20;
	                if (colTimes % 5 === 0) {
	                    rowStartY = 0;
	                    _this.setText(j, 9, j - 20);
	                }

	                colTimes++;
	                _this.drawLine(j, rowStartY, 'col');
	            }
	        };

	        _this.setCss = function (dom, options) {
	            var _str = '';
	            for (var i in options) {
	                _str += i + ':' + options[i] + ';';
	            }
	            dom.style.cssText += _str;
	        };

	        _this.drag = function () {
	            var dragMaskDom = _this.dragMaskDom;
	            var dragTextDom = _this.dragTextDom;
	            var getClientRect = _this.getClientRect;
	            var dom = _this.canvasDom; // 画布dom
	            var domW = dom.width;
	            var domH = dom.height;
	            var dragStartX = 0; // 鼠标拖拽起点X坐标
	            var dragStartY = 0; // 鼠标拖拽起点Y坐标
	            var setCss = _this.setCss;
	            var sign = function sign(num) {
	                var tmpNum = Math.sign(num);
	                return tmpNum === -1 ? -2 : tmpNum;
	            };

	            // 拖拽中移动回调
	            // 为了解绑
	            var mouseMoveCallback = function mouseMoveCallback(e) {
	                var _css, _css2, _css3, _css4;

	                var endX = e.clientX - getClientRect.left;
	                var endY = e.clientY - getClientRect.top;

	                endX = Math.min(Math.max(endX, 0), domW);
	                endY = Math.min(Math.max(endY, 0), domH);

	                var w = endX - dragStartX;
	                var h = endY - dragStartY;
	                var css = {};
	                var prop = 'transform-origin';

	                setCss(dragTextDom, {
	                    left: endX + sign(w) * 10 + 'px',
	                    top: endY + sign(h) * 10 + 'px'
	                });

	                switch (true) {
	                    case w < 0 && h < 0:
	                        w = -w;
	                        h = -h;
	                        css = (_css = {}, _defineProperty(_css, prop, 'left top'), _defineProperty(_css, 'transform', 'rotate(180deg)'), _css);
	                        break;

	                    case w < 0:
	                        w = -w;
	                        css = (_css2 = {}, _defineProperty(_css2, prop, 'left center'), _defineProperty(_css2, 'transform', 'rotate(180deg)'), _css2);
	                        break;

	                    case h < 0:
	                        h = -h;
	                        css = (_css3 = {}, _defineProperty(_css3, prop, 'top center'), _defineProperty(_css3, 'transform', 'rotate(180deg)'), _css3);
	                        break;

	                    default:
	                        css = (_css4 = {}, _defineProperty(_css4, prop, 'left center'), _defineProperty(_css4, 'transform', 'rotate(0)'), _css4);
	                        break;
	                }

	                setCss(dragMaskDom, Object.assign({
	                    width: w + 'px',
	                    height: h + 'px',
	                    border: '1px solid #fff'
	                }, css));

	                dragTextDom.innerText = w + ' x ' + h;
	            };

	            var mouseupCallback = function mouseupCallback() {
	                setCss(dragMaskDom, {
	                    width: 0,
	                    height: 0,
	                    border: 'none'
	                });
	                dragTextDom.innerText = '';
	                document.removeEventListener('mousemove', mouseMoveCallback);
	                document.removeEventListener('mouseup', mouseupCallback);
	            };

	            dom.addEventListener('mousedown', function (e) {
	                dragStartX = e.clientX - getClientRect.left;
	                dragStartY = e.clientY - getClientRect.top;

	                setCss(dragMaskDom, {
	                    left: dragStartX + 'px',
	                    top: dragStartY + 'px'
	                });

	                document.addEventListener('mousemove', mouseMoveCallback);
	                document.addEventListener('mouseup', mouseupCallback);
	            }.bind(_this));
	        };

	        return _this;
	    }

	    _createClass(Canvas, [{
	        key: 'componentDidMount',
	        value: function componentDidMount() {
	            this.initCanavs();
	            this.fillBg();
	            this.drawGrid();
	            this.drag();
	        }
	    }, {
	        key: 'componentWillReceiveProps',
	        value: function componentWillReceiveProps(nextProps) {}
	    }, {
	        key: 'render',
	        value: function render() {
	            var _this2 = this;

	            return _react2.default.createElement(
	                'div',
	                { ref: function ref(_ref4) {
	                        return _this2.canvasBoxDom = _ref4;
	                    }, className: 'canvasBox' },
	                this.props.element,
	                _react2.default.createElement('div', { ref: function ref(_ref) {
	                        return _this2.dragMaskDom = _ref;
	                    }, className: 'dragMask' }),
	                _react2.default.createElement('div', { ref: function ref(_ref2) {
	                        return _this2.dragTextDom = _ref2;
	                    }, className: 'dragText' }),
	                _react2.default.createElement('canvas', { id: this.props.id, ref: function ref(_ref3) {
	                        return _this2.canvasDom = _ref3;
	                    } })
	            );
	        }
	    }]);

	    return Canvas;
	}(_react.Component);

	exports.default = Canvas;

/***/ }

});
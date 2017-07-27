import React, { Component } from 'react';
import { Layout } from 'antd';
const { Content, Footer } = Layout;
import './style/index.less';
import "./style/variables.less";
import "./style/global.less";
import "./style/scroll.less";
import "./style/table.less";
import "./style/login.less";
import "./style/icons.less";
import "./style/button.less";
import "./style/modal.less";
import "./style/menu.less";
import "./style/banner.less";
import "./style/card.less";
import "./style/img.less";
import "./style/utils-text.less";
import "./style/utils-color.less";
import "./style/utils-size.less";
import "./style/utils-border.less";
import "./style/utils-spacing.less";
import SiderCustom from './components/SiderCustom';
import HeaderCustom from './components/HeaderCustom';

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
          collapsed: false,
        };

        this.toggle = () => {
          this.setState({
              collapsed: !this.state.collapsed,
          });
        };
    }
    render() {
        return (
            <Layout className="ant-layout-has-sider">
              <SiderCustom path={this.props.location.pathname} collapsed={this.state.collapsed} />
              <Layout>
                <HeaderCustom toggle={this.toggle} />
                <Content style={{ margin: '0 16px', overflow: 'initial' }}>
                  {this.props.children}
                </Content>
                <Footer style={{ textAlign: 'center' }}>
                  React-Admin ©2017 Created by 865470087@qq.com
                </Footer>
              </Layout>
            </Layout>
        );
    }
}

export default App;

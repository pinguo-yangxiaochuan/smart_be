/**
 * Created by hao.cheng on 2017/4/13.
 */
import React, { Component } from 'react';
import { Menu, Icon, Layout } from 'antd';
const { Header } = Layout;
const SubMenu = Menu.SubMenu;
const MenuItemGroup = Menu.ItemGroup;
import screenfull from 'screenfull';
import { gitOauthToken, gitOauthInfo } from '../axios';
import { queryString } from '../utils';
import avater from '../style/imgs/b1.jpg';


class HeaderCustom extends Component {
    constructor(props) {
        super(props);
        this.state = {
            user: ''
        };

        this.screenFull = () => {
            if (screenfull.enabled) {
                screenfull.request();
            }
        };
    }

    componentDidMount() {
        const QueryString = queryString();
        // if (QueryString.hasOwnProperty('code')) {
        //     console.log(QueryString);
        //     const _user = JSON.parse(localStorage.getItem('user'));
        //     !_user && gitOauthToken(QueryString.code).then(res => {
        //         console.log(res);
        //         gitOauthInfo(res.access_token).then(info => {
        //             this.setState({
        //                 user: info
        //             });
        //             localStorage.setItem('user', JSON.stringify(info));
        //         });
        //     });
        //     _user && this.setState({
        //         user: _user
        //     });
        // }
        const _user = JSON.parse(localStorage.getItem('user')) || '测试';
        if (!_user && QueryString.hasOwnProperty('code')) {
            gitOauthToken(QueryString.code).then(res => {
                gitOauthInfo(res.access_token).then(info => {
                    this.setState({
                        user: info
                    });
                    localStorage.setItem('user', JSON.stringify(info));
                });
            });
        } else {
            this.setState({
                user: _user
            });
        }
    }

    render() {
        return (
            <Header style={{ background: '#fff', padding: 0, height: 65 }} className="custom-theme" >
                <Icon
                    className="trigger custom-trigger"
                    type={this.state.collapsed ? 'menu-unfold' : 'menu-fold'}
                    onClick={this.props.toggle}
                />
                <Menu
                    mode="horizontal"
                    style={{ lineHeight: '64px', float: 'right' }}
                >
                    <Menu.Item key="full" onClick={this.screenFull} >
                        <Icon type="arrows-alt" onClick={this.screenFull} />
                    </Menu.Item>
                    <SubMenu title={<span className="avatar"><img src={avater} alt="头像" /><i className="on bottom b-white" /></span>}>
                        <MenuItemGroup title="用户中心">
                            <Menu.Item key="setting:1">你好 - {this.state.user.login}</Menu.Item>
                            <Menu.Item key="setting:2">个人信息</Menu.Item>
                        </MenuItemGroup>
                        <MenuItemGroup title="设置中心">
                            <Menu.Item key="setting:3">个人设置</Menu.Item>
                            <Menu.Item key="setting:4">系统设置</Menu.Item>
                        </MenuItemGroup>
                    </SubMenu>
                </Menu>
                <style>{`
                    .ant-menu-submenu-horizontal > .ant-menu {
                        width: 120px;
                        left: -40px;
                    }
                `}</style>
            </Header>
        )
    }
}

export default HeaderCustom;
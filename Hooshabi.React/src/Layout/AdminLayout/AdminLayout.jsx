import React, { Fragment } from "react";
import { Component } from "react";
import BaseLayout from "../../Lib/Base/BaseLayout";
import './adminlayout.scss';
import { Layout, Menu } from 'antd';
import {
    UserOutlined
} from '@ant-design/icons';
import SubMenu from "antd/lib/menu/SubMenu";
import Sider from "antd/lib/layout/Sider";
import { Content } from "antd/lib/layout/layout";
import AppManifest from '../../App/AppManifest';


class AdminLayout extends BaseLayout {
    constructor(props) {
        super(props);
        this.SidebarWidth = '300px';
        this.SidebarCollapsibleWidth = '70px';
    }

    state = {
        collapsed: false,
    };

    onCollapse = collapsed => {
        this.setState({ collapsed });
    };

    LayoutBody = () => {
        return <div className="adminlayout">
            <Layout className="adminrootlayout">
                <Content>
                    <Layout className="site-layout-background" >
                        <Sider className="adminlayoutsider" onCollapse={this.onCollapse} width={this.SidebarWidth} collapsed={this.state.collapsed} collapsible={true} collapsedWidth={this.SidebarCollapsibleWidth}>
                            <Menu
                                mode="inline"
                                onSelect={(menu, key, keyPath, selectedKeys, domEvent) => {
                                    var router = this.props.router;
                                    
                                }}
                                defaultSelectedKeys={['1']}
                                defaultOpenKeys={['pages']}
                                style={{ height: '100%' }}
                            >
                                <SubMenu key="pages" icon={<UserOutlined />} title="Pages">
                                    {
                                        AppManifest.Views.map(z => {
                                            return <Menu.Item key={z.Name} dataitem={z.Component}>{z.Name}</Menu.Item>;
                                        })
                                    }
                                </SubMenu>
                            </Menu>
                        </Sider>
                        <Content className="adminlayoutcontent" style={{ marginLeft: (this.state.collapsed ? this.SidebarCollapsibleWidth : this.SidebarWidth) }}>Content</Content>
                    </Layout>
                </Content>
            </Layout>
        </div>
    }
}

export default AdminLayout;
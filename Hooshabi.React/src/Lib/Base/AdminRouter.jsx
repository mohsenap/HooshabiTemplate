import React, { Fragment, useState } from "react";
import { Component } from "react";
import './adminroutercss.scss';
import { Form, Col, Input, Layout, Menu, Row, Select, Space, Button } from 'antd';
import {
    UserOutlined
} from '@ant-design/icons';
import SubMenu from "antd/lib/menu/SubMenu";
import Sider from "antd/lib/layout/Sider";
import { Content } from "antd/lib/layout/layout";
import AppManifest from '../../App/AppManifest';
import { useLocation, useNavigate, useParams } from 'react-router';
import AppManager from "../AppManager";

const SidebarWidth = '300px';
const SidebarCollapsibleWidth = '70px';

const AdminRouter = (props) => {
    const [collapsed, setcollapsed] = useState(false);
    const router = {};
    router.location = useLocation();
    router.navigate = useNavigate();
    router.params = useParams();
    const onCollapse = collapsed => {
        setcollapsed(collapsed);
    };
    return <div className="adminlayout">
        <Layout className="adminrootlayout">
            <Content>
                <Layout className="site-layout-background" >
                    <Sider className="adminlayoutsider" onCollapse={onCollapse} width={SidebarWidth} collapsed={collapsed} collapsible={true} collapsedWidth={SidebarCollapsibleWidth}>
                        <Menu
                            mode="inline"
                            onSelect={(menu, key, keyPath, selectedKeys, domEvent) => {
                                if (menu.item.props.dataitem && menu.item.props.dataitem.Route) {
                                    router.navigate(menu.item.props.dataitem.Route, { replace: true });
                                }
                            }}
                            defaultSelectedKeys={['1']}
                            defaultOpenKeys={['pages']}
                            style={{ height: '100%' }}
                        >
                            <SubMenu key="pages" icon={<UserOutlined />} title="Pages">
                                {
                                    AppManifest.Views.sort(function (a, b) { return a.Name.localeCompare(b.Name); }).map(z => {
                                        return <Menu.Item key={z.Name} dataitem={z.Component}>{z.Name}</Menu.Item>;
                                    })
                                }
                                <Menu.Item key="" dataitem=""></Menu.Item>
                            </SubMenu>
                        </Menu>
                    </Sider>
                    <Content className="adminlayoutcontent" style={{ marginLeft: (collapsed ? SidebarCollapsibleWidth : SidebarWidth) }}>
                        {props.children}
                    </Content>
                </Layout>
            </Content>
        </Layout>
    </div>
}

export default AdminRouter;
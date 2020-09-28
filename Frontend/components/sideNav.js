import Link from "next/link";
import React, { useState} from "react";
import { Layout, Menu } from 'antd';
import { LogoutOutlined,DashboardOutlined, UserOutlined, LaptopOutlined, NotificationOutlined } from '@ant-design/icons';

const { SubMenu } = Menu;
const { Sider } = Layout;

const SideNav = () =>{

    return(
        <React.Fragment>
            <Sider width={200} className="site-layout-background">
            <Menu
              mode="inline"
              defaultSelectedKeys={['dashboard']}
              // defaultSelectedKeys={selection}
              // defaultOpenKeys={['']}
              style={{ height: '100%', borderRight: 0 }}
            >
              <Menu.Item key="dashboard">
                <DashboardOutlined />
                <Link href={'/'}><a>Dashboard</a></Link> 
              </Menu.Item>
              
    
              <SubMenu
                key="account"
                title={
                  <span>
                    <UserOutlined />
                    Account
                </span>
                }
              >
                <Menu.Item key="update-profile">
                  <Link href={'/account/update-profile'}><a>Update Profile</a></Link> 
                </Menu.Item>
              </SubMenu>
              <Menu.Item key="logout">
                <LogoutOutlined />
                <Link href={'/logout'}>
                 <a>Logout</a> 
                </Link>
              </Menu.Item>
            </Menu>
          
          </Sider>
        </React.Fragment>
    )
};

export default SideNav;
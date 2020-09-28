import React, { useEffect, useState } from 'react';
import { Layout, Avatar, Dropdown, Menu } from 'antd';
const { Header } = Layout;
import dataFetch from "../utils/dataFetch";
import { DownOutlined } from '@ant-design/icons';
import Link from "next/link";
const TopNav = ({ loginRequired }) => {

    const [isQueried, setQueried] = useState(false);
    const [isLoading, setLoaded] = useState(false);
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [profilePic, setProfilePic] = useState("");

    const query = `
        query {
        myProfile{
            firstName
            lastName
            profilePic
        }
    }
    `;

    const getProfile = async () => await dataFetch({ query });

    useEffect(() => {
        if (!isQueried) {
            getProfile().then(response => {
                setQueried(true);
                if (!Object.prototype.hasOwnProperty.call(response, 'errors')) {
                    setFirstName(response.data.myProfile.firstName ? response.data.myProfile.firstName : "");
                    setLastName(response.data.myProfile.lastName ? response.data.myProfile.lastName : "");
                    setProfilePic(response.data.myProfile.profilePic ? response.data.myProfile.profilePic : "");
                    setLoaded(true);
                }
            })
        }
    });

    const menu = (
        <Menu>
            <Menu.Item>
                <Link href='/account/update-profile'>
                    <a>My Profile</a>
                </Link>
            </Menu.Item>
            <Menu.Divider />
            <Menu.Item>
                <Link href='/logout'>
                    <a>Logout</a>
                </Link>
            </Menu.Item>
        </Menu>
    );


    return (
        <React.Fragment>
            <Header className="header">
                
                <a className="float-left" style={{ color: "white", fontSize: "1.5em", fontWeight: 700 }}>Pratilipi</a>
               
                {isLoading && loginRequired ? (

                    <div className="align-middle float-right">
                        <span style={{ color: "white" }}>Welcome, <strong>{firstName + " " + lastName}</strong></span>
                        <Avatar size="small" className="ml-2 mr-2" alt="profile-pic" src={profilePic} />
                        <Dropdown overlay={menu} placement="bottomLeft">
                            <a className="ant-dropdown-link" onClick={e => e.preventDefault()}>
                                <DownOutlined style={{ color: "white" }} />
                            </a>
                        </Dropdown>
                    </div>
                ) : (null)}
            </Header>
        </React.Fragment>
    );
};

export default TopNav;
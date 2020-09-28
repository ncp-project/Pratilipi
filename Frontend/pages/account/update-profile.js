import { Card } from 'antd';
import React, { useEffect, useState } from 'react';
import dataFetch from "../../utils/dataFetch";
import fileUpload from "../../utils/fileUpload";
import Link from "next/link";
import Base from '../../components/base';
import Loading from '../../components/loading';
import { Upload, Button, Result } from "antd";
import { UploadOutlined } from '@ant-design/icons';
const ReactQuill = typeof window === 'object' ? require('react-quill') : () => false;
import 'react-quill/dist/quill.snow.css';

const UpdateProfilePage = () => {
    const [isLoading, setLoaded] = useState(false);
    const [isQueried, setQueried] = useState(false);
    const [username, setUsername] = useState("");
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [phoneNo, setPhoneNo] = useState("");
    const [profilePic, setProfilePic] = useState("");
    const [dataLoading, setDataLoading] = useState(false);
    const [success, setSuccess] = useState("");
    const [error, setErrorText] = useState("");
    const [about, setAbout] = useState("");

    const query = `
        query {
        myProfile{
            username
            firstName
            lastName
            email
            profilePic
            phone
            about
        }
    }
    `;

    const updateProfileQuery = `mutation ($details:ProfileDetailsObj){
        updateProfile(details:$details)
        {
        status
        }
    }
    `;


    const getProfile = async () => await dataFetch({ query });

    useEffect(() => {
        if (!isQueried) {
            getProfile().then(response => {
                setQueried(true);
                if (!Object.prototype.hasOwnProperty.call(response, 'errors')) {
                    setUsername(response.data.myProfile.username ? response.data.myProfile.username : "");
                    setFirstName(response.data.myProfile.firstName ? response.data.myProfile.firstName : "");
                    setLastName(response.data.myProfile.lastName ? response.data.myProfile.lastName : "");
                    setEmail(response.data.myProfile.email ? response.data.myProfile.email : "");
                    setPhoneNo(response.data.myProfile.phone ? response.data.myProfile.phone : "");
                    setAbout(response.data.myProfile.about ? response.data.myProfile.about : "");
                    setProfilePic(response.data.myProfile.profilePic ? response.data.myProfile.profilePic : "");
                    setLoaded(true);
                }
            })
        }
    });

    const uploadFile = async data => await fileUpload(data);

    const submitForm = async variables => dataFetch({ query: updateProfileQuery, variables });

    const updateProfile = () => {
        const variables = {
            "details": {
                "firstName": firstName,
                "lastName": lastName,
                "phone": phoneNo,
                "about": about
            }
        };
        submitForm(variables).then(r => {
            if (Object.prototype.hasOwnProperty.call(r, "errors")) {
                setErrorText(r.errors[0].message)
            } else {
                setSuccess(r.data);
                setErrorText("");
            }
        })
    };

    const uploadProps = {
        name: "file",
        multiple: false,
        showUploadList: false,
        customRequest: ({ file }) => {
            const data = new FormData();
            data.append('imageFile', file);
            const query = `mutation{
                updateProfilePic{
                fileName
                } 
            }`;
            data.append('query', query);
            uploadFile({ data }).then((response) => (
                setProfilePic(response.data.updateProfilePic.fileName)
            ));
        }
    };


    return isLoading ? (
        <Base loginRequired>
            <React.Fragment>

                <div className="container-fluid">
                    <h5>Update Profile</h5>
                    <Card style={{ width: '90%' }}>
                        <form
                            className="form-group"
                            onSubmit={e => {
                                setDataLoading(true);
                                updateProfile();
                                e.preventDefault();
                            }}>
                            {!dataLoading ?
                                <React.Fragment>
                                    <div className="row">
                                        <div className="col-md-9">
                                            <div className="row">
                                                <div className="col-md-6 mt-2">
                                                    <label>Username</label>
                                                    <input
                                                        type="text"
                                                        placeholder="Username"
                                                        value={username}
                                                        onChange={e => setUsername(e.target.value)}
                                                        className="form-control"
                                                        disabled={true}
                                                    />
                                                </div>
                                                <div className="col-md-6 mt-2">
                                                    <label>Email</label>
                                                    <input
                                                        type="text"
                                                        placeholder="Email"
                                                        value={email}
                                                        onChange={e => setEmail(e.target.value)}
                                                        className="form-control"
                                                        disabled={true}
                                                    />
                                                </div>
                                            </div>
                                            <div className="row">
                                                <div className="col-md-6 mt-3">
                                                    <label>First Name</label>
                                                    <input
                                                        type="text"
                                                        placeholder="First Name"
                                                        value={firstName}
                                                        onChange={e => setFirstName(e.target.value)}
                                                        className="form-control"
                                                    />
                                                </div>
                                                <div className="col-md-6 mt-3">
                                                    <label>Last Name</label>
                                                    <input
                                                        type="text"
                                                        placeholder="Last Name"
                                                        value={lastName}
                                                        onChange={e => setLastName(e.target.value)}
                                                        className="form-control"
                                                    />
                                                </div>
                                            </div>
                                            <div className="row">
                                                <div className="col-md-6 mt-3">
                                                    <label>Phone No</label>
                                                    <input
                                                        type="text"
                                                        placeholder="Phone No"
                                                        value={phoneNo}
                                                        onChange={e => setPhoneNo(e.target.value)}
                                                        className="form-control"
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col-md-3">
                                            <div className="row-md-6 mt-3">
                                                <img className="shadow" alt="profilepic" src={profilePic} style={{ height: '20vh', width: '20vh' }} />
                                            </div>
                                            <div className="col-md-12  mt-3 float-right">
                                                <Upload {...uploadProps} accept="image/*">
                                                    <Button className="row" style={{ width: '20vh' }}>
                                                        <UploadOutlined />
                                                        Change Picture
                                                    </Button>
                                                </Upload>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="row">
                                        <div className="col-md-9 mt-2">
                                            <label>About</label>
                                            <ReactQuill         
                                                value={about}
                                                onChange={e => setAbout(e)}
                                            />
                                        </div>
                                    </div>
                                   
                                     
                                    <div className="p-2 mt-3">
                                        <button type="submit" className="button btn ant-btn-primary">
                                            Update
                                        </button>
                                    </div>
                                </React.Fragment>

                                : <div>
                                    {
                                        success !== '' ? (
                                            <Result
                                                status="success"
                                                title="Successfully saved your details"
                                                extra={<Link href="/"><a><Button type="primary">Back to Dashboard</Button></a></Link>}
                                            />
                                        )
                                            : error !== '' ?
                                                <div className="alert alert-danger m-4">{error}</div> :
                                                <div className="alert alert-warning m-4">Submitting. Please Wait</div>
                                    }
                                </div>

                            }
                        </form>
                    </Card>
                </div>
            </React.Fragment>
        </Base>
    ) : <Loading text={ "We are opening the page. Please wait"}/>
};

export default UpdateProfilePage;
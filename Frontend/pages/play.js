import Link from "next/link";
import Base from '../components/base';
import '../styles/play.sass';
import classNames from 'classnames';
import fileUpload from "../utils/fileUpload";
import { Upload, Button, Result } from "antd";
import { ScanOutlined,UploadOutlined } from '@ant-design/icons';
import React, { useEffect, useState } from 'react';

const PlayPage = (props) => {

  const [file, setFileResponse] = useState("");

  const uploadProps ={
    name:"file",
    nultiple: false,
    showUploadList: false,

    customRequest: ({file})=>{
      const data = new FormData();
      data.append('file',file);
      fetch('https://ocr-telugu.herokuapp.com/', {
      // fetch('http://localhost:4000/', {
        method:'POST',
        body: data,
      })
      .then((response) => response.json())
      .then((jsonData) => {
        setFileResponse(jsonData.data);
      });
    }
  }

  const renderPlay =  (
      <div className={classNames("row m-0")}>
          {
            file != "" ? (
            <div style={{fontSize:30}} dangerouslySetInnerHTML={{__html: file}}/>
            ):
            (
              <div>
                <div className="col-md-6 p-3">
                  <Button href="/play/scan" className="row" style={{ width: '30vh'}} >
                    <ScanOutlined /> Scan a document
                  </Button>
                </div>
                <div className="col-md-6 p-3">
                  <Upload {...uploadProps} accept="image/*">
                    <Button className="row" style={{ width: '30vh' }}>
                        <UploadOutlined />
                        Upload File
                    </Button>
                  </Upload>
                </div>
              </div>
            )
          }
        </div>
  );
  return (
    <Base loginRequired >
        
        <div className="container p-0">
        <h5>OCR Telugu</h5>
        {renderPlay}
        </div>
    </Base>
    
  )
};
export default PlayPage;

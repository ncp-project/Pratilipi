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

  const uploadFile = async data => await fileUpload(data);
  const uploadProps = {
    name: "file",
    multiple: false,
    showUploadList: false,
    customRequest: ({ file }) => {
        const data = new FormData();
        data.append('File', file);
        const query = `mutation{
            uploadOCRFile{
              fileName
            } 
        }`;
        data.append('query', query);
        uploadFile({ data }).then((response) => (
            setFileResponse(response.data.uploadOCRFile.fileName)
        ));
    }
  };

  const renderPlay =  (
    
      <div className={classNames("row m-0")}>
          <div className="col-md-6 p-3">
          
          <Button href="/play/scan" className="row" style={{ width: '30vh'}} >
            <ScanOutlined /> Scan a document
          </Button>
              
          </div>
          <div className="col-md-6 p-3">
          {
            file != "" ? (
              <Result
              status="success"
              title = ""
              extra={<Link href="/play/result"><a><Button type="primary">Succesfully uploaded {file}</Button></a></Link>}
            />
            ):
            (

              <Upload {...uploadProps} accept="image/*, .pdf">
                <Button className="row" style={{ width: '30vh' }}>
                    <UploadOutlined />
                    Upload File
                </Button>
              </Upload>
            )
          }
          </div>
      </div>
  );
 

  return (
    <Base loginRequired >
        
        <div className="container p-0">
        <h5>Playground</h5>
        {renderPlay}
        </div>
    </Base>
    
  )
};
export default PlayPage;

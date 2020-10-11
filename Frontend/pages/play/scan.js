import React, {useState} from "react";
import Link from "next/link";
import Head from "next/head";
import Base from '../../components/base';
import '../../styles/play/scan.sass';
import Webcam from "react-webcam";
import fileUpload from "../../utils/fileUpload";


const ScanPage = (props) => {

    const [isUploading, setUploading] = useState(false);
    const [isUploaded, setUploaded] = useState(false);
    const [isClicked, setClicked] = useState(false);
    const [photoBS4, setPhoto] = useState();


    const handleImageUpload = (file) => {
        const data = new FormData();
        const mutation = `mutation uploadScan{
          uploadScan
          {
            status
          }
        }`;
        data.append('ScannedPhoto', file);
        data.append('query', mutation);
        setUploading(true);
        uploadFile({data}).then((response) => {
            setUploading(false);
            setUploaded(true);
        });
    };

    const webcamRef = React.useRef(null);
    const capture = React.useCallback(
        () => {
            const imagebs64 = webcamRef.current.getScreenshot();
            setPhoto(imagebs64);
            setClicked(true);
        },
        [webcamRef]
    );

    const renderWebcam = (
        <div>
            <Webcam
                audio={false}
                mirrored={true}
                style={{ maxWidth: "100%"}}
                videoConstraints={{facingMode: "user"}}
                ref={webcamRef}
                minScreenshotHeight="90vh"
                screenshotFormat="image/jpeg"
                screenshotQuality="0.92"
            />
            <div className="text-center">
                <button className="btn btn-primary " onClick={capture}>Capture</button>
            </div>
        </div>);

    const uploadFile = async data => await fileUpload(data);
    
    const renderOnSuccess = (
        <div className="p-4 m-2 card-shadow">
            <h4>Scanned picture successfully uploaded</h4>
        </div>
    );
    return (
      <Base loginRequired >
        <Head>
            <title> Scan | Pratilipi </title>
        </Head>
          <div className="container p-0">
          { isClicked && isUploading ?
            <LoadingScreen text="Uploading Photo" /> :
            <React.Fragment>
            <div className="alert alert-warning  my-2 p-2">
                    Make sure you have enabled camera access for this application.
            </div>
            { isUploaded ? renderOnSuccess :  renderWebcam }
            </React.Fragment>
            
        }
          </div>
      </Base>
      
    )
  };

  export default ScanPage;
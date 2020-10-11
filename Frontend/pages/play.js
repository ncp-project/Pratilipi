import Link from "next/link";
import Base from '../components/base';
import '../styles/play.sass';
import classNames from 'classnames';

const renderPlay =  (
    <div className={classNames("row m-0")}>
        <div className="col-md-6 p-3">
            
        <Link href="/play/scan"><button className="btn btn-primary rounded-0">Scan a document</button></Link>
            
        </div>
        <div className="col-md-6 p-3">
        <Link href="/play/upload"><button className="btn btn-primary rounded-0">Upload a document</button></Link>
        </div>
    </div>
);


const PlayPage = (props) => {
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

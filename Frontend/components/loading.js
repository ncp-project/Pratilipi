import ReactLoading from 'react-loading';

const loading = ({text}) =>{
    return(
        <React.Fragment>
            <div style={{height:"100vh",width:"100vw"}}className="d-flex justify-content-center align-items-center">
            {/* <h4>{text}</h4> */}
            <ReactLoading type={"spinningBubbles"} color={"#00000"} height={'5%'} width={'5%'} />
            {/* <h6>Please wait your page is Loading...</h6> */}
            </div>
        </React.Fragment>
    )
};

export default loading;


import { Layout } from 'antd';
const { Footer} = Layout;

const footer = () =>{
    return(
        <Footer>
            <div className="d-flex flex-column align-items-center justify-content-center">
                <span style={{ fontSize: "1em", fontWeight: 500 }}>Developed by <strong><a href=" ">Team Pratilipi</a></strong></span>
            </div>         
        </Footer>
    )
};

export default footer;
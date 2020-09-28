import Head from '../components/head';
import TopNav from '../components/topNav';
import SideNav from '../components/sideNav';
import Footer from '../components/footer';
import Verify from '../components/verify';
import { Layout, Breadcrumb } from 'antd';

import 'antd/dist/antd.css'
import '../styles/homepage.sass';
import '../styles/bootstrap.sass'

const { Content } = Layout;

const Base = ({children, loginRequired}) => {
  return loginRequired ? (
    <Verify>
      <React.Fragment>
        <Head title="Pratilipi" />
        <Layout style={{ minHeight: "100vh" }}>
          <TopNav loginRequired/>
          <Layout>
            <SideNav/>
            <Layout style={{ padding: '24px 24px 24px' }}>
              {/* <Breadcrumb style={{ margin: '16px 0' }}>
                <Breadcrumb.Item>Home</Breadcrumb.Item>
                <Breadcrumb.Item>List</Breadcrumb.Item>
                <Breadcrumb.Item>App</Breadcrumb.Item>
              </Breadcrumb> */}
              <Content
                className=""
                style={{
                  padding: 24,
                  margin: 0,
                }}
              >
                {children}
            </Content>
              <Footer/>
            </Layout>
          </Layout>
        </Layout>
      </React.Fragment>
    </Verify>
  ): (
    <React.Fragment>
      <Layout style={{ minHeight: "100vh" }}>
        <TopNav />
        <Content>
          {children}
        </Content>
        <Footer />
      </Layout>
    </React.Fragment>
  )
};

export default Base;
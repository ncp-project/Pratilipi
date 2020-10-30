import React, { useState, useEffect } from 'react'
import Cookies from 'universal-cookie';
import { useRouter } from 'next/router';
import { GoogleLogin } from 'react-google-login';
import Base from '../components/base';
import Loading from '../components/loading';
import dataFetch from "../utils/dataFetch"
import { Card } from 'antd';

const cookies = new Cookies()

function LoginPage(props) {

  const router = useRouter();
  const [isLoading, setLoading] = useState(false);
  const [authFail, setAuthFail] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const [isQueried, setQueried] = useState(false);
  const [isLoaded, setLoaded] = useState(false);
  const [status, setStatus] = useState(false);

  const query = `{
      status
      {
        googleSignIn
      }
    }`;

  const GAuthLogin = `mutation googleLogin($accessToken: String!){
      socialAuth(accessToken: $accessToken, provider: "google-oauth2")
        {
          token
          user
          {
            username
          }
        }
    }`;

  const getStatus = async () => await dataFetch({ query });

  useEffect(() => {
    const token = cookies.get('token');
    if (token != null) {
      router.push('/')
    }
    else if (!isQueried) {
      getStatus().then(response => {
        setQueried(true);
        if (!Object.prototype.hasOwnProperty.call(response, 'errors')) {
          setStatus(response.data.status);
          setLoaded(true);
        }
      })
    }
  });

  const Login = async (query, variables) => await dataFetch({ query, variables });

  const loginWithGoogle = e => {
    const variables = { accessToken: e.accessToken };
    Login(GAuthLogin, variables).then(response => {
      if (!Object.prototype.hasOwnProperty.call(response, 'errors')) {
        cookies.set('token', response.data.socialAuth.token, { path: '/' });
        cookies.set('username', response.data.socialAuth.user.username, { path: '/' });
        router.push('/');
      } else {
        setAuthFail(true);
        setErrorMessage('Login has failed');
        setLoading(false);
      }
    });
  };

  const GoogleLoginCard = (<React.Fragment>
    <div>
      {
        status.googleSignIn ? (
          <GoogleLogin
            clientId="52577678569-df641phbibq12eacs451euh14lbpgvl6.apps.googleusercontent.com"
            onSuccess={loginWithGoogle}
            icon={true}
            cookiePolicy={'single_host_origin'}
            className="login-button-google"
            children={<div>Login with Google</div>}
          />
        ) : null
      }
    </div>

  </React.Fragment>);

  return !isLoading && isLoaded ? (
    <Base>
      {authFail ? errorMessage : null}
      <div style={{height:"80vh"}} className="d-flex align-items-center justify-content-center p-3">
        <Card className="shadow card-shadow" title="Authorization Required" style={{ width: 400 }}>
          <p>To use Pratilipi you need to connect it to your Google account. This Process
          is secure and your password will not be given to Pratilipi
          </p>
          {GoogleLoginCard}
        </Card>
      </div>
    </Base>
  ) : <Loading text={setQueried ? "We are logging you in. Please wait" : "Opening Login Page"}/>
}

export default LoginPage;
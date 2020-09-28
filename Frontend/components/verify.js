import React, {useEffect, useState} from "react";
import Cookies from "universal-cookie";
import {useRouter} from "next/router";
import Loading from "./loading";
import dataFetch from "../utils/dataFetch";
import moment from "moment";

const cookies = new Cookies();

const Verify = ({ children }) => {
    const router = useRouter();
    const [hasVerified, setVerified] = useState(false);

    const Mutation = `mutation verifyToken($token: String!){
      verifyToken(token:$token)
      {
        payload
      }
    }`;

    const verifyToken = async variables => await dataFetch({ query: Mutation, variables });

    useEffect(() => {
        if(!hasVerified)
        {
            const token = cookies.get('token');
            if (token == null) {
                router.push('/login');
            }
            else
            {
                verifyToken({ token }).then(  response => {
                    if (!Object.prototype.hasOwnProperty.call(response, 'errors')) {
                        if(moment().unix() > response.data.verifyToken.payload.exp){
                            router.push('/logout');
                        }
                        setVerified(true);
                    }
                    else {
                        router.push('/logout');
                    }
                })
            }
        }
    });

    return <div>
        { hasVerified ? children : <Loading text="Checking if you have permissions"/>}
    </div>

};
export default Verify;
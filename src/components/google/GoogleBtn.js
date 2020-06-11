import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import {GoogleLogin, } from 'react-google-login';

const CLIENT_ID = '608950634863-oocf4589motggau92gukloto2l01fgha.apps.googleusercontent.com'

const responseGoogle = res => {
    console.log('Failure', res)
}

const GoogleBtn = () => {
    const [creds, setCreds] = useState({
        gId: '',        
        email: '',
        firstName: '',
        lastName: '',
    })

    const [auth, setAuth] = useState({
        accessToken: '',
        idToken: ''
    })

    const handleLogin = res => {
        setCreds({
            ...creds,
            gId: res.googleId,
            email: res.profileObj.email,
            firstName: res.profileObj.givenName,
            lastName: res.profileObj.familyName
        });
        setAuth({
            ...auth,
            accessToken: res.access_token,
            idToken: res.id_token
        })
        console.log(res)
    };

    return (
        <div className='googleBtn'>
            <GoogleLogin 
            clientId={CLIENT_ID}
            buttonText='Sign in with Google'
            onSuccess={handleLogin}
            onFailure={responseGoogle}
            isSignedIn={true}
            responseType='code,token'
            />
        </div>
    )
}

export default GoogleBtn;
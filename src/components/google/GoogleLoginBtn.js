import React from 'react';
import {GoogleLogin, } from 'react-google-login';
import axios from 'axios';
import { shouldUpdateLoggedInUser } from '../../actions/settingsActions';
import { useDispatch } from 'react-redux';
import { useHistory} from "react-router-dom";

const clientID = `608950634863-oocf4589motggau92gukloto2l01fgha.apps.googleusercontent.com`

const GoogleLoginBtn = () => {
    const dispatch = useDispatch();
    const history = useHistory();

    const handleLogin = res => {
        console.log("google", res)
        const newProfile = {
            google_id: res.profileObj.googleId,
            first_name: res.profileObj.givenName,
            last_name: res.profileObj.familyName,
            email: res.profileObj.email,
            type: "google"
        };
        axios.post('https://cors-anywhere.herokuapp.com/http://tallyai.us-east-1.elasticbeanstalk.com/api/google/login', newProfile)
            .then(res => {
                localStorage.setItem('token', res.data.token)
                localStorage.setItem('userID', res.data.id)
                dispatch(shouldUpdateLoggedInUser(true));
                history.push("/Dashboard")
            })
            .catch(err => {
                console.log('Error Signing In with Google: ', err);
            });
    };

    const handleError = res => {
        console.log('Problem Signing in with Google: ', res)
    };

    return (
        <div className='googleBtn'>
            <GoogleLogin 
            clientId={clientID}
            buttonText='Sign in with Google'
            onSuccess={handleLogin}
            onFailure={handleError}
            responseType='code,token'
            />
        </div>
    )
}

export default GoogleLoginBtn;
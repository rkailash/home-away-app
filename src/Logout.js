import cookie from 'react-cookies';
import React from 'react';
import { Redirect } from 'react-router-dom';
import axios from 'axios';

const Logout = ({setUserInfo}) => {
    axios.get('http://localhost:3001/Logout').then(response => {
        if (response.status === 200) {
            cookie.remove("user_cookie");
            setUserInfo(undefined);
        } else {
            console.log("Logout unsuccessful!");
        }
    });
    return (
        <Redirect to="/" />
    );
};

export default Logout;
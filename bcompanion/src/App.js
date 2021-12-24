import React, {useEffect, useState} from 'react';
import './App.css';
import Dashboard from "./components/Dashboard";
import {BrowserRouter} from "react-router-dom";
import axios from "axios";

function App() {
    let url = window.location.href;
    let params = (new URL(url)).searchParams;
    let userPhoneNum = encodeURIComponent(params.get('phoneNum'));
    if (userPhoneNum === null){

    } else {
        localStorage.setItem('phoneNum', userPhoneNum);
    }
    const [userToken, setUserToken] = useState(null);

    const getUserToken = async () => {
        try {
            if (!(userPhoneNum)){
                console.log("userPhoneNum is null");
            } else if (userPhoneNum) {
                if (localStorage.getItem('token') === null || localStorage.getItem('phoneNum') === null) {

                    const data = await axios
                        .get(`https://stormy-escarpment-89406.herokuapp.com/users/getToken?phone_number=${localStorage.getItem('phoneNum')}`)
                        .then(response => {
                            localStorage.setItem('token', JSON.stringify(response.data));
                            localStorage.setItem('phoneNum', userPhoneNum);
                        })
                        .catch(function (error) {
                            console.log('No such user! Error in getting token!');
                        });
                } else if ((localStorage.getItem('phoneNum')) && localStorage.getItem('phoneNum') !== userPhoneNum){
                    localStorage.clear();
                    const data = await axios
                        .get(`https://stormy-escarpment-89406.herokuapp.com/users/getToken?phone_number=${localStorage.getItem('phoneNum')}`)
                        .then(response => {
                            localStorage.setItem('token', JSON.stringify(response.data));
                            localStorage.setItem('phoneNum', userPhoneNum);
                        })
                        .catch(function (error) {
                            console.log('No such user! Error in getting token!');
                        });
                }
            }

        } catch (e) {
            console.log(e);
        }
    }
    const [groupsByUser, setGroupsByUser] = useState([]);



    useEffect(() => {
        getUserToken();
        console.log("User is logged in: " + localStorage.getItem('token'));
    }, userToken, groupsByUser);

    return (
        <BrowserRouter>
            <div>
                <Dashboard/>
            </div>
        </BrowserRouter>
    );
}

export default App;

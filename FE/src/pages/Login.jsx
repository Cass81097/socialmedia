import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import withModal from "../components/common/Modal";
import { AuthContext } from "../context/AuthContext";
import "../styles/buttonGoogle.css";
import "../index.css";
import Register from "./Register";
import axios from "axios";
import jwt_decode from "jwt-decode";
import shortid from 'shortid';
import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth';
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import { baseUrl, getRequest, postRequest } from "../utils/services";

// Configure Firebase.
const config = {
    apiKey: 'AIzaSyCL3O9BGfk4euj7WtltUSoS49lBC8kwJ5w',
    authDomain: 'chat-app-cbb55.firebaseapp.com',
};
firebase.initializeApp(config);

const uiConfig = {
    signInFlow: 'popup',
    signInOptions: [firebase.auth.GoogleAuthProvider.PROVIDER_ID],
    callbacks: {
        // Avoid redirects after sign-in.
        signInSuccessWithAuthResult: () => false,
    },
};

function changeBackground(imageUrl) {
    document.body.style.backgroundImage = imageUrl;
}
changeBackground("https://i.ibb.co/m9YsjR8/Untitled.png");

const Login = (props) => {
    const navigate = useNavigate();
    const { toggleModal } = props;
    const { user, loginInfo, loginUser, loginError, updateLoginInfo, isLoginLoading } = useContext(AuthContext)
    // Login with Email
    const [isSignedIn, setIsSignedIn] = useState(false);

    useEffect(() => {
        const unregisterAuthObserver = firebase.auth().onAuthStateChanged(user => {
            setIsSignedIn(!!user);
            if (user) {
                handleGetToken(user);
            }
        });
        return () => unregisterAuthObserver();
    }, []);

    const handleGetToken = async (user) => {
        try {
            const email = user.email;
            console.log(email, "email");
            const existingUser = await checkIfUserExists(email);
            console.log(existingUser);

            if (existingUser) {
                const { email } = existingUser;
                const loginData = { email, password: email };
                console.log(loginData, 'Login Data');
                const resLogin = await axios.post(`${baseUrl}/users/login`, loginData);
                console.log(resLogin);
                // const token = resLogin.data;
                // localStorage.setItem('token', token);    
                // const decodedToken = jwt_decode(token);
                // const userId = decodedToken.idUser;
                // localStorage.setItem('userId', userId);
                // axios.defaults.headers.common['Authorization'] = 'Bearer ' + localStorage.getItem('token');
                // navigate('/home');   
            } else {
                // const hashedToken = shortid.generate();
                // console.log(hashedToken);
                const username = email.split("@")[0]; // Extract the username part before the @ symbol
                const data = {
                    username: username,
                    password: email,
                    avatar: '../assets/images/avatar-default.jpg',
                    email,
                    fullname: username,
                };

                const res = await axios.post(`${baseUrl}/users/register`, data);
                console.log('Registration response:', res.data);

                const resLogin = await axios.post(`${baseUrl}/users/login`, data);
                console.log(resLogin);
                // const token = resLogin.data;
                // localStorage.setItem('token', token);
                // const decodedToken = jwt_decode(token);
                // const userId = decodedToken.idUser;
                // console.log('User ID:', userId);
                // localStorage.setItem('userId', userId);
                // axios.defaults.headers.common['Authorization'] = 'Bearer ' + localStorage.getItem('token');
                // navigate('/home');
            }
        } catch (error) {
            console.error('Error during registration:', error);
        }
    };

    const checkIfUserExists = async (email) => {
        try {
            const res = await axios.get(`${baseUrl}/users/find/email/${email}`);
            const user = res.data[0];
            return user;
        } catch (error) {
            console.error('Error checking user existence:', error);
            return null;
        }
    };

    useEffect(() => {
        if (loginError) {
            toast.error(loginError, toastOptions);
        }
    }, [loginError]);

    const toastOptions = {
        position: "bottom-right",
        autoClose: 8000,
        pauseOnHover: true,
        draggable: true,
        theme: "dark",
    };

    const handleValidation = () => {
        const { password, email } = loginInfo;
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (password === "" || email === "") {
            toast.error("Please input all options.", toastOptions);
            return false;
        } else if (email.length < 3) {
            toast.error("Email should be greater than 3 characters.", toastOptions);
            return false;
        } else if (!emailRegex.test(email)) { // Check if email format is valid
            toast.error("Please enter a valid email address.", toastOptions);
            return false;
        } else if (password.length < 6) {
            toast.error("Password should be equal or greater than 6 characters.", toastOptions);
            return false;
        }
        return true;
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        if (handleValidation()) {
            loginUser();
        }
    };

    const handleSignOut = () => {
        firebase.auth().signOut();
        localStorage.clear();
    };

    if (!isSignedIn) {
        return (
            <>
                <form onSubmit={handleSubmit}>
                    <div className="login__container">
                        <div className="login__welcome">
                            <div className="login__logo">
                                <img style={{ width: 600, height: 50 }} src='https://i.ibb.co/TvdSv6z/Untitled-1-removebg-preview.png' alt='logo' />
                            </div>
                            <p>Connect with your <span style={{ color: "#9400D3", fontWeight: 'bold' }}>Friends </span><span style={{ color: "FF7F00", fontWeight: 'bold' }}>and </span><span style={{ color: "#404EED", fontWeight: 'bold' }}>Family </span>!</p>
                        </div>
                        <div className="login__form-container">
                            <div className="login__form">
                                <input
                                    type="text"
                                    placeholder="Email"
                                    onChange={(e) => updateLoginInfo({ email: e.target.value })}
                                />
                                <input type="password" placeholder="Password" onChange={(e) => updateLoginInfo({ password: e.target.value })} />
                                <button type="submit" className="login__submit-btn">
                                    {isLoginLoading ? "Login..." : "Login"}
                                </button>
                                <StyledFirebaseAuth uiConfig={uiConfig} firebaseAuth={firebase.auth()} />
                                <span className="login__signup" onClick={() => toggleModal(true)}><span style={{ cursor: "pointer" }}>Create a new account</span></span>
                            </div>
                        </div>
                    </div>
                </form>
                <ToastContainer />
            </>
        );
    }
    return (
        <div>
            <h1>My App</h1>
            <p>Welcome {firebase.auth().currentUser.displayName}! You are now signed-in!</p>
            <button onClick={handleSignOut}>Sign-out</button>
        </div>
    );
}

export default withModal(Register)(Login);

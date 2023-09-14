import React, { useContext, useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
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
import Navbar from "../components/profile/Navbar";


const Home = (props) => {
    const navigate = useNavigate();
    const { toggleModal } = props;
    const { user, loginFinish } = useContext(AuthContext)

    const toastOptions = {
        position: "top-center",
        autoClose: 8000,
        pauseOnHover: true,
        draggable: true,
        theme: "dark",
    };

    useEffect(() => {
        if (loginFinish) {
            toast.success("Đăng nhập thành công !", toastOptions);
        }
    }, [loginFinish]);


    return (
        <>
            <Navbar></Navbar>
            <ToastContainer />
        </>

    );
}

export default Home;

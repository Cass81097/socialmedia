import React, { createContext, useCallback, useEffect, useState, useContext } from "react";
import { baseUrl, getRequest, postRequest } from "../utils/services";
import { CometChatContext } from "./CometChatContext";
// import { useNavigate } from "react-router-dom";

export const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
    const [allUser, setAllUser] = useState(null);

    useEffect(() => {
        const fetchAllUsers = async () => {
            try {
                const response = await getRequest(`${baseUrl}/users/username`);
                setAllUser(response); // Assuming the response contains a "data" property with the user array
            } catch (error) {
                console.error("Error fetching all users:", error);
            }
        };

        fetchAllUsers();
    }, []);

    const { cometChat, setIsLoading } = useContext(CometChatContext);

    const generateAvatar = () => {
        const avatars = [
            'https://data-us.cometchat.io/assets/images/avatars/captainamerica.png',
            'https://data-us.cometchat.io/assets/images/avatars/cyclops.png',
            'https://data-us.cometchat.io/assets/images/avatars/ironman.png',
            'https://data-us.cometchat.io/assets/images/avatars/spiderman.png',
            'https://data-us.cometchat.io/assets/images/avatars/wolverine.png'
        ];
        const avatarPosition = Math.floor(Math.random() * avatars.length);
        return avatars[avatarPosition];
    };

    // const createCometChatAccount = ({ userUuid, fullname, userAvatar }) => {
    //     const authKey = `${process.env.REACT_APP_COMETCHAT_AUTH_KEY}`;
    //     const user = new cometChat.User(userUuid);
    //     console.log(user);
    //     user.setName(fullname);
    //     user.setAvatar(userAvatar);
    //     cometChat.createUser(user, authKey).then(
    //         user => {
    //             setIsLoading(false);
    //         }, error => {
    //             setIsLoading(false);
    //         }
    //     )
    // };

    const [user, setUser] = useState(null);
    const [registerError, setRegisterError] = useState(null);
    const [isRegisterLoading, setIsRegisterLoading] = useState(false);
    const [registerInfo, setRegisterInfo] = useState({
        fullname: "",
        username: "",
        email: "",
        password: "",
    });

    const [loginError, setLoginError] = useState(null);
    const [isLoginLoading, setIsLoginLoading] = useState(false);
    const [loginInfo, setLoginInfo] = useState(
        {
            email: "",
            password: ""
        });

    // console.log("User", user);
    // console.log("Login", loginInfo);

    useEffect(() => {
        const user = localStorage.getItem("User")
        setUser(JSON.parse(user));
    }, [])

    const updateRegisterInfo = useCallback((info) => {
        setRegisterInfo((prevInfo) => ({
            ...prevInfo,
            ...info,
        }));
    }, []);

    const updateLoginInfo = useCallback((info) => {
        setLoginInfo((prevInfo) => ({
            ...prevInfo,
            ...info,
        }));
    }, []);

    const registerUser = useCallback(async () => {
        console.log("Dang ky thanh cong");

        setIsRegisterLoading(true);
        setRegisterError(null)

        const avatar = generateAvatar(); // Generate the avatar synchronously
        const username = registerInfo.email.split("@")[0]; // Extract the username part before the @ symbol

        const registerInfoWithAvatar = { ...registerInfo, avatar, username: username };

        const response = await postRequest(`${baseUrl}/users/register`, JSON.stringify(registerInfoWithAvatar))

        if (response.error) {
            return setRegisterError(response);
        }

        setIsRegisterLoading(false);

        // const userId = response.userId.toString(); // Convert userId to a string
        // createCometChatAccount({
        //     userUuid: userId,
        //     fullname: registerInfo.username,
        //     userAvatar: registerInfo.avatar,
        // });

        setUser(response)
    }, [registerInfo])

    const loginUser = useCallback(async () => {

        setIsLoginLoading(true);
        setLoginError(null);

        const response = await postRequest(`${baseUrl}/users/login`, JSON.stringify(loginInfo));

        if (response.error) {
            setLoginError(response.error);
            return;
        }

        if (response.msg === "Invalid email or password") {
            setLoginError("Invalid email or password");
            return;
        }

        setIsLoginLoading(false);
        localStorage.setItem("User", JSON.stringify(response));
        setUser(response);
    }, [loginInfo]);

    const logOutUser = useCallback((info) => {
        localStorage.removeItem("User")
        setUser(null);
    }, [])

    return (
        <AuthContext.Provider value={{ user, registerInfo, registerUser, updateRegisterInfo, registerError, isRegisterLoading, logOutUser, loginUser, loginError, loginInfo, updateLoginInfo, isLoginLoading, allUser }}>
            {children}
        </AuthContext.Provider>
    );
};
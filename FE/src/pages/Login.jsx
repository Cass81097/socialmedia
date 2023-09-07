import React, { useContext, useEffect } from "react";
import "react-toastify/dist/ReactToastify.css";
import withModal from "../components/common/Modal";
import { AuthContext } from "../context/AuthContext";
import Register from "./Register";
import { ToastContainer, toast } from "react-toastify";

function changeBackground(imageUrl) {
    document.body.style.backgroundImage = imageUrl;
}
changeBackground("https://i.ibb.co/m9YsjR8/Untitled.png");

const Login = (props) => {
    const { toggleModal } = props;
    const { user, loginInfo, loginUser, loginError, updateLoginInfo, isLoginLoading } = useContext(AuthContext)

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
                            <span className="login__signup" onClick={() => toggleModal(true)}>Create a new account</span>
                        </div>
                    </div>
                </div>
            </form>
            <ToastContainer />
        </>
    );
}

export default withModal(Register)(Login);

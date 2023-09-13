import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { AuthContext } from "../context/AuthContext";

export default function Register(props) {
    const { toggleModal } = props;
    const { registerInfo, registerUser, updateRegisterInfo, isRegisterLoading } = useContext(AuthContext);
    const navigate = useNavigate();

    const toastOptions = {
        position: "bottom-right",
        autoClose: 8000,
        pauseOnHover: true,
        draggable: true,
        theme: "dark",
    };

    const handleValidation = () => {
        const { fullname, email, password, passwordConfirm, id, username } = registerInfo;
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (password === "" || fullname === "" || email === "" || passwordConfirm === "") {
            toast.error("Please input all options.", toastOptions);
            return false;
        } else if (fullname.length < 3) {
            toast.error("Fullname should be greater than 3 characters.", toastOptions);
            return false;
        } else if (!emailRegex.test(email)) { // Check if email format is valid
            toast.error("Please enter a valid email address.", toastOptions);
            return false;
        } else if (password.length < 6 || passwordConfirm < 6) {
            toast.error("Password should be equal or greater than 6 characters.", toastOptions);
            return false;
        } else if (password !== passwordConfirm) {
            toast.error("Password must be the same.", toastOptions);
            return false;
        }
        return true;
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        if (handleValidation()) {
            await registerUser();
            toggleModal(false);
            navigate('/login')
        }
    };

    return (
        <>
            <form onSubmit={handleSubmit}>
                <div className="signup">
                    <div className="signup__content">
                        <div className="signup__container">
                            <div className="signup__title">Sign Up</div>
                            <div className="signup__close"
                                onClick={() => toggleModal(false)}>
                                <i className="far fa-times-circle" style={{ cursor: "pointer", fontSize: "20px" }}></i>
                            </div>
                        </div>
                        <div className="signup__subtitle"></div>
                        <div className="signup__form">
                            <input type="text" placeholder="Fullname" onChange={(e) => updateRegisterInfo({ fullname: e.target.value })} />
                            <input type="text" placeholder="Email" onChange={(e) => updateRegisterInfo({ email: e.target.value })} />
                            <input type="password" placeholder="Password" onChange={(e) => updateRegisterInfo({ password: e.target.value })} />
                            {/* <input type="username" placeholder="username" onChange={(e) => updateRegisterInfo({ username: e.target.value })} /> */}
                            <input
                                type="password"
                                placeholder="Confirm Password"
                                onChange={(e) => updateRegisterInfo({ passwordConfirm: e.target.value })}
                            />
                            <button className="signup__btn">
                                {isRegisterLoading ? "Creating your account" : "Register"}
                            </button>
                        </div>
                    </div>
                </div>
            </form>
            <ToastContainer />
        </>
    );
}


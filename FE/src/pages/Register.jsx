import { useRef } from "react";

export default function Register(props) {
    const { toggleModal } = props;

    const fullnameRef = useRef(null);
    const emailRef = useRef(null);
    const passwordRef = useRef(null);
    const confirmPasswordRef = useRef(null);

    return (
        <div className="signup">
            <div className="signup__content">
                <div className="signup__container">
                    <div className="signup__title">Sign Up</div>
                    <div className="signup__close"
                        onClick={() => toggleModal(false)}>
                        <i class="far fa-times-circle" style={{cursor:"pointer", fontSize:"20px"}}></i>
                    </div>
                </div>
                <div className="signup__subtitle"></div>
                <div className="signup__form">
                    <input type="text" placeholder="Fullname" ref={fullnameRef} />
                    <input type="text" placeholder="Email" ref={emailRef} />
                    <input type="password" placeholder="Password" ref={passwordRef} />
                    <input
                        type="password"
                        placeholder="Confirm Password"
                        ref={confirmPasswordRef}
                    />
                    <button className="signup__btn">
                        Sign Up
                    </button>
                </div>
            </div>
        </div>
    );
}


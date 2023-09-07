import withModal from "../components/common/Modal";
import Register from "./Register";

function changeBackground(imageUrl) {
    document.body.style.backgroundImage = imageUrl;
}
changeBackground("https://i.ibb.co/m9YsjR8/Untitled.png");

const Login = (props) => {
    const { toggleModal } = props;

    return (
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
                    />
                    <input type="password" placeholder="Password"/>
                    <button className="login__submit-btn">
                        Connect!
                    </button>
                    <span className="login__signup" onClick={() => toggleModal(true)}>Create a new account</span>
                </div>
            </div>
        </div>
    );
}

export default withModal(Register)(Login);

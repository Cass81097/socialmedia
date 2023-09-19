import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import $ from 'jquery';
import React, {useContext, useEffect, useState} from "react";
import { Link, useNavigate } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import { AuthContext } from "../../context/AuthContext";
import { ProfileContext } from "../../context/ProfileContext";
import { SearchBar } from "../search/SearchBar";
import { SearchResultsList } from "../search/SearchResultsList";

export default function Navbar(props) {
    const { user } = useContext(AuthContext);
    const { setUserProfile } = useContext(ProfileContext);
    const [results, setResults] = useState([]);

    const navigate = useNavigate();
    //hiện thông báo
    const [down, setDown] = useState(false);

    const toggleNotifi = () => {
        if (down) {
            setDown(false);
        } else {
            setDown(true);
        }
    };
    const boxStyle = {
        height: down ? 'auto' : '0px',
        maxHeight: '650px',
        opacity: down ? 1 : 0
    };

    const [notifications, setNotifications] = useState([]);

    useEffect( () => {
        if (props.userRequest && Object.keys(props.userRequest).length !== 0) {
            setNotifications((prevNotifications) => [props.userRequest,...prevNotifications]);
        }
    }, [props.userRequest]);
    //
    console.log(props.userRequest,11111111111)
    //kết thúc hiện thông báo
    const showInfo = () => {
        $('.profile-menu').toggle();
    };

    const logout = async () => {
        try {
            await firebase.auth().signOut();
            navigate("/")
            window.location.reload();
            localStorage.clear();
        } catch (error) {
            console.error("Error :", error);
        }
    };

    const goUserInfo = (res) => {
        const currentDomain = window.location.pathname.split("/")[1];
        if (`/${user?.username}` !== `/${currentDomain}`) {
            navigate(`/${user?.username}`);
            setUserProfile(res)
            $('.profile-menu').hide();
        } else {
            $('.profile-menu').hide();
        };
    };

    const clearSearchResult = () => {
        setResults([]);
    }

    return (
        <>
            <header>
                <div className="fb-nav">
                    <div className="title">
                        <Link to={"/"}>F4kebook</Link>
                    </div>
                    <div className="search-box">
                        <SearchBar setResults={setResults} results={results} clearSearchResult={clearSearchResult} />
                        <SearchResultsList results={results} clearSearchResult={clearSearchResult} />
                    </div>
                    <div className="home-media">
                        <div className="social-media">
                            <Link
                                to=""
                                data-toggle="tooltip"
                                data-placement="bottom"
                                title="Messenger"
                            style={{ transform: "translateY(7px)" }}
                            >
                                <i className="fab fa-facebook-messenger"></i>
                            </Link>
                            <Link
                                to=""
                                data-toggle="tooltip"
                                data-placement="bottom"
                                title="Thông báo"
                            style={{ transform: "translateY(7px)" }}
                            >
                                <i className="fas fa-bell"  onClick={toggleNotifi}></i>
                            </Link>
                            {/*hiện thông báo */}
                            <div className="notifi-box" id="box" style={boxStyle}>
                                <div className="content11">
                                    <div style={{display: "flex", justifyContent: "space-between"}}>
                                        <h2>
                                            Thông Báo
                                        </h2>
                                        <button type="button" className="btn btn-light "
                                                style={{borderRadius: "50%", height: "40px", width: "40px"}}>
                                            <i className="fas fa-ellipsis-h"></i>
                                        </button>

                                    </div>
                                    <div style={{display: "flex"}}>
                                        <button type="button" className="btn btn-outline-primary"
                                                style={{
                                                    borderRadius: "20px",
                                                    marginLeft: "10px",
                                                    fontWeight: "bold"
                                                }}>Tất cả
                                        </button>
                                        <button type="button" className="btn btn-light "
                                                style={{borderRadius: "20px", marginLeft: "10px", fontWeight: "bold"}}>
                                            Chưa đọc
                                        </button>
                                    </div>
                                    <div style={{
                                        display: "flex",
                                        justifyContent: "space-between",
                                        marginLeft: "10px",
                                        marginTop: "10px",
                                        alignItems: "end"
                                    }}>
                                        <h5> Trước đó </h5>
                                        <button type="button" className="btn btn-light "
                                                style={{color: "#1877F2", fontWeight: "bold"}}>Xem tất cả
                                        </button>

                                    </div>
                                    {notifications.length >=0? ( notifications.map((item, index) =>

                                            (
                                                <div className="notifi-item" key={index}>
                                                    <div>
                                                        <div className="item-image">
                                                            <img src={item.avatar} alt="img"/>
                                                            <div className="icon-avatar">
                                                                {/*<i className="fas fa-camera"></i>*/}
                                                                <i className="fas fa-user-friends"></i>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="text">
                                                        <h4>
                                                            {item.fullname}
                                                            <span>
                                                             {item.userAccepted ? "đã đồng ý" : "vừa mới gửi"} lời mời kết bạn
                                                                                           </span>
                                                        </h4>
                                                        <p>vài giây trước</p>
                                                    </div>
                                                    <div className="icon-read"></div>
                                                </div>
                                            )))
                                        : (
                                            // Hiển thị khi mảng notifications rỗng
                                            <div>No notifications</div>
                                        )}

                                    <div className="notifi-item">
                                        <div>

                                            <div className="item-image">
                                                <img
                                                    src="https://static.wixstatic.com/media/9d8ed5_9f2c1e89d4b546968fb7e6589b9585f7~mv2.jpg/v1/fit/w_750,h_470,al_c,q_20,enc_auto/file.jpg"
                                                    alt="img"/>

                                                <div className="icon-avatar" style={{background:"red"}}>
                                                    <i className="fas fa-birthday-cake"></i>
                                                </div>
                                            </div>

                                        </div>
                                        <div className="text">

                                            <h4>Elias Abdurrahman<span>đã like ảnh của ban tu bốn ngày trước </span>
                                            </h4>
                                            <p>4 ngày trước</p>
                                        </div>
                                        <div className="icon-read"></div>
                                    </div>
                                    <div className="notifi-item">
                                        <div>

                                            <div className="item-image">
                                                <img
                                                    src="https://th.bing.com/th/id/OIP.Nia8NcZLgly5CjOqGkokZgHaJO?pid=ImgDet&rs=1"
                                                    alt="img"/>

                                                <div className="icon-avatar" style={{background:"lightblue"}}>
                                                    <i className="fas fa-camera"></i>
                                                </div>
                                            </div>

                                        </div>
                                        <div className="text">

                                            <h4>Elias Abdurrahman<span>đã like ảnh của ban tu bốn ngày trước </span>
                                            </h4>
                                            <p>4 ngày trước</p>
                                        </div>
                                        <div className="icon-read"></div>
                                    </div>
                                    <div className="notifi-item">
                                        <div>

                                            <div className="item-image">
                                                <img
                                                    src="https://upanh123.com/wp-content/uploads/2020/11/hinh-anh-con-meo-cute3.jpg"
                                                    alt="img"/>

                                                <div className="icon-avatar" style={{background: "lightgreen"}}>
                                                    <i className="far fa-sticky-note"></i>
                                                </div>
                                            </div>

                                        </div>
                                        <div className="text">

                                            <h4>Elias Abdurrahman<span>đã like ảnh của ban tu bốn ngày trước </span>
                                            </h4>
                                            <p>4 ngày trước</p>
                                        </div>
                                        <div className="icon-read"></div>
                                    </div>
                                    <div className="notifi-item">
                                        <div>

                                            <div className="item-image">
                                                <img
                                                    src="https://static.wixstatic.com/media/9d8ed5_9f2c1e89d4b546968fb7e6589b9585f7~mv2.jpg/v1/fit/w_750,h_470,al_c,q_20,enc_auto/file.jpg"
                                                    alt="img"/>

                                                <div className="icon-avatar" style={{background:"red"}}>
                                                    <i className="fas fa-birthday-cake"></i>
                                                </div>
                                            </div>

                                        </div>
                                        <div className="text">

                                            <h4>Elias Abdurrahman<span>đã like ảnh của ban tu bốn ngày trước </span>
                                            </h4>
                                            <p>5 ngày trước</p>
                                        </div>
                                        <div className="icon-read"></div>
                                    </div>
                                    <div className="notifi-item">
                                        <div>

                                            <div className="item-image">
                                                <img
                                                    src="https://th.bing.com/th/id/OIP.Nia8NcZLgly5CjOqGkokZgHaJO?pid=ImgDet&rs=1"
                                                    alt="img"/>

                                                <div className="icon-avatar" style={{background:"lightblue"}}>
                                                    <i className="fas fa-camera"></i>
                                                </div>
                                            </div>

                                        </div>
                                        <div className="text">

                                            <h4>Elias Abdurrahman<span>đã like ảnh của ban tu bốn ngày trước </span>
                                            </h4>
                                            <p>4 ngày trước</p>
                                        </div>
                                        <div className="icon-read"></div>
                                    </div>
                                    <div className="notifi-item">
                                        <div>

                                            <div className="item-image">
                                                <img
                                                    src="https://upanh123.com/wp-content/uploads/2020/11/hinh-anh-con-meo-cute3.jpg"
                                                    alt="img"/>

                                                <div className="icon-avatar" style={{background: "lightgreen"}}>
                                                    <i className="far fa-sticky-note"></i>
                                                </div>
                                            </div>

                                        </div>
                                        <div className="text">

                                            <h4>Elias Abdurrahman<span>đã like ảnh của ban tu bốn ngày trước </span>
                                            </h4>
                                            <p>4 ngày trước</p>
                                        </div>
                                        <div className="icon-read"></div>
                                    </div>
                                </div>
                            </div>

                            {/*kết thúc phần hiện*/}
                            <div className="avatar-nav" style={{ transform: "translateY(-7px)" }}>
                                <div
                                    className="avatar-navbar"
                                    data-toggle="tooltip"
                                    data-placement="bottom"
                                    title="Avatar"
                                >
                                    <img src={user?.avatar}  alt="Avatar" onClick={() => showInfo()} />
                                </div>
                                <ol className="profile-menu" style={{ display: "none" }}>
                                    <li onClick={goUserInfo}>Thông tin</li>
                                    <li data-toggle="modal" data-target="#myModal" onClick={() => logout()}>Đăng xuất</li>
                                </ol>
                            </div>    
                        </div>
                    </div>
                </div>
            </header>
        </>
    );
}

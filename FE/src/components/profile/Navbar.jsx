import React, { useContext, useState } from "react";
import { BiPowerOff } from "react-icons/bi";
import { Link, useNavigate } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import { AuthContext } from "../../context/AuthContext";
import styled from "styled-components";
import { SearchBar } from "../search/SearchBar"
import { SearchResultsList } from "../search/SearchResultsList"
import $ from 'jquery';

export default function Navbar() {
    const { user } = useContext(AuthContext);
    const [results, setResults] = useState([]);

    const navigate = useNavigate();

    const showInfo = () => {
        $('.profile-menu').toggle();
    };

    const logout = async () => {
        try {
            // await firebase.auth().signOut();
            localStorage.clear();
            navigate("/");
            window.location.reload();
        } catch (error) {
            console.error("Error :", error);
        }
    };

    const goUserInfo = async () => {
        try {
            navigate('/user');
        } catch (error) {
            console.error("Error :", error);
        }
    };

    return (
        <>
            <header>
                <div className="fb-nav">
                    <div className="title">
                        <Link to={"/"}>F4kebook</Link>
                    </div>
                    {/* <div className="search-box">
                        <i className="fas fa-search icon-search" />
                        <input
                            id="search-card"
                            type="search"
                            placeholder="Tìm kiếm trên F4kebook"
                        />
                    </div> */}
                    <div className="search-box">
                        <SearchBar setResults={setResults} results={results} />
                        {results && results.length > 0 && <SearchResultsList results={results} />}
                    </div>
                    <div className="home-media">
                        <div className="social-media">
                            <Link
                                to=""
                                data-toggle="tooltip"
                                data-placement="bottom"
                                title="Messenger"
                                style={{ transform: "translateY(-7px)" }}
                            >
                                <i className="fab fa-facebook-messenger"></i>
                            </Link>
                            <Link
                                to=""
                                data-toggle="tooltip"
                                data-placement="bottom"
                                title="Thông báo"
                                style={{ transform: "translateY(-7px)" }}
                            >
                                <i className="fas fa-bell"></i>
                            </Link>
                            <Link
                                // to={`/${user.username}`}
                                to=""
                                data-toggle="tooltip"
                                data-placement="bottom"
                                title="Avatar"
                            >
                                <img src={user.avatar} style={{ width: "40px", height: "40px" }} alt="Avatar" onClick={() => showInfo()} />
                                <ol className="profile-menu" style={{ display: "none" }}>
                                    <li onClick={goUserInfo}>Thông tin</li>
                                    <li data-toggle="modal" data-target="#myModal" onClick={() => logout()}>Đăng xuất</li>
                                </ol>
                            </Link>
                            {/* <Link
                                to=""
                                data-toggle="tooltip"
                                data-placement="bottom"
                                title="LogOut"
                                style={{ transform: "translateY(-9px)" }}
                            >
                                <Button onClick={handleClick}>
                                    <BiPowerOff />
                                </Button>
                            </Link> */}

                        </div>

                        {/* <div className="ava">
                            <a href="">
                                <i
                                    className="bx avatar online"
                                    data-toggle="tooltip"
                                    data-placement="bottom"
                                    title="Tài khoản"
                                    // avatar header
                                    style={{
                                        backgroundImage:
                                            "url(https://data-us.cometchat.io/assets/images/avatars/ironman.png)",
                                    }}
                                />
                            </a>
                        </div> */}
                    </div>
                </div>
            </header>
        </>
    );
}

const Button = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0.5rem;
  border-radius: 0.5rem;
  background-color: #9a86f3;
  border: none;
  cursor: pointer;
  svg {
    font-size: 1.3rem;
    color: #ebe7ff;
  }
`;
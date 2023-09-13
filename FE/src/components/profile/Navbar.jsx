import React, { useContext, useState } from "react";
import { BiPowerOff } from "react-icons/bi";
import { Link, useNavigate } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import { AuthContext } from "../../context/AuthContext";
import { ProfileContext } from "../../context/ProfileContext";
import styled from "styled-components";
import { SearchBar } from "../search/SearchBar"
import { SearchResultsList } from "../search/SearchResultsList"
import $ from 'jquery';

export default function Navbar() {
    const { user } = useContext(AuthContext);
    const { setUserProfile } = useContext(ProfileContext);
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

    const goUserInfo = (res) => {
        const currentDomain = window.location.pathname.split("/")[1];
        if (`/${user?.username}` !== `/${currentDomain}`) {
            navigate(`/${user?.username}`);
            setUserProfile(res)
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
                    {/* <div className="search-box">
                        <i className="fas fa-search icon-search" />
                        <input
                            id="search-card"
                            type="search"
                            placeholder="Tìm kiếm trên F4kebook"
                        />
                    </div> */}
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
                                <i className="fas fa-bell"></i>
                            </Link>

                            <div className="avatar-nav" style={{ transform: "translateY(-6px)" }}>
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
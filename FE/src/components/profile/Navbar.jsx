import React, { useContext } from "react";
import { BiPowerOff } from "react-icons/bi";
import { Link, useNavigate } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import { AuthContext } from "../../context/AuthContext";
import styled from "styled-components";

export default function Navbar() {
    const { user } = useContext(AuthContext);
    const navigate = useNavigate();
    const handleClick = () => {
      localStorage.clear();
      navigate("/");
    };

    return (
        <>
            <header>
                <div className="fb-nav">
                    <div className="title">
                        <Link to={"/"}>F4kebook</Link>
                    </div>
                    <div className="search-box">
                        <i className="fas fa-search icon-search" />
                        <input
                            id="search-card"
                            type="search"
                            placeholder="Tìm kiếm trên F4kebook"
                        />
                    </div>
                    <div className="home-media">
                        <div className="social-media">
                            <a
                                href=""
                                data-toggle="tooltip"
                                data-placement="bottom"
                                title="Messenger"
                                style={{ transform: "translateY(-7px)" }}
                            >
                                <i className="fab fa-facebook-messenger"></i>
                            </a>
                            <a
                                href=""
                                data-toggle="tooltip"
                                data-placement="bottom"
                                title="Thông báo"
                                style={{ transform: "translateY(-7px)" }}
                            >
                                <i className="fas fa-bell"></i>
                            </a>
                            <a
                                href=""
                                data-toggle="tooltip"
                                data-placement="bottom"
                                title="Avatar"
                            >
                                <img src={user.avatar} style={{ width: "40px", height: "40px" }}></img>
                            </a>
                            <a
                                href=""
                                data-toggle="tooltip"
                                data-placement="bottom"
                                title="LogOut"
                                style={{ transform: "translateY(-9px)" }}
                            >
                                <Button onClick={handleClick}>
                                    <BiPowerOff />
                                </Button>
                            </a>

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
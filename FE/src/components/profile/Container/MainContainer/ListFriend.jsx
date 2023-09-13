import axios from "axios";
import React, { useContext, useEffect, useState } from 'react';
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../../../../context/AuthContext";
import { ProfileContext } from "../../../../context/ProfileContext";
import "../../../../styles/user/friend.css";
import { baseUrl, getRequest } from "../../../../utils/services";

export default function ListFriend() {
    const { userProfile, countFriend } = useContext(ProfileContext);
    const { user } = useContext(AuthContext);
    const navigate = useNavigate();
    const [listCommonFriend, setListCommonFriend] = useState([]);
    const [searchValue, setSearchValue] = useState('');
    const [filteredData, setFilteredData] = useState([]);

    console.log(countFriend);
    console.log(listCommonFriend);

    const goFriendProfile = (username) => {
        console.log(username);
        navigate(`/${username}`);
    };

    const handleInputChange = (event) => {
        const value = event.target.value;
        setSearchValue(value);

        const lowercaseValue = value.toLowerCase();
        const filtered = countFriend.filter(item => item.fullname.toLowerCase().includes(lowercaseValue));
        setFilteredData(filtered);
    };

    useEffect(() => {
        const findCommonFriend = async (index) => {
            try {
                const response = await getRequest(`${baseUrl}/friendShips/commonFriend/username/${userProfile[0].username}/${countFriend[index].username}`);
                setListCommonFriend(response);
            } catch (error) {
                console.log(error);
            }
        };

        for (let i = 0; i < countFriend.length; i++) {
            findCommonFriend(i);
        }
    }, [userProfile, countFriend]);

    return (
        <>
            <div className="container-fluid">
                <nav className="row navbar">
                    <div className="col-6">
                        <a className="navbar-brand" style={{ fontWeight: "700" }}>Bạn bè</a>
                    </div>
                    <div className="col-6 search-profile-friend">
                        <div className="form-inline" style={{ display: "flex" }}>
                            <div style={{
                                display: "flex",
                                outline: "none",
                                borderRadius: "50px",
                                fontSize: "16px",
                                backgroundColor: "rgba(255, 255,255, 0.5)"
                            }}>
                                <input value={searchValue} onChange={handleInputChange} className="form-control mr-sm-2"
                                    style={{
                                        outline: "none",
                                        border: "1px solid lightgrey",
                                    }} placeholder='Tìm kiếm bạn bè'
                                    aria-label="Search" />
                            </div>
                            <Link to="/listPendFriend"><button type="button" className="btn btn-link"><span style={{ fontWeight: "500" }}>Lời mời kết bạn</span></button></Link>

                        </div>

                    </div>
                </nav>
                <div className="friend-container">
                    {searchValue === '' ? (
                        countFriend.map(listFriend => (
                            <div className="friend-container-left" key={listFriend?.id}>
                                <div>
                                    <div className="friend-container-avatar">
                                        <div className="friend-avatar" onClick={() => goFriendProfile(listFriend?.username)}>
                                            <img src={listFriend?.avatar} alt="Avatar" />
                                        </div>
                                        <div className="friend-detail">
                                            <h6 onClick={() => goFriendProfile(listFriend?.username)}>{listFriend?.fullname}</h6>
                                            {listCommonFriend?.find(friend => friend.username === listFriend?.username) ? (
                                                <h6>{listCommonFriend?.length} bạn chung</h6>
                                            ) : (
                                                <h6>0 bạn chung</h6>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))
                    ) : (
                        filteredData.map(listFriend => (
                            <div className="friend-container-left" key={listFriend?.id}>
                                <div>
                                    <div className="friend-container-avatar">
                                        <div className="friend-avatar">
                                            <img src={listFriend?.avatar} alt="Avatar" />
                                        </div>
                                        <div className="friend-detail">
                                            <h6>{listFriend?.fullname}</h6>
                                            {listCommonFriend?.find(friend => friend.username === listFriend?.username) ? (
                                                <h6>{listCommonFriend?.length} bạn chung</h6>
                                            ) : (
                                                <h6>0 bạn chung</h6>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))
                    )}
                </div>
            </div>
        </>
    )
}
import axios from "axios";
import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from "../../../../context/AuthContext";
import { ProfileContext } from "../../../../context/ProfileContext";
import { baseUrl } from "../../../../utils/services";
import "../../../../styles/user/friend.css"
import { Link } from "react-router-dom";

export default function ListFriend() {
    const { userProfile } = useContext(ProfileContext);
    const { user } = useContext(AuthContext);
    const [listFriend, setListFriend] = useState([])
    const [searchValue, setSearchValue] = useState('');
    const [filteredData, setFilteredData] = useState([]);

    const filterListFriend = listFriend.filter(friend => friend.id !== user.id);

    // Hàm xử lý khi giá trị của ô input thay đổi
    const handleInputChange = (event) => {
        const value = event.target.value;
        setSearchValue(value);

        // Lọc danh sách dữ liệu dựa trên giá trị tìm kiếm
        const filtered = listFriend.filter(item => item.user2.username.includes(value));
        setFilteredData(filtered);
    };

    useEffect(() => {

        const findFriend = async () => {
            try {
                const response = await axios.get(`${baseUrl}/friendShips/listFriend/id/${userProfile[0]?.id}`);

                for (let i = 0; i < response.data.length; i++) {
                    const response1 = await axios.get(`${baseUrl}/friendShips/mutual-friends/${user?.id}/${response.data[i].id}`)
                    response.data[i] = { ...response.data[i], matualFriends: response1.data.length }
                }
                setListFriend(response.data);
            } catch (error) {
                console.log(error);
            }
        };
        findFriend();
    }, [user]);

    return (
        <>
            <div className="container-fluid" >
                <nav className="row navbar">
                    <div className="col-6">
                        <a className="navbar-brand" style={{ fontWeight: "700" }}>Bạn bè</a>
                    </div>
                    <div className="col-6">
                        <form className="form-inline" style={{ display: "flex" }}>
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

                        </form>

                    </div>
                </nav>
                <div className="friend-container">
                    {searchValue === '' ? (
                        filterListFriend.map(listFriend => (
                            <div className="friend-container-left" key={listFriend?.id}>
                                <div>
                                    <div className="friend-container-avatar">
                                        <div className="friend-avatar">
                                            <img src={listFriend?.avatar} alt="Avatar" />
                                        </div>
                                        <div className="friend-detail">
                                            <h6>{listFriend?.fullname}</h6>
                                            <h6>{listFriend?.matualFriends} bạn chung</h6>
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
                                            <h6>{listFriend?.matualFriends} bạn chung</h6>
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
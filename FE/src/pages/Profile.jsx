import React, { useEffect, useState, useContext } from "react";
import { BiPowerOff } from "react-icons/bi";
import { useLocation, useNavigate } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import styled from "styled-components";
import { baseUrl, getRequest, postRequest } from "../utils/services";
import { AuthContext } from "../context/AuthContext";

export default function Profile() {
  const { user } = useContext(AuthContext);
  const location = useLocation();
  const domain = location.pathname.split("/")[1];
  const username = domain || "";
  const [userProfiles, setUserProfiles] = useState([]);
  const [friendStatus, setFriendStatus] = useState(null); // Trạng thái của mối quan hệ bạn bè
  console.log(friendStatus?.status);

  useEffect(() => {
    const fetchUserProfiles = async () => {
      try {
        const response = await getRequest(`${baseUrl}/users/find/${username}`);
        setUserProfiles(response);
      } catch (error) {
        console.error("Error fetching user profiles:", error);
      }
    };

    fetchUserProfiles();
  }, []);

  useEffect(() => {
    const checkFriendStatus = async () => {
      try {
        const response = await getRequest(`${baseUrl}/friendships/checkStatusByUserId/${user.id}/${userProfiles[0]?.id}`);
        setFriendStatus(response);
      } catch (error) {
        console.error("Error checking friend status:", error);
      }
    };

    if (userProfiles.length > 0) {
      checkFriendStatus();
    }
  }, [user.id, userProfiles]);

  console.log(userProfiles[0]?.username, "UserProfiles");

  const navigate = useNavigate();
  const handleClick = () => {
    localStorage.clear();
    navigate("/");
  };

  const handleAddFriend = async () => {
    try {
      const response = await postRequest(`${baseUrl}/friendships/request/${user.id}/${userProfiles[0]?.id}`)
      // Xử lý logic khi gửi yêu cầu kết bạn thành công
      setFriendStatus({ status: "pending", userSendReq: user.id });
    } catch (error) {
      console.error("Error sending friend request:", error);
    }
  };

  const handleUnfriend = async () => {
    try {
      const response = await postRequest(`${baseUrl}/friendships/unfriend/${user.id}/${userProfiles[0]?.id}`)
      // Xử lý logic khi hủy yêu cầu kết bạn thành công
      setFriendStatus();
    } catch (error) {
      console.error("Error canceling friend request:", error);
    }
  };

  const handleAcceptFriend = async () => {
    try {
      const response = await postRequest(`${baseUrl}/friendships/accept/${userProfiles[0]?.id}/${user.id}`)
      setFriendStatus({ status: "friend"});
    } catch (error) {
      console.error("Error canceling friend request:", error);
    }
  };

  return (
    <>
      <h1>My User: {user.fullname}</h1>
      <Button onClick={handleClick}>
        <BiPowerOff />
      </Button>
      {userProfiles.map((userProfile) => (
        <div key={userProfile.id}>
          <div>{userProfile.id}</div>
          <div>{userProfile.username}</div>
          <div>{userProfile.fullname}</div>
        </div>
      ))}

      {friendStatus?.status === "pending" && friendStatus?.userSendReq === user.id ? (
        <div className="pd-right">
          <div className="add-button">
            {/* Nút hiển thị khi trạng thái là "Pending" và userSendReq là user.id */}
            <button type="button" className="btn btn-warning">
              Pending Request
            </button>
            <button type="button" className="btn btn-warning" onClick={handleUnfriend}>
              Cancel Request
            </button>
          </div>
        </div>
      ) : friendStatus?.status === "pending" ? (
        <div className="pd-right">
          <div className="add-button">
            {/* Nút hiển thị khi trạng thái là "Pending" */}
            <button type="button" className="btn btn-warning" onClick={handleAcceptFriend}>
              Accepted Friend Request
            </button>
            <button type="button" className="btn btn-warning" onClick={handleUnfriend}>
              Cancel Request
            </button>
          </div>
        </div>
      ) : friendStatus?.status === "friend" ? (
        <div className="pd-right">
          <div className="add-button">
            {/* Nút hiển thị khi trạng thái là "Friend" */}
            <button type="button" className="btn btn-success">
              Friend
            </button>
            <button type="button" className="btn btn-success" onClick={handleUnfriend}>
              UnFriend
            </button>
          </div>
        </div>
      ) : userProfiles[0]?.username === user.username ? (
        <div className="pd-right">
          <div className="add-button">
            <button type="button" className="btn btn-primary btn-add">
              <i className="fas fa-plus fa-xa">
                <span>Thêm vào tin</span>
              </i>
            </button>
          </div>
          <div className="edit-button">
            <button type="button" className="btn btn-secondary btn-edit">
              <i className="fas fa-pen fa-xz">
                <span>Chỉnh sửa trang cá nhân</span>
              </i>
            </button>
          </div>
        </div>
      ) : (
        <div className="pd-right">
          <div className="add-button">
            {/* Nút hiển thị khi không phải là "Friend" */}
            <button type="button" className="btn btn-primary btn-add" onClick={handleAddFriend}>
              <i className="fas fa-user-plus">
                <span>Kết bạn</span>
              </i>
            </button>
          </div>
        </div>
      )}
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
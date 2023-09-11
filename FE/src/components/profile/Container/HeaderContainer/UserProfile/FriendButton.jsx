import React, { useEffect, useState, useContext } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { baseUrl, getRequest, postRequest } from "../../../../../utils/services";
import { AuthContext } from "../../../../../context/AuthContext";
import { ProfileContext } from "../../../../../context/ProfileContext";

export default function FriendButton() {
  const { user } = useContext(AuthContext);
  const { userProfile, socket } = useContext(ProfileContext);
  const [friendStatus, setFriendStatus] = useState(null);
  const [friendRequest, setFriendRequest] = useState([])

  const toastOptions = {
    position: "bottom-left",
    autoClose: 8000,
    pauseOnHover: true,
    draggable: true,
    theme: "dark",
  };

  useEffect(() => {
    if (socket === null) return;
    socket.emit("sendFriendRequest", user?.id)
    socket.on("friendRequest", (res) => {
      setFriendRequest(res)
    })

    return () => {
      socket.off("getOnlineUsers");
    };
  }, [socket])

  useEffect(() => {
    if (friendRequest.senderId) {
      toast.info("Bạn có một lời mời kết bạn.", toastOptions);
    }
  }, [friendRequest]);

  useEffect(() => {
    const checkFriendStatus = async () => {
      try {
        const response = await getRequest(`${baseUrl}/friendships/checkStatusByUserId/${user.id}/${userProfile[0]?.id}`);
        setFriendStatus(response);
      } catch (error) {
        console.error("Error checking friend status:", error);
      }
    };

    if (userProfile.length > 0) {
      checkFriendStatus();
    }
  }, [user.id, userProfile]);


  const handleAddFriend = async () => {
    try {
      const response = await postRequest(`${baseUrl}/friendships/request/${user.id}/${userProfile[0]?.id}`)
      setFriendStatus({ status: "pending", userSendReq: user.id });
      if (socket) {
        console.log(user.id, userProfile[0]?.id);
        socket.emit("sendFriendRequest", {
          senderId: user.id,
          receiverId: userProfile[0]?.id,
        });
      }
    } catch (error) {
      console.error("Error sending friend request:", error);
    }
  };

  const handleUnfriend = async () => {
    try {
      const response1 = await postRequest(`${baseUrl}/friendships/unfriend/${user.id}/${userProfile[0]?.id}`)
      const response2 = await postRequest(`${baseUrl}/friendships/unfriend/${userProfile[0]?.id}/${user.id}`)
      setFriendStatus();
    } catch (error) {
      console.error("Error canceling friend request:", error);
    }
  };

  const handleCancelRequest = async () => {
    try {
      const response = await postRequest(`${baseUrl}/friendships/unfriend/${userProfile[0]?.id}/${user.id}/`)
      setFriendStatus();
    } catch (error) {
      console.error("Error canceling friend request:", error);
    }
  };

  const handleAcceptFriend = async () => {
    try {
      const response = await postRequest(`${baseUrl}/friendships/accept/${userProfile[0]?.id}/${user.id}`)
      setFriendStatus({ status: "friend" });
    } catch (error) {
      console.error("Error canceling friend request:", error);
    }
  };

  return (
    <>
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
            <button type="button" className="btn btn-warning" onClick={handleCancelRequest}>
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
      ) : userProfile[0]?.username === user.username ? (
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
      <ToastContainer/>
    </>
  );
}


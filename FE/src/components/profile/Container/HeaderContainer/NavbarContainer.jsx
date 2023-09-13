import $ from 'jquery';
import React, { useContext, useEffect, useState } from "react";
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../../../context/AuthContext";
import { ProfileContext } from "../../../../context/ProfileContext";
import "../../../../styles/modalNavbar.css";
import { baseUrl, getRequest, postRequest } from "../../../../utils/services";

export default function NavbarContainer() {
    const navigate = useNavigate();
    const { user } = useContext(AuthContext);
    const { userProfile, checkFriendStatus } = useContext(ProfileContext);
    const [friendStatus, setFriendStatus] = useState(null);
    const [blocklist, setBlockList] = useState([])
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    console.log(blocklist);

    const fetchBlockList = async () => {
        try {
            const response = await getRequest(`${baseUrl}/friendShips/blocklist/${user?.id}`)
            setBlockList(response);
        } catch (error) {
            console.error('Lỗi khi lấy danh sách người dùng bị chặn:', error);
        }
    };

    const showInfo = () => {
        $('.profile-block').toggle();
    };

    const handleBlockUser = async () => {
        try {
            const response = await postRequest(`${baseUrl}/friendShips/block/${user.id}/${userProfile[0]?.id}`)
            setFriendStatus({ status: "block" });
            navigate('/')
            console.log("Chặn thành công!")
            fetchBlockList();
        } catch (error) {
            console.error("Error canceling friend request:", error);
        }
    };

    const handleUnblockUser = async (index) => {
        try {
            const response = await postRequest(`${baseUrl}/friendships/unfriend/${user.id}/${blocklist[index]?.id}`)
            setFriendStatus();
            console.log("Bỏ chặn thành công!")
            handleClose();
            fetchBlockList();
            setBlockList()
            $('.profile-block').hide();
        } catch (error) {
            console.error("Error canceling friend request:", error);
        }
    };

    useEffect(() => {
        const fetchBlockList = async () => {
            try {
                const response = await getRequest(`${baseUrl}/friendShips/blocklist/${user?.id}`)
                setBlockList(response);
            } catch (error) {
                console.error('Lỗi khi lấy danh sách người dùng bị chặn:', error);
            }
        };
        fetchBlockList();
    }, [user?.id]);

    return (
        <div className="all-task">
            <div className="left-all-task">
                <div className="post-task">
                    <a href="#">
                        <span>Bài viết</span>
                    </a>
                </div>
                <div className="profile-task">
                    <a href="#">
                        <span>Giới thiệu</span>
                    </a>
                </div>
            </div>
            <div className="icon-block">
                <button
                    type="button"
                    className="btn btn-secondary btn-edit"
                    style={{ background: "#dbdbdc" }}
                    onClick={() => showInfo()}
                >
                    <i className="fas fa-ellipsis-h" style={{ color: "black" }} />
                </button>
                <ol className="profile-block" style={{ display: "none" }}>
                    {user?.id !== userProfile[0]?.id ? (
                        <li onClick={handleBlockUser}>
                            <i className="fas fa-user-lock" />Chặn người dùng
                        </li>
                    ) : (
                        <li onClick={handleShow}>
                            <i className="fas fa-list" />Danh sách Block
                        </li>
                    )}
                </ol>
            </div>

            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Block Users</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className="modal-block-top">
                        <p>Sau khi bạn chặn ai đó, người đó sẽ không thể xem nội dung bạn đăng trên dòng thời gian, gắn thẻ bạn, mời bạn tham gia sự kiện hoặc nhóm, bắt đầu cuộc trò chuyện với bạn hoặc thêm bạn làm bạn bè nữa. Lưu ý: Không bao gồm các ứng dụng, trò chơi hoặc nhóm mà cả hai bạn cùng tham gia..</p>
                    </div>
                    <div className="modal-block-container">
                        {blocklist?.map((blockedUser, index) => (
                            <div className="modal-block-main" key={blockedUser.id}>
                                <div className="modal-block-user">
                                    <img src={blockedUser?.avatar} alt="" />
                                    <p>{blockedUser?.fullname}</p>
                                </div>

                                <button
                                    type="button"
                                    className="btn btn-secondary btn-edit block-edit"
                                    style={{ background: "#dbdbdc" }}
                                    onClick={() => handleUnblockUser(index)}
                                >
                                    <i className="fas fa-unlock-alt" style={{ color: "black" }}>
                                        <span style={{ fontWeight: "600", marginLeft: "5px" }}>Bỏ chặn</span>
                                    </i>
                                </button>
                            </div>
                        ))}
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="primary" onClick={handleClose}>
                        Close
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    )
}
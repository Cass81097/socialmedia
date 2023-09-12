import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../../../context/AuthContext";
import { ProfileContext } from "../../../../context/ProfileContext";
import { baseUrl, getRequest, postRequest } from "../../../../utils/services"
import $ from 'jquery';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import "../../../../styles/modal.css"

export default function NavbarContainer() {
    const { user } = useContext(AuthContext);
    const { userProfile, checkFriendStatus } = useContext(ProfileContext);
    const [friendStatus, setFriendStatus] = useState(null);
    const [blocklist, setBlockList] = useState([])
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const showInfo = () => {
        $('.profile-block').toggle();
    };

    const handleBlockUser = async () => {
        try {
            const response = await postRequest(`${baseUrl}/friendShips/block/${user.id}/${userProfile[0]?.id}`)
            setFriendStatus({ status: "block" });
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
                        <p>Once you block someone, that person can no longer see things you post on  your timeline, tag you, invite you to events or groups, start a conversation with you, or add you as a friend. Note: Does not include apps, games or groups you both participate in.</p>
                    </div>
                    <div className="modal-block-container">
                        {blocklist.map((blockedUser) => (
                            <div className="modal-block-main" key={blockedUser.id}>
                                <div className="modal-block-user">
                                    <img src={blockedUser.avatar} alt="" />
                                    <p>{blockedUser.fullname}</p>
                                </div>

                                <button
                                    type="button"
                                    className="btn btn-secondary btn-edit block-edit"
                                    style={{ background: "#dbdbdc" }}
                                >
                                    <i className="fas fa-unlock-alt" style={{ color: "black" }}>
                                        <span style={{ fontWeight: "600", marginLeft: "5px" }}>Unblock</span>
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
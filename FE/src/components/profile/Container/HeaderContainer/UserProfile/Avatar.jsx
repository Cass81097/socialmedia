import React, { useContext, useState, useEffect } from "react";
import "react-toastify/dist/ReactToastify.css";
import { AuthContext } from "../../../../../context/AuthContext";
import { baseUrl, getRequest } from "../../../../../utils/services";
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { ProfileContext } from "../../../../../context/ProfileContext";
import "../../../../../styles/modalAvatar.css"
import uploadImage from "../../../../../hooks/Upload";
import "../../../../../styles/upload.css"
import axios from "axios";

export default function Avatar() {
    const { user, setUser } = useContext(AuthContext);
    const { userProfile, setUserProfile, fetchUserProfile } = useContext(ProfileContext);
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const [imageSrc, setImageSrc] = useState(null);

    const handleSubmit = async () => {
        const newData = {
            avatar: imageSrc,
        };

        try {
            const response = await axios.put(`${baseUrl}/users/avatar/${user.id}`, newData)
            console.log(response);
            setShow(false);
            const userData = JSON.parse(localStorage.getItem("User"));
            userData.avatar = newData.avatar;
            localStorage.setItem("User", JSON.stringify(userData));
            fetchUserProfile();
            setUser(JSON.parse(localStorage.getItem("User")))
            console.log("Thay avatar thành công");
        } catch (error) {
            console.error("Error adding product:", error);
        }
    };

    const handleImageUpload = (e) => {
        uploadImage(e, setImageSrc);
    };

    return (
        <div className="pd-left">
            <div className="pd-row">
                <div style={{ position: "relative" }}>
                    <img className="pd-image" src={userProfile[0]?.avatar} />
                    {userProfile[0]?.username && user.username && userProfile[0]?.username === user.username ? (
                        <div className="change-avatar" onClick={handleShow}>
                            <i className="fas fa-camera"></i>
                        </div>
                    ) : ""}
                </div>
                <div className="user-profile-status">
                    <h3>{userProfile[0]?.fullname}</h3>
                    <p>1000 bạn bè - 20 bạn chung</p>
                    {/*lay avatar cua cac user */}
                    <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRtRs_rWILOMx5-v3aXwJu7LWUhnPceiKvvDg&usqp=CAU" />
                    <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRtRs_rWILOMx5-v3aXwJu7LWUhnPceiKvvDg&usqp=CAU" />
                    <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRtRs_rWILOMx5-v3aXwJu7LWUhnPceiKvvDg&usqp=CAU" />
                </div>
            </div>

            <Modal show={show} onHide={handleClose} centered>
                <Modal.Header closeButton>
                    <Modal.Title className="modal-avatar-title">Cập nhật ảnh đại diện</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className="form-group mb-avatar">
                        <label htmlFor="formFile" className="form-label inputCode"><span></span></label>
                        <input type="file" id="image-upload" onChange={handleImageUpload} hidden />
                        <label htmlFor="image-upload" className="file-upload-button"><span>+ Tải ảnh lên</span></label>
                        <span id="file-name" style={{ fontSize: '0px' }}></span>
                        <div className="info-progress">
                            <div className="progress">
                                <div id="upload-progress"
                                    className="progress-bar progress-bar-striped progress-bar-animated"
                                    role="progressbar" aria-valuenow="0" aria-valuemin="0" aria-valuemax="100"
                                    style={{ width: '0' }} hidden="">0%
                                </div>
                            </div>
                            <div className="image-url" hidden>
                                <img src="" alt="" id="image-url"></img>
                            </div>
                        </div>
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Đóng
                    </Button>
                    <Button variant="primary" onClick={handleSubmit}>
                        Lưu
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    )
}
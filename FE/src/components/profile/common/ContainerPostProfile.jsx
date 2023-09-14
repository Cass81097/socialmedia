import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../../context/AuthContext";
import { Link, useNavigate } from "react-router-dom";
import uploadImages from "../../../hooks/UploadMulti";
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import styled from "styled-components";

export default function ContainerPostProfile() {
    const { user } = useContext(AuthContext);
    const [imageSrc, setImageSrc] = useState(null);
    const [show, setShow] = useState(false);

    const handleDeleteImage = (index) => {
        setImageSrc((prevImages) => {
            const newImages = [...prevImages];
            newImages.splice(index, 1);
            return newImages;
        });
    };

    const handleClose = () => {
        setShow(false);
    }

    const handleShow = async () => {
        setShow(true);
    };

    const handleImageUploadMore = (e) => {
        console.log("1");
        uploadImages(e, (images) => {
            setImageSrc((prevImages) => [...prevImages, ...images]);
        });
    };

    const handleImageUpload = (e) => {
        uploadImages(e, setImageSrc);
    };

    const handleImageClose = () => {
        setImageSrc([]);
    };

    return (
        <>
            <div className="post-col">
                <div className="home-content">
                    <div className="write-post-container">
                        <div className="user-profile">
                            <div className="user-avatar">
                                <img src={user.avatar} />
                            </div>
                            <div>
                                <p>{user.fullname}</p>
                                <small>
                                    Public
                                    <i className="fas fa-caret-down" />
                                </small>
                            </div>
                        </div>
                    </div>
                    <div className="post-input-container">
                        <textarea
                            name="textarea"
                            id="textarea"
                            placeholder="Bạn đang nghĩ gì thế?"
                            rows={3}
                            defaultValue={""}
                        />

                        <div style={{ position: "relative" }}>

                            {imageSrc && imageSrc.length > 0 && (
                                <div className="post-image-container">
                                    {imageSrc.map((src, index) => (
                                        <img key={index} src={src} alt={`Image ${index}`} />
                                    ))}
                                </div>
                            )}


                            {imageSrc && imageSrc.length > 0 && (
                                <div className="post-image-close">
                                    <Button variant="light" onClick={handleImageClose}>X</Button>
                                </div>
                            )}
                            {imageSrc && imageSrc.length > 0 && (
                                <label htmlFor="image-upload-add" className="post-image-add" style={{ cursor: "pointer" }}>
                                    <div className="btn btn-light">Thêm ảnh</div>
                                    <input
                                        id="image-upload-add"
                                        type="file"
                                        multiple
                                        onChange={handleImageUploadMore}
                                        style={{ display: "none" }}
                                    />
                                </label>
                            )}
                            {imageSrc && imageSrc.length > 0 && (
                                <Button variant="light" className="post-image-change" onClick={() => handleShow()}>Chỉnh sửa tất cả</Button>
                            )}
                        </div>

                        <div className="add-post-links">
                            <Link to="">
                                <img src="./images/watch.png" /> Video trực tiếp
                            </Link>
                            <label htmlFor="image-upload" className="upload-label" style={{ cursor: "pointer" }}>
                                <img src="./images/photo.png" style={{ marginRight: "10px", width: "20px" }} /> Ảnh/video
                                <input
                                    id="image-upload"
                                    type="file"
                                    multiple
                                    onChange={handleImageUpload}
                                    style={{ display: "none" }}
                                />
                            </label>
                            <Link to="">
                                <img src="./images/feeling.png" /> Cảm xúc/hoạt động
                            </Link>
                        </div>
                    </div>
                </div>
                <div className="index-content">
                    <div className="post-container">
                        <div className="user-profile">
                            <div className="user-avatar">
                                <img src={user.avatar} />
                            </div>
                            <div>
                                <p>{user.fullname}</p>
                                <div className="time-status">
                                    <span>8 tháng 7 lúc 20:20</span>
                                    <i
                                        className="fas fa-globe-americas"
                                        style={{ color: "#65676B" }}
                                    />
                                </div>
                            </div>
                        </div>
                        <div className="post-user">
                            <p className="post-text">
                                Lâu rồi mới có thời gian rảnh sau giờ ăn tối cùng gia đình
                            </p>

                            <img src={"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT3QBGmFHi1Kk4KfViRu0M5iQL-On3HXvX0uQ&usqp=CAU"} className="post-img" />
                            <div className="activity-icons"></div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Modal Change Image */}
            <CustomModal show={show} onHide={handleClose} centered className="custom-modal">
                <Modal.Header closeButton>
                    <Modal.Title style={{ transform: "translateX(600px)" }}>Xóa ảnh</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {imageSrc && imageSrc.length > 0 && (
                        <div className="modal-image-container">
                            {imageSrc.map((src, index) => (
                                <div key={index} style={{ position: "relative" }}>
                                    <img src={src} alt={`Image ${index}`} />
                                    <Button variant="light" className="modal-image-delete" onClick={() => handleDeleteImage(index)}>
                                        X
                                    </Button>
                                </div>
                            ))}
                        </div>
                    )}
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="primary" onClick={handleClose}>
                        Đóng
                    </Button>
                </Modal.Footer>
            </CustomModal>
        </>
    )
}

const CustomModal = styled(Modal)`
.custom-modal {
    max-width: 1000px; 
  }

  .modal-dialog-centered {
    max-width: fit-content;
  }

  .modal-body {
    overflow: auto;
    max-width: 999px;
    background: #E4E6EB;
  }
  
`;


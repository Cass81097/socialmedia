import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../../context/AuthContext";
import { ProfileContext } from "../../../context/ProfileContext"
import { Link, useNavigate } from "react-router-dom";
import uploadImages from "../../../hooks/UploadMulti";
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import styled from "styled-components";
import InputEmoji from "react-input-emoji";
import "../../../styles/user/post/inputEmoji.css"
import "../../../styles/user/post/postImage.css"
import "../../../styles/user/post/postUser.css"
import { baseUrl, getRequest, postRequest } from "../../../utils/services";
import { PostContext } from "../../../context/PostContext";
import LoadingNew from "../../common/LoadingNew";

export default function ContainerPostProfile() {
    const navigate = useNavigate();
    const { user } = useContext(AuthContext);
    const { userProfile } = useContext(ProfileContext);
    const { postUser, postImageUser, fetchPostUser, fetchImagePostUser } = useContext(PostContext);
    const [imageSrcProfile, setImageSrcProfile] = useState(null);

    const [show, setShow] = useState(false);
    const [textMessage, setTextMessage] = useState("")
    const [isPostLoading, setIsPostLoading] = useState(false);
    const [isImageLoading, setIsImageLoading] = useState(false);


    const handleDeleteImage = (index) => {
        setImageSrcProfile((prevImages) => {
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
        uploadImages(e, (images) => {
            setImageSrcProfile((prevImages) => [...prevImages, ...images]);
        });
    };

    const handleImageUploadPost = (e) => {
        uploadImages(e, setImageSrcProfile, setIsImageLoading);
    };

    useEffect(() => {
        if (imageSrcProfile) {
            setIsImageLoading(false);
        }
    }, [imageSrcProfile]);

    const handleImageClose = () => {
        setImageSrcProfile([]);
    };

    //Handle Post

    const handleKeyDown = (event) => {
        if (event.key === 'Enter') {
            event.preventDefault();
            handleSendMessage();
        }
    };

    const handleInputChange = (value) => {
        setTextMessage(value);
    };

    const handleSendMessage = async () => {
        setIsPostLoading(true);

        const data = {
            content: textMessage,
            visibility: "public",
            sender: {
                id: user.id
            },
            receiver: {
                id: userProfile[0].id
            }
        };

        const response = await postRequest(`${baseUrl}/status`, JSON.stringify(data));
        const statusId = response.id;

        if (imageSrcProfile) {
            for (let i = 0; i < imageSrcProfile.length; i++) {
                const dataImage = {
                    imageUrl: imageSrcProfile[i],
                    status: {
                        id: statusId
                    }
                };

                const responseImage = await postRequest(`${baseUrl}/imageStatus`, JSON.stringify(dataImage));
            }
        }
        setIsPostLoading(false);

        setTextMessage("");
        setImageSrcProfile(null);
        fetchPostUser();
        fetchImagePostUser();

        console.log("Đăng post thành công");
    };

    const goProfile = (username) => {
        setShow(false);
        navigate(`/${username}`);
    };

    const goImageUrl = (imageUrl) => {
        window.open(imageUrl, "_blank");
    };

    return (
        <>
            <div className="post-col">
                <div className="home-content">
                    <div className="write-post-container">
                        <div className="user-profile">
                            <div className="user-avatar" onClick={() => goProfile(user?.username)}>
                                <img src={user.avatar} />
                            </div>
                            <div className="user-post-profile">
                                <p onClick={() => goProfile(user?.username)}>{user.fullname}</p>
                                <small>
                                    <span>Public</span> 
                                    <i className="fas fa-caret-down" />
                                </small>
                            </div>
                        </div>
                        <div className="user-action-post">
                            <Button variant="light">
                                <i className="fas fa-ellipsis-h"></i>
                            </Button>
                        </div>
                    </div>
                    <div className="post-input-container">
                        <InputEmoji
                            value={textMessage}
                            onChange={handleInputChange}
                            onKeyDown={handleKeyDown}
                        />

                        <Button
                            variant="primary"
                            className={`post-button ${(!imageSrcProfile && !textMessage) ? 'cursor-not-allowed' : ''}`}
                            onClick={handleSendMessage}
                            disabled={!imageSrcProfile && !textMessage}
                        >
                            Đăng
                        </Button>

                        <div style={{ position: "relative" }}>

                            {imageSrcProfile && imageSrcProfile.length > 0 && (
                                <div className="post-image-container">
                                    {imageSrcProfile.map((src, index) => (
                                        <img key={index} src={src} alt={`Image ${index}`} />
                                    ))}
                                </div>
                            )}

                            {imageSrcProfile && imageSrcProfile.length > 0 && (
                                <div className="post-image-close">
                                    <Button variant="light" onClick={handleImageClose}>X</Button>
                                </div>
                            )}
                            {imageSrcProfile && imageSrcProfile.length > 0 && (
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
                            {imageSrcProfile && imageSrcProfile.length > 0 && (
                                <Button variant="light" className="post-image-change" onClick={() => handleShow()}>Chỉnh sửa tất cả</Button>
                            )}
                        </div>

                        <div className="add-post-links">
                            <Link to="">
                                <img src="./images/watch.png" /> Video trực tiếp
                            </Link>
                            <label htmlFor="image-upload-post" className="upload-label" style={{ cursor: "pointer" }}>
                                <img src="./images/photo.png" style={{ marginRight: "10px", width: "20px" }} /> Ảnh/video
                                <input
                                    id="image-upload-post"
                                    type="file"
                                    multiple
                                    onChange={handleImageUploadPost}
                                    style={{ display: "none" }}
                                />
                            </label>
                            <Link to="">
                                <img src="./images/feeling.png" /> Cảm xúc/hoạt động
                            </Link>
                        </div>
                    </div>
                </div>
                <div>
                    {postUser.map((post, index) => (
                        <div key={index} className="index-content">
                            <div className="post-container">
                                <div className="user-profile">
                                    <div className="user-avatar" onClick={() => goProfile(post.sender?.username)}>
                                        <img src={post.sender?.avatar} alt="User Avatar" />
                                    </div>
                                    <div>
                                        <div className="post-user-name">
                                            {post.sender?.id !== post.receiver?.id && (
                                                <>
                                                    <p onClick={() => goProfile(post.sender?.username)}>{post.sender?.fullname}</p>
                                                    <i className="fas fa-caret-right icon-post-user"></i>
                                                </>
                                            )}
                                            <p>{post.receiver?.fullname}</p>
                                        </div>

                                        <div className="time-status">
                                            {(() => {
                                                const timeString = post.time;
                                                const date = new Date(timeString);
                                                const now = new Date();
                                                const timeDiffInMinutes = Math.floor((now - date) / (1000 * 60));
                                                let timeAgo;

                                                if (timeDiffInMinutes === 0) {
                                                    timeAgo = "Vừa xong";
                                                } else if (timeDiffInMinutes < 60) {
                                                    timeAgo = `${timeDiffInMinutes} phút trước`;
                                                } else {
                                                    const hours = Math.floor(timeDiffInMinutes / 60);
                                                    const minutes = timeDiffInMinutes % 60;
                                                    if (hours >= 24) {
                                                        timeAgo = "1 ngày trước";
                                                    } else if (minutes === 0) {
                                                        timeAgo = `${hours} giờ`;
                                                    } else {
                                                        timeAgo = `${hours} giờ ${minutes} phút trước`;
                                                    }
                                                }

                                                return (
                                                    <div>
                                                        <span>{timeAgo}</span>
                                                        <i className="fas fa-globe-americas" style={{ color: "#65676B" }} />
                                                    </div>
                                                );
                                            })()}
                                        </div>
                                    </div>
                                </div>
                                <div className="post-user">
                                    <p className="post-text">{post.content}</p>
                                    {postImageUser[index]?.length > 0 && postImageUser[index] && (
                                        <div className={`post-image ${postImageUser[index]?.length > 2 ? 'three' : ''}`}>
                                            {postImageUser[index]?.map((image, imageIndex) => (
                                                <img src={image.imageUrl} alt="Post Image" className="post-img" key={imageIndex} />
                                            ))}
                                        </div>
                                    )}
                                    <div className="activity-icons"></div>
                                </div>

                                <div className="post-action">
                                    <div className="post-like">
                                        <Button variant="light">
                                            <i className="far fa-thumbs-up"></i>
                                            <span>Thích</span>
                                        </Button>
                                    </div>
                                    <div className="post-comment">
                                        <Button variant="light">
                                            <i className="far fa-comment-alt"></i>
                                            <span>Bình luận</span>
                                        </Button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Modal Change Image */}
            <CustomModal show={show} onHide={handleClose} centered className="custom-modal">
                <Modal.Header closeButton>
                    <Modal.Title style={{ transform: "translateX(600px)" }}>Xóa ảnh</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {imageSrcProfile && imageSrcProfile.length > 0 && (
                        <div className="modal-image-container">
                            {imageSrcProfile.map((src, index) => (
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

            {isPostLoading || isImageLoading ? (
                <LoadingNew></LoadingNew>
            ) : null}
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


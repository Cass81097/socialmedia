import "../../styles/user/post/editPost.css"
import React, { useContext, useEffect, useState, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { baseUrl, postRequest, getRequest, putRequest, deleteRequest } from "../../utils/services";
import { AuthContext } from "../../context/AuthContext";
import { PostContext } from "../../context/PostContext";
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import InputEmoji from "react-input-emoji";
import EmojiPicker from 'emoji-picker-react';
import LoadingNew from "./LoadingNew";
import uploadImages from "../../hooks/UploadMulti";

export default function EditPost(props) {
    const { showPostEdit, setShowPostEdit, postEditIndex, setPostEditIndex } = props;
    const { user } = useContext(AuthContext)
    const { postUser, postImageUser, fetchPostUser, fetchImagePostUser } = useContext(PostContext);
    const [isPostEditLoading, setIsPostEditLoading] = useState(false);
    const [imageEdit, setImageEdit] = useState([]);
    const [textMessage, setTextMessage] = useState('');

    console.log(imageEdit);

    useEffect(() => {
        if (postUser && postUser[postEditIndex]?.image) {
            setImageEdit(postUser[postEditIndex]?.image);
        }
    }, [postUser, postEditIndex]);

    useEffect(() => {
        if (postUser[postEditIndex]?.content !== undefined) {
            setTextMessage(postUser[postEditIndex]?.content);
        }
    }, [postUser, postEditIndex]);

    const handleInputChange = (event) => {
        const value = event.target.value;
        setTextMessage(value);
    };

    const handleKeyDown = (event) => {
        if (event.key === 'Enter') {
            event.preventDefault();
            handleEditPost();
        }
    };

    const handlePostEditClose = () => {
        setPostEditIndex([])
        setShowPostEdit(false);
    }

    const handleEditPost = async () => {
        setIsPostEditLoading(true);

        const postId = postUser[postEditIndex].id;
        const data = {
            content: textMessage
        };

        const response = await putRequest(`${baseUrl}/status/content/${postId}`, JSON.stringify(data));

        if (imageEdit.length === 0) {
            const responseImage = await deleteRequest(`${baseUrl}/imageStatus/delete/${postId}`);

        } else {
            for (let i = 0; i < imageEdit.length; i++) {
                const dataImage = {
                    imageUrl: imageEdit[i].imageUrl,
                    status: {
                        id: postId
                    }
                };
                const responseImage = await postRequest(`${baseUrl}/imageStatus`, JSON.stringify(dataImage));
                console.log(responseImage);
            }
        }

        setIsPostEditLoading(false);
        setShowPostEdit(false);
        await fetchPostUser();
        await fetchImagePostUser();
    };

    const handleImageDelete = async () => {
        setImageEdit([]);
    }

    const handleImageUploadMore = (e) => {
        uploadImages(e, (images) => {
            setIsPostEditLoading(false);
            const newImages = images.map((image) => ({ imageUrl: image }));
            setImageEdit((prevImages) => [...prevImages, ...newImages]);
        }, setIsPostEditLoading);
    };

    return (
        <Modal show={showPostEdit} onHide={handlePostEditClose} centered>
            <div className="sao">
                <div className="body">
                    <div className="container">
                        <div className="wrapper">
                            <section className="post">
                                <header>Sửa bài viết</header>
                                <div className="post-form">
                                    <div className="content" style={{ margin: "82px 0 20px 0" }}>
                                        <div>
                                            <img src={postUser[postEditIndex]?.sender.avatar} alt="logo" />
                                        </div>
                                        <div className="details">
                                            <p>{postUser[postEditIndex]?.sender.fullname}</p>
                                            <div className="privacy">
                                                {postUser[postEditIndex]?.visibility === "friend" && (
                                                    <>
                                                        <i className="fas fa-user-friends" />
                                                        <span>Bạn bè</span>
                                                    </>
                                                )}
                                                {postUser[postEditIndex]?.visibility === "public" && (
                                                    <>
                                                        <i className="fas fa-globe-americas" />
                                                        <span>Công khai</span>
                                                    </>
                                                )}
                                                {postUser[postEditIndex]?.visibility === "private" && (
                                                    <>
                                                        <i className="fas fa-lock" />
                                                        <span>Chỉ mình tôi</span>
                                                    </>
                                                )}
                                                <i className="fas fa-caret-down" />
                                            </div>
                                        </div>
                                    </div>

                                    <div className={`post-edit-container ${imageEdit.length > 0 ? 'edit-with-image' : ''}`}>
                                        <textarea
                                            placeholder={`Bạn đang nghĩ gì vậy, ${postUser[postEditIndex]?.sender.fullname}`}
                                            spellCheck="false"
                                            value={textMessage}
                                            onChange={handleInputChange}
                                            onKeyDown={handleKeyDown}
                                        />

                                        <div className="image-all-edit">

                                            {imageEdit && imageEdit.length > 0 && imageEdit.length < 3 ? (
                                                <div className="img-post">
                                                    {imageEdit.map((src, index) => (
                                                        <img key={index} src={src.imageUrl} alt={`Image ${index}`} />
                                                    ))}
                                                </div>
                                            ) : imageEdit && imageEdit.length === 3 ? (
                                                <div className="img-post three-image">
                                                    {imageEdit.map((src, index) => (
                                                        <img key={index} src={src.imageUrl} alt={`Image ${index}`} />
                                                    ))}
                                                </div>
                                            ) : imageEdit && imageEdit.length === 4 ? (
                                                <div className="img-post four-image">
                                                    {imageEdit.map((src, index) => (
                                                        <img key={index} src={src.imageUrl} alt={`Image ${index}`} />
                                                    ))}
                                                </div>
                                            ) : imageEdit && imageEdit.length > 4 ? (
                                                <div className="img-post five-image">
                                                    {imageEdit.map((src, index) => (
                                                        <img key={index} src={src.imageUrl} alt={`Image ${index}`} />
                                                    ))}
                                                </div>
                                            )
                                                :
                                                null}


                                            {imageEdit && imageEdit.length > 0 && (
                                                <>
                                                    <div className="postEdit-image-close">
                                                        <Button variant="light" onClick={handleImageDelete} style={{ borderRadius: "50%" }} >X</Button>
                                                    </div>
                                                    <label htmlFor="image-upload-add" className="postEdit-image-add" style={{ cursor: "pointer" }}>
                                                        <div className="btn btn-light">Thêm ảnh</div>

                                                        <input
                                                            id="image-upload-add"
                                                            type="file"
                                                            multiple
                                                            style={{ display: "none" }}
                                                            onChange={handleImageUploadMore}
                                                        />
                                                    </label>
                                                    <Button variant="light" className="postEdit-image-change" >Chỉnh sửa tất cả</Button>
                                                </>
                                            )}
                                        </div>
                                    </div>



                                    {/* <div className="theme-emoji">
                                        <img src="https://www.facebook.com/images/composer/SATP_Aa_square-2x.png"
                                            alt="theme" />
                                        <img src="https://www.pngmart.com/files/19/Smile-Emoji-Transparent-PNG.png"
                                            alt="smile" />
                                    </div> */}
                                    <div className="options">
                                        <p>Thêm vào bài viết</p>
                                        <ul style={{ marginTop: "16px" }} className="list">



                                            <li>
                                                <label htmlFor="image-upload-add-edit">
                                                    <img src="https://static.xx.fbcdn.net/rsrc.php/v3/y7/r/Ivw7nhRtXyo.png" alt="gallery" />
                                                </label>
                                                <input
                                                    id="image-upload-add-edit"
                                                    type="file"
                                                    multiple
                                                    style={{ display: "none" }}
                                                    onChange={handleImageUploadMore}
                                                />
                                            </li>

                                            <li>
                                                <img src="https://static.xx.fbcdn.net/rsrc.php/v3/yq/r/b37mHA1PjfK.png"
                                                    alt="gallery" />
                                            </li>
                                            <li>
                                                <img src="https://static.xx.fbcdn.net/rsrc.php/v3/yd/r/Y4mYLVOhTwq.png"
                                                    alt="gallery" />
                                            </li>
                                            <li>
                                                <img src="https://static.xx.fbcdn.net/rsrc.php/v3/y1/r/8zlaieBcZ72.png"
                                                    alt="gallery" />
                                            </li>
                                            <li>
                                                <img src="https://static.xx.fbcdn.net/rsrc.php/v3/yT/r/q7MiRkL7MLC.png"
                                                    alt="gallery" />
                                            </li>
                                        </ul>
                                    </div>
                                    {/* <button className="edit-post-confirm" onClick={handleEditPost}>Sửa</button> */}
                                    <Button
                                        variant="primary"
                                        className="post-button"
                                        onClick={handleEditPost}
                                    >
                                        Sửa
                                    </Button>
                                </div>
                            </section>

                        </div>
                    </div>
                </div>
            </div>

            {isPostEditLoading ? (
                <LoadingNew></LoadingNew>
            ) : null}
        </Modal>
    )
}

import axios from "axios";
import { baseUrl, getRequest, postRequest, deleteRequest } from "../../utils/services";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../context/AuthContext";
import Button from 'react-bootstrap/Button';
import { PostContext } from "../../context/PostContext";

export default function Like(props) {
    const { postId, countLike, checkStatusLike, setIsCountLike, onLikeClick} = props
    const { user } = useContext(AuthContext)
    const { fetchPostUser } = useContext(PostContext)
    const [isLiked, setIsLiked] = useState(checkStatusLike);
    const [likeCount, setLikeCount] = useState(countLike);

    useEffect(() => {
        setIsCountLike(likeCount);
    }, [likeCount, setIsCountLike]);

    const handleAddLike = async () => {
        const userId = user.id;
        let data = {
            userId: userId
        }
        const response = await postRequest(`${baseUrl}/likes/add/${postId}`, JSON.stringify(data));
        setIsLiked(true);
        // setLikeCount(likeCount + 1);
        // onLikeClick();

        fetchPostUser()
    };

    const handleRemoveLike = async () => {
        const data = user.id;
        const response = await deleteRequest(`${baseUrl}/likes/${postId}?userId=${data}`);
        setIsLiked(false);
        // setLikeCount(likeCount - 1);
        // onLikeClick();
        fetchPostUser() 
    };

    useEffect(() => {
        async function checkLikedStatus() {
            const us = JSON.parse(localStorage.getItem("User"));

            try {
                const response = await getRequest(`${baseUrl}/likes/${postId}`);
                const hasLiked = response.likeRecords;
                let hasUserLiked = false;
                for (let i = 0; i < hasLiked?.length; i++) {
                    if (hasLiked[i].user.id === us.id) {
                        hasUserLiked = true;
                    }
                }
                setIsLiked(hasUserLiked);
            } catch (error) {
                console.error("Error checking like status:", error);
            }
        }

        checkLikedStatus();
    }, [postId, user.id]);

    return (
        <>
            {isLiked ? (
                <Button variant="light" onClick={handleRemoveLike} style={{color:"rgb(27 97 255)"}}>
                    <i className="fas fa-thumbs-up"></i>
                    <span>Thích</span>
                </Button>
            ) : (
                <Button variant="light" onClick={handleAddLike}>
                    <i className="far fa-thumbs-up" ></i>
                    <span>Thích</span>
                </Button>
            )}  
        </>
    );
}
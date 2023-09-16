import axios from "axios";
import customAxios from "../../../../service/api";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../../../context/AuthContext";

export default function Like({ postId, countLike,checkStatusLike }) {
    console.log(postId);
    const { user } = useContext(AuthContext);
    const [isLiked, setIsLiked] = useState(checkStatusLike); // Initial isLiked status
    const [likeCount, setLikeCount] = useState(countLike);

    const handleAddLike = () => {
        const data = user.id;
        console.log(data, "user");
        console.log(postId, "post");
        customAxios.post(`/likes/add/${postId}`, { userId: data }).then((res) => {
            console.log(1, res);
            setIsLiked(true); // Đặt trạng thái đã like thành true sau khi like thành công
            setLikeCount(likeCount + 1); // Tăng số lượng like lên 1
        });
    };

    const handleRemoveLike = () => {
        const data = user.id;
        console.log(data)
        customAxios.delete(`/likes/${postId}`, { userId: data }).then((res) => {
            setIsLiked(false);
            setLikeCount(likeCount - 1); // Giảm số lượng like đi 1
        });
    };

    useEffect(() => {
        async function checkLikedStatus() {
            const us = JSON.parse(localStorage.getItem("User"));
            console.log(us.id);
            try {
                const response = await customAxios.get(`/likes/${postId}`);
                console.log(response)
                const hasLiked = response.data.likeRecords;
                let hasUserLiked = false;
                for (let i = 0; i < hasLiked.length; i++) {
                    if (hasLiked[i].user.id === us.id) {
                        console.log(hasLiked[i].user.id, "id");
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

            <div>
                {isLiked ? (
                    // If the user has liked the post, display the "Unlike" button
                    <i className="fas fa-thumbs-down" onClick={handleRemoveLike}></i>
                ) : (
                    // If the user hasn't liked the post, display the "Like" button
                    <i className="fas fa-thumbs-up" onClick={handleAddLike}></i>
                )}
                {likeCount}
            </div>

        </>
    );
}
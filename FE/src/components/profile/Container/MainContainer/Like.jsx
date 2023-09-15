import axios from "axios";
import customAxios from "../../../../service/api";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../../../context/AuthContext";

export default function Like({ postId, countLike }) {
    console.log(postId);
    const { user } = useContext(AuthContext);
    const [likes, setLikes] = useState(0);
    const [liked, setLiked] = useState(false); // Trạng thái cho việc kiểm tra đã like hay chưa
    const [likeCount, setLikeCount] = useState(countLike);

    const handleAddLike = () => {
        const data = user.id;
        console.log(data, "user");
        console.log(postId, "post");
        customAxios.post(`/likes/add/${postId}`, { userId: data }).then((res) => {
            console.log(1, res);
            setLiked(true); // Đặt trạng thái đã like thành true sau khi like thành công
            setLikeCount(likeCount + 1); // Tăng số lượng like lên 1
        });
    };

    const handleRemoveLike = () => {
        const data = user.id;
        customAxios.delete(`/likes/${postId}`, { userId: data }).then((res) => {
            setLiked(false);
            setLikeCount(likeCount - 1); // Giảm số lượng like đi 1
        });
    };

    useEffect(() => {
        // Kiểm tra nếu người dùng đã like bài viết khi trang web được tải lại
        async function checkLikedStatus() {
            const us = JSON.parse(localStorage.getItem("User"));
            console.log(us.id);
            try {
                const response = await customAxios.get(`/likes/${postId}`);
                const hasLiked = response.data.likeRecords;
                let hasUserLiked = false;
                for (let i = 0; i < hasLiked.length; i++) {
                    if (hasLiked[i].user.id === us.id) {
                        console.log(hasLiked[i].user.id, "id");
                        hasUserLiked = true;
                        break;
                    }
                }
                setLiked(hasUserLiked);
            } catch (error) {
                console.error("Lỗi khi kiểm tra trạng thái like:", error);
            }
        }

        checkLikedStatus();
    }, [postId]);

    return (
        <>
            <div>
                {liked ? (
                    // Nếu người dùng đã like, hiển thị nút "unlike"
                    <i className="fas fa-thumbs-down" onClick={handleRemoveLike}></i>
                ) : (
                    // Nếu người dùng chưa like, hiển thị nút "like"
                    <i className="fas fa-thumbs-up" onClick={handleAddLike}></i>
                )}
                {likeCount}
            </div>
        </>
    );
}

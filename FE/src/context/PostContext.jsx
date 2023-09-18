import React, { createContext, useCallback, useEffect, useState, useContext } from "react";
import { baseUrl, getRequest, postRequest } from "../utils/services";
import { Link, useNavigate } from "react-router-dom";
import { ProfileContext } from "./ProfileContext";

export const PostContext = createContext();

export const PostContextProvider = ({ children, user }) => {
    const { userProfile } = useContext(ProfileContext);
    const [postUser, setPostUser] = useState([]);
    const [postImageUser, setIsPostImageUser] = useState([]);
    const [userProfileId, setUserProfileId] = useState(null);

    const domain = window.location.pathname.split("/")[1];
    const username = domain || "";

    const fetchPostUser = useCallback(async () => {
        try {
            const storedUser = localStorage.getItem('User');
            const userStorage = JSON.parse(storedUser).username;
            if (userStorage === username) {
                const response = await getRequest(`${baseUrl}/status/${userProfile[0]?.id}`);
                setPostUser(response);
            }
            if (userStorage !== username) {
                const friendshipCheckResponse = await getRequest(`${baseUrl}/friendShips/checkStatusByUserId/${userProfile[0]?.id}/${user.id}`);
console.log(friendshipCheckResponse?.status);
                if (friendshipCheckResponse?.status === 'friend') {
                    const response = await getRequest(`${baseUrl}/status/visibility/${userProfile[0]?.id}`);
                    setPostUser(response);
                }
                if (friendshipCheckResponse?.status === 'pending' || friendshipCheckResponse === null ) {
                    const response = await getRequest(`${baseUrl}/status/visibility/public/${userProfile[0]?.id}`);
                    setPostUser(response);
                }
            }
        } catch (error) {
            console.error("Error fetching user profiles:", error);
        }
    }, [username, user?.id, userProfileId]);

    const fetchImagePostUser = useCallback(async () => {
        try {
            const imagePostPromises = postUser.map(async (post) => {
                const response = await getRequest(`${baseUrl}/imageStatus/${post.id}`);
                return response;
            });

            const imagePostResponses = await Promise.all(imagePostPromises);
            setIsPostImageUser(imagePostResponses);
        } catch (error) {
            console.error("Error fetching image posts:", error);
        }
    }, [postUser]);

    useEffect(() => {
        fetchImagePostUser();
    }, [fetchImagePostUser]);

    useEffect(() => {
        setUserProfileId(userProfile[0]?.id);
    }, [userProfile]);

    useEffect(() => {
        fetchPostUser();
    }, [fetchPostUser]);

    useEffect(() => {
        fetchImagePostUser();
    }, [fetchImagePostUser]);

    return (
        <PostContext.Provider value={{ postUser, fetchPostUser, postImageUser, fetchImagePostUser }}>
            {children}
        </PostContext.Provider>
    );
};
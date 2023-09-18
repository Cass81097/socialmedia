import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../../../context/AuthContext";
import LeftPostProfile from "../../common/LeftPostProfile";
import ContainerPostProfile from "../../common/ContainerPostProfile";
import { ProfileContext } from "../../../../context/ProfileContext";

export default function PostProfile() {
    const { user } = useContext(AuthContext);
    const { userProfile, checkFriendStatus } = useContext(ProfileContext);
    return (
        <>
            <LeftPostProfile></LeftPostProfile>
            <ContainerPostProfile user={user} userProfile={userProfile} checkFriendStatus={checkFriendStatus}></ContainerPostProfile>
        </>
    )
}
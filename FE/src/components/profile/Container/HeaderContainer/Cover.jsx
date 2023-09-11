import React, { useContext } from "react";
import { AuthContext } from "../../../../context/AuthContext";
import { ProfileContext } from "../../../../context/ProfileContext";

export default function Cover() {
    const { user } = useContext(AuthContext);
    const { userProfile } = useContext(ProfileContext);

    return (
        <img src={userProfile[0]?.cover} className="cover-img" />
    )
}
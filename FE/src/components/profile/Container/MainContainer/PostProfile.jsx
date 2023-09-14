import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../../../context/AuthContext";
import LeftPostProfile from "../../common/LeftPostProfile";
import ContainerPostProfile from "../../common/ContainerPostProfile";

export default function PostProfile() {
    const { user } = useContext(AuthContext);

    return (
        <>
            <LeftPostProfile></LeftPostProfile>
            <ContainerPostProfile></ContainerPostProfile>
        </>
    )
}
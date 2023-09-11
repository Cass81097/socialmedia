import React, { useContext, useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import { AuthContext } from "../../../../../context/AuthContext";
import { baseUrl, getRequest } from "../../../../../utils/services";
import { ProfileContext } from "../../../../../context/ProfileContext";

export default function Avatar() {
    const { user } = useContext(AuthContext);
    const { userProfile } = useContext(ProfileContext);

    return (
        <div className="pd-left">
            <div className="pd-row">
                <img className="pd-image" src={userProfile[0].avatar} />
                <div>
                    <h3>{userProfile[0].fullname}</h3>
                    <p>1000 bạn bè - 20 bạn chung</p>
                    {/*lay avatar cua cac user */}
                    <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRtRs_rWILOMx5-v3aXwJu7LWUhnPceiKvvDg&usqp=CAU" />
                    <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRtRs_rWILOMx5-v3aXwJu7LWUhnPceiKvvDg&usqp=CAU" />
                    <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRtRs_rWILOMx5-v3aXwJu7LWUhnPceiKvvDg&usqp=CAU" />

                </div>
            </div>
        </div>
    )
}
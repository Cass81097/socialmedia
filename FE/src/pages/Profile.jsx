import "bootstrap/dist/css/bootstrap.min.css";
import React, { useContext, useEffect, useState } from "react";
import "react-toastify/dist/ReactToastify.css";
import Cover from "../components/profile/Container/HeaderContainer/Cover";
import NavbarContainer from "../components/profile/Container/HeaderContainer/NavbarContainer";
import Navbar from "../components/common/Navbar";
import { AuthContext } from "../context/AuthContext";
import { ProfileContext } from "../context/ProfileContext";
import "../styles/user/header.css";
import "../styles/user/left-sidebar.css";
import "../styles/user/main-content.css";
import "../styles/user/profile.css";
import "../styles/user/right-sidebar.css";
import "../styles/user/style.css";
import Avatar from "../components/profile/Container/HeaderContainer/UserProfile/Avatar";
import FriendButton from "../components/profile/Container/HeaderContainer/UserProfile/FriendButton";
import ListFriend from "../components/profile/Container/MainContainer/ListFriend";
import EditUser from "../components/profile/common/EditUser"
import SidebarProfile from "../components/profile/SidebarProfile";
import LeftContainerProfile from "../components/profile/common/LeftContainerProfile"
import PostProfile from "../components/profile/Container/MainContainer/PostProfile";
import Info from "../components/profile/common/Info";
export default function Profile() {
  const { user } = useContext(AuthContext);
  const { userProfile } = useContext(ProfileContext)
  const [isPost, setIsPost] = useState(true);
  const [isFriend, setIsFriend] = useState(false);
  const [isProfile, setIsProfile] = useState(false);

  return (
    <>
      <Navbar></Navbar>
      <div className="fb-container">
        <SidebarProfile></SidebarProfile>
        {/* profile page  */}
        <div className="profile-container">
          <Cover></Cover>
          <div className="profile-details">
            <Avatar></Avatar>
            <FriendButton></FriendButton>
          </div>
          <NavbarContainer isPost={isPost} setIsPost={setIsPost} isFriend={isFriend} setIsFriend={setIsFriend} isProfile={isProfile} setIsProfile={setIsProfile}></NavbarContainer>
          {isPost && !isFriend && !isProfile ? (
            <div className="profile-info">
              {/* <div className="info-col">
                ABC
              </div>
              <div className="post-col" style={{ background: "white" }}>
                ABC
              </div> */}
              <PostProfile></PostProfile>
            </div>
          ) : !isPost && isFriend && !isProfile ? (
            <div className="profile-info">
              <div className="post-col" style={{ background: "white", width: "100%" }}>
                <ListFriend></ListFriend>
              </div>
            </div>
          ) : !isPost && !isFriend && isProfile ? (

            <div className="profile-info">
              <div className="info-col">
                <LeftContainerProfile></LeftContainerProfile>
              </div>
              {userProfile[0]?.id === user?.id ? (
                  <div className="post-col" style={{ background: "white" }}>
                    <EditUser></EditUser>
                  </div>
              ) : (
                  <div className="post-col" style={{ background: "white" }}>

                  <Info></Info>
                  </div>
              )}
            </div>
          ) : (
            <div className="profile-info">
              OK
            </div>
          )}
        </div>
      </div>
    </>
  );
}
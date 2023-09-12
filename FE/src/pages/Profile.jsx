import "bootstrap/dist/css/bootstrap.min.css";
import { default as React, useContext } from "react";
import "react-toastify/dist/ReactToastify.css";
import Cover from "../components/profile/Container/HeaderContainer/Cover";
import NavbarContainer from "../components/profile/Container/HeaderContainer/NavbarContainer";
import Navbar from "../components/profile/Navbar";
import Sidebar from "../components/profile/Sidebar";
import { AuthContext } from "../context/AuthContext";
import "../styles/user/header.css";
import "../styles/user/left-sidebar.css";
import "../styles/user/main-content.css";
import "../styles/user/profile.css";
import "../styles/user/right-sidebar.css";
import "../styles/user/style.css";
import Avatar from "../components/profile/Container/HeaderContainer/UserProfile/Avatar";
import FriendButton from "../components/profile/Container/HeaderContainer/UserProfile/FriendButton";

export default function Profile() {
  const { user } = useContext(AuthContext);

  return (
    <>
      <Navbar></Navbar>
      <div className="fb-container">
        <Sidebar></Sidebar>
        {/* profile page  */}
        <div className="profile-container">
          <Cover></Cover>
          <div className="profile-details">
            <Avatar></Avatar>
            <FriendButton></FriendButton>
          </div>
          <NavbarContainer></NavbarContainer>
          {/* <div className="profile-info">
            <div className="info-col">
              <div className="about-info">
                <h5>Giới thiệu</h5>
              </div>
              <div className="profile-about">
                <div className="class-profile">
                  <i className="fas fa-graduation-cap icon-profile" />
                  <span>Từng học tại Học Viện Ngân Hàng</span>
                </div>
                <div className="address-profile">
                  <i className="fas fa-map-marker-alt icon-profile" />
                  <span>Mỹ Tho</span>
                </div>
                <div className="picture-profile">
                  <div
                    className="picture-profile-1"
                    style={{
                      backgroundImage:
                        "linear-gradient(transparent, rgba(0,0,0,0.5)), url(./img/avatar-main.jpg)"
                    }}
                  ></div>
                </div>
              </div>
            </div>
            <div className="post-col">
              <div className="home-content">
                <div className="write-post-container">
                  <div className="user-profile">
                    <img src={user.avatar} />
                    <div>
                    
                      <p>{user.fullname}</p>
                      <small>
                        Public
                        <i className="fas fa-caret-down" />
                      </small>
                    </div>
                  </div>
                </div>
                <div className="post-input-container">
                  <textarea
                    name="textarea"
                    id="textarea"
                    placeholder="Bạn đang nghĩ gì thế?"
                    rows={3}
                    defaultValue={""}
                  />
                  <div className="add-post-links">
                    <a href="#">
                      <img src="./images/watch.png" /> Video trực tiếp
                    </a>
                    <a href="#">
                      <img src="./images/photo.png" /> Ảnh/video
                    </a>
                    <a href="#">
                      <img src="./images/feeling.png" /> Cảm xúc/hoạt động
                    </a>
                  </div>
                </div>
              </div>
              <div className="index-content">
                <div className="post-container">
                  <div className="user-profile">
                    <img src={user.avatar} />
                    <div>
                     
                      <p>{user.fullname}</p>
                      <div className="time-status">
                        <span>8 tháng 7 lúc 20:20</span>
                        <i
                          className="fas fa-globe-americas"
                          style={{ color: "#65676B" }}
                        />
                      </div>
                    </div>
                  </div>
                  <div className="post-user">
                    <p className="post-text">
                      Lâu rồi mới có thời gian rảnh sau giờ ăn tối cùng gia đình, để
                      đi rửa bát, đi lấy cơm cho bọn này. Mọi ngày phải lấy 3 bát
                      cơm. Hôm nay lấy có 2 bát tự dưng hụt hẫng ghê. Thế là em Dudu
                      10 tuổi đi cùng mẹ Kato rồi. Còn chưa được gặp e Dudu lần cuối
                      đã vội vã với những sự kiện đã được lên kế hoạch trước, kiếm
                      tiền cho đã rồi về không còn bên cạnh những điều mình yêu thì
                      có để làm gì đou chớ Kiếp sau đừng có ngã gãy chân nữa bà Dudu
                      ơi!
                    </p>
                  
                    <img src={"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT3QBGmFHi1Kk4KfViRu0M5iQL-On3HXvX0uQ&usqp=CAU"} className="post-img" />
                    <div className="activity-icons"></div>
                  </div>
                </div>
              </div>
            </div>
          </div> */}
        </div>
      </div>

    </>
  );
}


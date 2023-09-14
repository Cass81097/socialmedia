import "../../styles/user/sidebarProfile.css"
import React, { useContext } from "react";
import { ProfileContext } from "../../context/ProfileContext";

export default function SidebarProfile() {
    const { userProfile, setUserProfile, fetchUserProfile } = useContext(ProfileContext);
    console.log(userProfile)

    return (
        <>

            {/*msb: main sidebar*/}
            <div className="msb" id="msb">
                {/* Brand and toggle get grouped for better mobile display */}
                <div className="navbar-header">
                    <div className="brand-wrapper">
                        {/* Brand */}
                        <div className="brand-name-wrapper">
                            <h1 style={{ margin: "20px", color:"black", fontSize:"25px" }}>
                                Giới thiệu
                            </h1>
                        </div>
                    </div>
                </div>
                {/* Main Menu */}
                {userProfile[0] ? ( // Kiểm tra userProfile[0]
                    <div className="side-menu-container">
                        <ul className="nav navbar-nav">
                            <li className={"li"} >
                                <a className={"navbar-nav-item"} href="#">
                                    <i className="dashboard" /><span style={{color:"black"}}>Thông tin cá nhân</span> 
                                </a>
                            </li>
                        </ul>
                        <table style={{ borderCollapse: "collapse" }}>
                            <tbody>
                                <tr className="service" style={{ height: "60px" }}>
                                    <td className="tableitem" >
                                        <p className="itemtext">Họ và tên</p>
                                    </td>
                                    <td className="tableitem">
                                        <p className="itemtext">{userProfile[0].fullname || "Chưa có"}</p>
                                    </td>
                                </tr>
                                <tr className="service" style={{ height: "60px" }}>
                                    <td className="tableitem">
                                        <p className="itemtext">Địa chỉ</p>
                                    </td>
                                    <td className="tableitem">
                                        <p className="itemtext">{userProfile[0].address || "Chưa có"}</p>
                                    </td>
                                </tr>
                                <tr className="service" style={{ height: "60px" }} >
                                    <td className="tableitem">
                                        <p className="itemtext">Số điện thoại</p>
                                    </td>
                                    <td className="tableitem">
                                        <p className="itemtext">{userProfile[0].phone || "Chưa có"}</p>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                ) : null}
                {/* /.navbar-collapse */}
            </div>

        </>
    )
}
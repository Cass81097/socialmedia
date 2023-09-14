    import React, {useContext, useEffect, useState} from "react";
import "../styles/user/editUser.css"
import axios from "axios";
import { object, string, ref } from 'yup';
import * as Yup from "yup";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { ProfileContext } from "../context/ProfileContext";

export default function EditUser() {
    const { fetchUserProfile } = useContext(ProfileContext);

    const validationSchema = object({
        oldPassword: string().required('Password is required'),
        confirmPassword: string()
            .oneOf([Yup.ref('newPassword'), null], 'Passwords must match')
            .required('Please re-enter your password'),
    });

    const [isEditing, setIsEditing] = useState({
        username: false,
        fullname: false,
        email: false,
        password: false,
        address: false,
        phone: false,
    });
    const [isSaving, setIsSaving] = useState({
        username: false,
        fullname: false,
        email: false,
        password: false,
        address: false,
        phone: false,
    });
    const [isPasswordMatching, setIsPasswordMatching] = useState(true);
    const [arePasswordsEntered, setArePasswordsEntered] = useState(false);

    const [user, setUser] = useState({
        username: "",
        password: "",
        email: "",
        avatar: "",
        fullname: "",
    });

    const [passwordFields, setPasswordFields] = useState({
        oldPassword: "",
        newPassword: "",
        confirmPassword: "",
    });

    const handleToggleEdit = (field) => {
        setIsEditing((prevState) => ({
            ...prevState,
            [field]: !prevState[field],
        }));
    };

    const userProfiles = JSON.parse(localStorage.getItem("User"));
    // console.log(userProfiles)
    const username = userProfiles.username;
    const id = userProfiles.id;

    useEffect(() => {
        axios.get(`http://localhost:5000/users/find/${username}`).then((res) => {
            setUser(res.data[0]);
        });
    }, [username]);

    const handleSaveClick = (field) => {
        setIsSaving({}); // Đặt tất cả nút "Lưu" về false
        setIsSaving((prevState) => ({
            ...prevState,
            [field]: true, // Đặt nút "Lưu" mà bạn vừa bấm về true
        }));
        // Tạo một object chứa các thông tin cần cập nhật
        const updatedUser = {
            username: user.username,
            fullname: user.fullname,
            email: user.email,
            address: user.address,
            phone: user.phone,
        };

        axios.put(`http://localhost:5000/users/users/${id}`, updatedUser).then((res) => {
            // console.log("Cập nhật thành công!");
            toast.success("Cập nhật thành công.", toastOptions);
            setIsEditing({ ...isEditing, [field]: false }); // Tắt chế độ chỉnh sửa sau khi cập nhật thành công
            fetchUserProfile()
        }).catch((error) => {
            console.error("Lỗi khi cập nhật thông tin người dùng:", error);
        });
    };

    const handleSavePassword = () => {
        const updatedPassword = {
            oldPassword: passwordFields.oldPassword,
            newPassword: passwordFields.newPassword,
            confirmPassword: passwordFields.confirmPassword,
        };

        // Kiểm tra tính hợp lệ sử dụng Yup
        validationSchema.validate(updatedPassword, { abortEarly: false })
            .then(() => {
                // Nếu không có lỗi, thực hiện axios request
                axios.put(`http://localhost:5000/users/${id}`, updatedPassword)
                    .then((res) => {
                        // console.log(res)
                        if(res.data === "Mật khẩu cũ không đúng."){
                            toast.error("Mật khẩu cũ của bạn không đúng.", toastOptions);
                        }else {
                            setIsEditing({...isEditing, password: false});
                            if (res.data === "mat khau da duoc cap nhat" ) {
                                toast.success("Chỉnh sửa mật khẩu thành cong.", toastOptions);
                                setPasswordFields({
                                    oldPassword: "",
                                    newPassword: "",
                                    confirmPassword: "",
                                });
                            }
                        }
                    })

            })
            .catch((errors) => {
                toast.error("Vui lòng nhập đúng mật khẩu.", toastOptions);
                // console.log('Có lỗi trong quá trình cập nhật mật khẩu.',errors);
            });
    };


    // check pass
    const [checkPass, setCheckPass] = useState({
            newPassword: "",
            confirmPassword: ""
        });
    const check = ((info) => {
        setCheckPass((prevPass) => ({
            ...prevPass,
            ...info,
        }));
    }, []);
    // console.log(checkPass)
    const handlePasswordChange = (event) => {
        const { name, value } = event.target;
        setPasswordFields({ ...passwordFields, [name]: value });
    };

    const toastOptions = {
        position: "bottom-right",
        autoClose: 8000,
        pauseOnHover: true,
        draggable: true,
        theme: "dark",
    };



    return (
        <>
            <div>
                <div id="invoice" className="effect2">

                    {/*End Invoice Mid*/}
                    <div id="invoice-bot">
                        <div id="table">
                            <table>
                                <tbody>
                                <tr className="tabletitle">
                                    <td className="item">
                                        <h2 style={{color:"black", fontSize:"25px"}}>Thông tin</h2>
                                    </td>
                                    <td className="Hours">
                                        <h2 style={{color:"black", fontSize:"25px"}}>Mô tả </h2>
                                    </td>
                                    <td className="Hours" />
                                </tr>

                                <tr  className="service">
                                    <td className="tableitem">
                                        <p className="itemtext">Tên người dùng</p>
                                    </td>
                                    {isEditing.username ? (
                                        <>
                                            <td className="tableitem" >
                                                <input
                                                    className="itemtext"
                                                    type="text"
                                                    value={user.username}
                                                    onChange={(e) =>
                                                        setUser({...user, username: e.target.value})
                                                    }
                                                />
                                            </td>
                                            <td  className="tableitem">
                                                <button className="itemtext"
                                                        onClick={() => handleSaveClick("username")}>
                                                    Lưu
                                                </button>
                                            </td>
                                        </>
                                    ) : (
                                        <>
                                            <td className="tableitem">
                                                <p className="itemtext">{user.username}</p>
                                            </td>
                                            <td className="tableitem">
                                                <i className="item-table"></i>
                                            </td>
                                        </>
                                    )}
                                </tr>

                                <tr className="service">
                                    <td className="tableitem">
                                        <p className="itemtext">Email</p>
                                    </td>
                                    {isEditing.email ? (
                                        <>
                                            <td className="tableitem">
                                                <input
                                                    className="itemtext"
                                                    type="text"
                                                    value={user.email}
                                                    onChange={(e) =>
                                                        setUser({ ...user, email: e.target.value })
                                                    }
                                                />
                                            </td>
                                            <td className="tableitem">
                                                <i className="item-table"
                                                   // onClick={() => handleSaveClick("email")}
                                                ></i>
                                            </td>
                                        </>
                                    ) : (
                                        <>
                                            <td className="tableitem">
                                                <p className="itemtext">{user.email}</p>
                                            </td>
                                            <td className="tableitem">
                                                <i className="item-table "
                                                   // onClick={() => handleToggleEdit("email")}
                                                ></i>
                                            </td>
                                        </>
                                    )}
                                </tr>


                                <tr className="service">
                                    <td className="tableitem">
                                        <p className="itemtext">Họ và tên</p>
                                    </td>
                                    {isEditing.fullname ? (
                                        <>
                                            <td className="tableitem">
                                                <input
                                                    style={{ marginRight: "10px" }}
                                                    className="itemtext"
                                                    type="text"
                                                    value={user.fullname}
                                                    onChange={(e) =>
                                                        setUser({ ...user, fullname: e.target.value })
                                                    }
                                                />
                                            </td>
                                            <td className="tableitem">
                                                <i className="item-table fas fa-save fa-xs"
                                                   onClick={() => handleSaveClick("fullname")}></i>
                                            </td>
                                        </>
                                    ) : (
                                        <>
                                            <td className="tableitem">
                                                <p className="itemtext">{user.fullname}</p>
                                            </td>
                                            <td className="tableitem">
                                                <i style={{fontSize:"30px",margin : "10%"}}
                                                   className="item-table fas fa-edit" onClick={() => handleToggleEdit("fullname")}></i>
                                            </td>
                                        </>
                                    )}
                                </tr>


                                <tr className="service">
                                    <td className="tableitem">
                                        <p className="itemtext">Địa chỉ</p>
                                    </td>
                                    {isEditing.address ? (
                                        <>
                                            <td className="tableitem">
                                                <input
                                                    className="itemtext"
                                                    type="text"
                                                    value={user.address}
                                                    onChange={(e) =>
                                                        setUser({ ...user, address: e.target.value })
                                                    }
                                                />
                                            </td>
                                            <td className="tableitem">
                                                <i className="item-table fas fa-save fa-xs"
                                                   onClick={() => handleSaveClick("address")}></i>
                                            </td>
                                        </>
                                    ) : (
                                        <>
                                            <td className="tableitem">
                                                <p className="itemtext">{user.address}</p>
                                            </td>
                                            <td className="tableitem">
                                                <i className="item-table fas fa-edit" onClick={() => handleToggleEdit("address")}></i>
                                            </td>
                                        </>
                                    )}
                                </tr>
                                <tr className="service">
                                    <td className="tableitem">
                                        <p className="itemtext">Số điện thoại</p>
                                    </td>
                                    {isEditing.phone ? (
                                        <>
                                            <td className="tableitem">
                                                <input
                                                    className="itemtext"
                                                    type="number"
                                                    value={user.phone}
                                                    onChange={(e) =>
                                                        setUser({ ...user, phone: e.target.value })
                                                    }
                                                />
                                            </td>
                                            <td className="tableitem">
                                                <i className="item-table fas fa-save fa-xs"
                                                   onClick={() => handleSaveClick("phone")}></i>
                                            </td>
                                        </>
                                    ) : (
                                        <>
                                            <td className="tableitem">
                                                <p className="itemtext">{user.phone}</p>
                                            </td>
                                            <td className="tableitem">
                                                <i className="item-table fas fa-edit" onClick={() => handleToggleEdit("phone")}></i>
                                            </td>
                                        </>
                                    )}
                                </tr>

                                {/*password*/}

                                {!isEditing.password ? (
                                    <tr className="service">
                                        <td className="tableitem">
                                            <p className="itemtext">Mật khẩu</p>
                                        </td>
                                        <td className="tableitem">
                                            <input
                                                className="itemtext"
                                                type="password"
                                                value={user.password}
                                                readOnly
                                            />
                                        </td>
                                        <td className="tableitem">
                                            <i className="item-table fas fa-edit"  onClick={() => handleToggleEdit("password")}></i>
                                        </td>
                                    </tr>
                                ) : (
                                    <>
                                        <tr className="service">
                                            <td className="tableitem">
                                                <p className="itemtext">Mật khẩu cũ</p>
                                            </td>
                                            <td className="tableitem">
                                                <input
                                                    placeholder={"Vui lòng nhập mật khẩu cũ của bạn"}
                                                    className="itemtext"
                                                    type="password"
                                                    name="oldPassword"
                                                    style={{ fontSize: "15px" }}
                                                    value={passwordFields.oldPassword}
                                                    onChange={handlePasswordChange}
                                                />
                                            </td>
                                            <td className="tableitem">
                                                <i className="item-table"></i>

                                            </td>
                                        </tr>
                                        <tr className="service">
                                            <td className="tableitem">
                                                <p className="itemtext">Mật khẩu mới</p>
                                            </td>
                                            <td className="tableitem">
                                                <input
                                                    placeholder={"Vui lòng nhập mật khẩu mới của bạn"}
                                                    className="itemtext"
                                                    type="password"
                                                    name="newPassword"
                                                    style={{ fontSize: "15px" }}
                                                    value={passwordFields.newPassword}
                                                    onChange={handlePasswordChange}
                                                />
                                            </td>
                                            <td className="tableitem">
                                                <i className="item-table"></i>
                                            </td>
                                        </tr>
                                        <tr className="service">
                                            <td className="tableitem">
                                                <p className="itemtext">Xác nhận mật khẩu mới</p>
                                            </td>
                                            <td className="tableitem">
                                                <input className="itemtext" type="password" name="confirmPassword"
                                                       placeholder={"Vui lòng nhập lại mật khẩu mới"}
                                                       value={passwordFields.confirmPassword}
                                                       style={{ fontSize: "15px" }}
                                                       onChange={handlePasswordChange}
                                                />
                                                {/*{arePasswordsEntered && !isPasswordMatching && <span className="error-message">Mật khẩu không trùng khớp.</span>}*/}
                                            </td>
                                            <td className="tableitem">
                                                <i className="item-table fas fa-save fa-xs" onClick={handleSavePassword}></i>
                                            </td>
                                        </tr>

                                    </>
                                )}
                                {/* Kết thúc phần mật khẩu */}
                                </tbody>
                            </table>
                        </div>
                        {/*End Table*/}
                    </div>
                    {/*End InvoiceBot*/}
                </div>
                {/*End Invoice*/}
            </div>
            <ToastContainer />
        </>
    );
}

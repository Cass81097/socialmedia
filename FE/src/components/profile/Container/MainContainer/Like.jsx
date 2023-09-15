import axios from "axios";
import customAxios from "../../../../service/api";
import {useContext} from "react";
import {AuthContext} from "../../../../context/AuthContext";

export default function Like(){
    const { user } = useContext(AuthContext) // lay thong tin cua user dang nhap
    console.log(user.id)
    const  handleAddLike = (()=>{
        customAxios.post(`/likes/add-likes/1`).then((res)=>{
            console.log(1,res)
        })
    })
    return (
        <>
            <div><i className="fas fa-thumbs-up" onClick={handleAddLike}>
                {/*so luong*/}
            </i></div>
        </>
    )

}
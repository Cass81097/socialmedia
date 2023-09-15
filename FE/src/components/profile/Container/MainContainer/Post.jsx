import Like from "./Like";
import {useEffect, useState} from "react";
import customAxios from "../../../../service/api";

export default function Post(){
  const [list , setList] = useState([])

  useEffect(()=>{
    customAxios.get("/status").then((res)=>{
      setList(res.data)
    })
  },[])
  console.log(list)


    return (
        <>
            <div className="post-col">

              <div className="index-content">
                {list.map((item)=>(
                  <div className="post-container">
                    <div className="user-profile">
                      <div>
                        <h1>{item.namePost}</h1>
                        <div>Ten nguoi dang : {item.user.username}</div>


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
                        {item.content}
                      </p>

                      <img src={item.image} className="post-img" />
                      <div className="activity-icons"></div>

                    </div>
                  </div>

                ))}


              </div>
             <Like></Like>

            </div>

        </>
    )
}
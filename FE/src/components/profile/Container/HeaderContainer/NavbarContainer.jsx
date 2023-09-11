import React, { useContext } from "react";
import { AuthContext } from "../../../../context/AuthContext";

export default function NavbarContainer() {
    const { user } = useContext(AuthContext);

    return (  
            <div className="all-task">
                <div className="post-task">
                    <a href="#">
                        <span>Bài viết</span>
                    </a>
                </div>
                <div className="profile-task">
                    <a href="#">
                        <span>Giới thiệu</span>
                    </a>
                </div>
          </div>
    )
}




// import React, { useContext } from "react";
// import { AuthContext } from "../../../../context/AuthContext";

// export default function NavbarContainer() {
//     const { user } = useContext(AuthContext);

//     return (
//         <>
           
//         </>
//     )
// }
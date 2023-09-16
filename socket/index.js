const { Server } = require("socket.io");

// Chỉ định số cổng mong muốn
const port = 3000;

const io = new Server({
    cors: "http://localhost:3001",
});

let onlineUsers = [];

io.on("connection", (socket) => {
    // console.log("new connection", socket.id);

    socket.on("addNewUser", (userId) => {
        if (userId !== null) {
            const existingUser = onlineUsers.find(user => user.userId === userId);
            if (!existingUser) {
                onlineUsers.push({
                    userId,
                    socketId: socket.id
                });
            }
            // console.log("onlineUsers", onlineUsers);

            io.emit("getOnlineUsers", onlineUsers);
        }
    });

    socket.on("disconnect", () => {
        onlineUsers = onlineUsers.filter(user => user.socketId !== socket.id)
        io.emit("getOnlineUsers", onlineUsers)
    })

    socket.on("sendFriendRequest", (data) => {
        // Lấy thông tin từ dữ liệu yêu cầu kết bạn
        const { senderId, receiverId } = data;

        // Kiểm tra xem người nhận yêu cầu kết bạn có đang trực tuyến hay không
        const receiver = onlineUsers.find(user => user.userId === receiverId);
        if (receiver) {
            io.to(receiver.socketId).emit("friendRequest", { senderId, receiverId });
        } else {
            // Người nhận không trực tuyến, thực hiện các xử lý khác (ví dụ: gửi thông báo, lưu vào cơ sở dữ liệu, vv.)
        }
    });

    socket.on("acceptFriendRequest", (data) => {
        // Lấy thông tin từ dữ liệu yêu cầu kết bạn
        const { senderId, receiverId } = data;
        console.log(data, "cancel");

        // Kiểm tra xem người nhận yêu cầu kết bạn có đang trực tuyến hay không
        const receiver = onlineUsers.find(user => user.userId === receiverId);
        if (receiver) {
            io.to(receiver.socketId).emit("friendRequestAccepted", { senderId, receiverId });
        } else {
            // Người nhận không trực tuyến, thực hiện các xử lý khác (ví dụ: gửi thông báo, lưu vào cơ sở dữ liệu, vv.)
        }
    });

});

// Khởi động máy chủ trên cổng đã chỉ định
io.listen(port, () => {
    console.log(`Socket.IO server is running on port ${port}`);
});
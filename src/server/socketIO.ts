// import { Server } from "socket.io"
export default (io: any) => {
  io.on("connect", (socket: any) => {
    // === Get User Connect ID === //
    console.log(`connect ${socket.id}`);
    // === Get User Connect ID === //
    // === Disconnect === //
    socket.on("disconnect", () => {
      console.log(`disconnect ${socket.id}`);
    });
    // === Disconnect === //
  });
};

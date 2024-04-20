"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// import { Server } from "socket.io"
exports.default = (io) => {
    io.on("connect", (socket) => {
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

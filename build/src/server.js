"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const socket_io_1 = require("socket.io");
// ==================== //
// ===== SERVERS ====== //
// ==================== //
const express_1 = require("./server/express"); // === EXPRESS Server
const socketIO_1 = __importDefault(require("./server/socketIO")); // === SocketIO Server
// ==================== //
// ===== SERVERS ====== //
// ==================== //
// ======================= //
// === EXPRESS Server ==== //
// ======================= //
const http_1 = __importDefault(require("http")); // === Connect HTTP Server
const cors_1 = require("./config/cors");
// ======================= //
// === EXPRESS Server ==== //
// ======================= //
// === Server Listen ===== //
// ======================= //
const server = http_1.default.createServer(express_1.exp);
server.listen(cors_1.port, cors_1.ipV4, () => {
    console.log(`${cors_1.ipV4}:${cors_1.port} - ${cors_1.ServerIP}`);
});
// ======================= //
// === Server Listen ===== //
// ======================= //
// === SocketIO Server === //
// ======================= //
const io = new socket_io_1.Server(server, {
    cors: {
        origin: cors_1.whitelist,
        credentials: true,
        methods: ["GET", "PUT", "POST"],
    },
    maxHttpBufferSize: 1e8,
});
(0, socketIO_1.default)(io);
// ======================= //
// === SocketIO Server === //
// ======================= //

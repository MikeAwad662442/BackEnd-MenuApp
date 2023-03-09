import { Server, Socket } from "socket.io";
// ==================== //
// ===== SERVERS ====== //
// ==================== //
import { exp } from "./server/express"; // === EXPRESS Server
import _Socket from "./server/socketIO"; // === SocketIO Server
// ==================== //
// ===== SERVERS ====== //
// ==================== //
// ======================= //
// === EXPRESS Server ==== //
// ======================= //
import http from "http"; // === Connect HTTP Server
import { ipV4, port, ServerIP, whitelist } from "./config/cors";
// ======================= //
// === EXPRESS Server ==== //
// ======================= //
// === Server Listen ===== //
// ======================= //
const server = http.createServer(exp);
server.listen(port, ipV4, () => {
  console.log(`${ipV4}:${port} - ${ServerIP}`);
});
// ======================= //
// === Server Listen ===== //
// ======================= //
// === SocketIO Server === //
// ======================= //
const io = new Server(server, {
  cors: {
    origin: whitelist,
    credentials: true,
    methods: ["GET", "PUT", "POST"],
  },
  maxHttpBufferSize: 1e8,
});
_Socket(io);
// ======================= //
// === SocketIO Server === //
// ======================= //

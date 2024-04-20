"use strict";
// FINISH 01 / 03 / 2023
// ==================== //
// = SERVERS IP Address //
// ==================== //
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.port = exports.ipV4 = exports.ServerIP = exports.whitelist = exports.corsWithOptions = void 0;
// find the IP address to the Server
// Create Whitelist To CORSE
// save IP Address to file that red bu IONIC front APP
const cors_1 = __importDefault(require("cors"));
const fs_1 = __importDefault(require("fs"));
const address_1 = __importDefault(require("address"));
// === Server IP address === //
const port = 662; // Add Server Port
exports.port = port;
const ipV4 = address_1.default.ip(); // Add Server IP
exports.ipV4 = ipV4;
const ServerIP = GetIP(ipV4, port);
exports.ServerIP = ServerIP;
const Cors = (0, cors_1.default)();
// === Server IP address === //
const whitelist = [
    ServerIP,
    "*",
    "*:*",
    "http://localhost:662",
    "http://127.0.0.1:662",
    "capacitor://localhost",
    "ionic://localhost",
    "http://localhost",
    "http://localhost:8080",
    "http://127.0.0.1:8080",
    "http://localhost:8100",
    "http://localhost:8101",
    "http://localhost:4000",
];
exports.whitelist = whitelist;
// === Cors With Options === //
var corsOptionsDelegate = (req, callback) => {
    let corsOptions;
    if (whitelist.indexOf(req.header("Origin")) !== -1) {
        corsOptions = { origin: true };
    }
    else {
        corsOptions = { origin: false };
    }
    callback(null, corsOptions);
};
const corsWithOptions = (0, cors_1.default)(corsOptionsDelegate);
exports.corsWithOptions = corsWithOptions;
// === Cors With Options === //
// === UpDate Ip Address === //
function GetIP(ipV4, port) {
    const ipFile = fs_1.default.existsSync('./../www/assets/ip.json');
    if (ipFile === true) {
        const ipJson = require("./www/assets/ip.json");
        if (ipJson.ip !== ipV4) {
            var newIP = {
                ip: ipV4,
                port: port
            };
            var newServer = JSON.stringify(newIP);
            fs_1.default.writeFileSync("./www/assets/ip.json", newServer);
            var Server = `http://${ipV4}:${port}`;
            return Server;
        }
        else {
            var newServer = `http://${ipJson.ip}:${ipJson.port}`;
            return newServer;
        }
    }
    else {
        var newIP = {
            ip: ipV4,
            port: port
        };
        var newServer = JSON.stringify(newIP);
        fs_1.default.writeFileSync("./www/assets/ip.json", newServer);
        var Server = `http://${ipV4}:${port}`;
        return Server;
    }
}

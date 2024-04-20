"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const electron_1 = require("electron");
const path_1 = __importDefault(require("path"));
const cors_1 = require("../config/cors");
// import url from "url";
const debug = process.env.DEBUG;
electron_1.app.on("ready", ready);
electron_1.app.on("window-all-closed", closeWindow);
electron_1.app.on("activate", activate);
function ready() {
    const appWindow = new electron_1.BrowserWindow({
        width: 800,
        height: 600,
        icon: path_1.default.join(__dirname, "../icons/icon.png"),
        backgroundColor: '#000000',
        webPreferences: {
            nodeIntegration: true,
            devTools: false, // disable dev tools
        },
    });
    appWindow.loadURL(`${cors_1.ServerIP}/`);
    // appWindow.webContents.openDevTools();
    appWindow.maximize();
}
function activate() {
    if (electron_1.BrowserWindow.getAllWindows().length === 0) {
        ready();
    }
}
function closeWindow() {
    if (process.platform !== "darwin") {
        electron_1.app.quit();
    }
    process.exit(0);
}
electron_1.Menu.setApplicationMenu(null);

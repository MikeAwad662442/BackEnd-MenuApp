import { app, BrowserWindow, Menu } from "electron";
import path from "path";
import { ServerIP } from "../config/cors";
// import url from "url";

const debug = process.env.DEBUG;
app.on("ready", ready);
app.on("window-all-closed", closeWindow);
app.on("activate", activate);

function ready() {
  const appWindow = new BrowserWindow({
    width: 800,
    height: 600,
    icon: path.join(__dirname, "../icons/icon.png"),
    backgroundColor: '#000000',
    webPreferences: {
      nodeIntegration: true,
      devTools: false, // disable dev tools
    },
  });
  
  appWindow.loadURL(`${ServerIP}/`);
  // appWindow.webContents.openDevTools();
  appWindow.maximize();
}
function activate() {
  if (BrowserWindow.getAllWindows().length === 0) {
    ready();
  }
}
function closeWindow() {
  if (process.platform !== "darwin") {
    app.quit();
  }
  process.exit(0);
}
Menu.setApplicationMenu(null);
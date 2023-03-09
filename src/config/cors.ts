// FINISH 01 / 03 / 2023
// ==================== //
// = SERVERS IP Address //
// ==================== //

// find the IP address to the Server
// Create Whitelist To CORSE
// save IP Address to file that red bu IONIC front APP
import cors from "cors";
import fs from "fs";
import address from "address";
interface ServerIP {
  ip: string,
  port: string
}
// === Server IP address === //
const port = 662; // Add Server Port
const ipV4 = address.ip(); // Add Server IP
const ServerIP: any = GetIP(ipV4, port);
const Cors = cors();
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

// === Cors With Options === //
var corsOptionsDelegate = (req: any, callback: any) => {
  let corsOptions;
  if (whitelist.indexOf(req.header("Origin")) !== -1) {
    corsOptions = { origin: true };
  } else {
    corsOptions = { origin: false };
  }
  callback(null, corsOptions);
};
const corsWithOptions = cors(corsOptionsDelegate);
// === Cors With Options === //
// === UpDate Ip Address === //
function GetIP(ipV4: any, port: any) {
  const ipFile = fs.existsSync('./../www/assets/ip.json')
  if (ipFile === true) {
    const ipJson = require("./www/assets/ip.json")
    if (ipJson.ip !== ipV4) {
      var newIP = {
        ip: ipV4,
        port: port
      }
      var newServer = JSON.stringify(newIP);
      fs.writeFileSync("./www/assets/ip.json", newServer);
      var Server = `http://${ipV4}:${port}`;
      return Server;
    } else {
      var newServer = `http://${ipJson.ip}:${ipJson.port}`;
      return newServer;
    }
  } else {
    var newIP = {
      ip: ipV4,
      port: port
    }
    var newServer = JSON.stringify(newIP);
    fs.writeFileSync("./www/assets/ip.json", newServer);
    var Server = `http://${ipV4}:${port}`;
    return Server;
  }
}
// === UpDate Ip Address === //
export { corsWithOptions, whitelist, ServerIP, ipV4, port };

import { C_QR, QR } from "../../models/cPanel/cQR_M";

// === Get QR Info === //
const qrGet = async () => {
  let newRes: any;
  try {
    const getQR = await C_QR.findAll();
    newRes = getQR;
    // console.log(newRes);
  } catch (e) {
    newRes = e;
  }
  return newRes; // === Send Language Data to Front
};
// === Get QR Info === //
// === Update QR Info === //
const qrUpdate = async (res: QR) => {
  // console.log("QR Insert ::", res);
  // const id = res.id;
  // const wifiName = res.wifiName;
  // const wifiPass = res.wifiPass;
  // const wifiType = res.wifiType;
  // const wifiHidden = res.wifiHidden;
  // const serverURL = res.serverURL;
  let newRes: any;

  // console.log(
  //   "wifiName::",
  //   wifiName,
  //   "wifiPass::",
  //   wifiPass,
  //   "wifiType::",
  //   wifiType,
  //   "wifiHidden::",
  //   wifiHidden,
  //   "serverURL::",
  //   serverURL
  // );
  try {
    const getQR = await C_QR.findAll();
    // console.log("QR getQR.length ::", getQR.length);
    if (getQR.length === 0) {
      await C_QR.create(res);
    } else {
      await C_QR.update(res, { where: { id: res.id } });
    }
    // if (getQR.length === 0) {
    //   await C_QR.create({
    //     wifiName: wifiName,
    //     wifiPass: wifiPass,
    //     wifiType: wifiType,
    //     wifiHidden: wifiHidden,
    //     serverURL: serverURL,
    //   });
    // } else {
    //   await C_QR.update(
    //     { wifiName, wifiPass, wifiType, wifiHidden, serverURL },
    //     { where: { id: id } }
    //   );
    // }
    newRes = true;
  } catch (e) {
    newRes = e;
  }
  // console.log("QR ::", newRes);
  return newRes; // === Send true || errors
};
// === Update All Languages Info === //
// === Export Function === //
export { qrGet, qrUpdate };
// === Export Function === //

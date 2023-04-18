// =================== //
// === QR Server ===== //
// =================== //

/**
 * QR Table
 * Import Facility LOGO
 * WIFI Info
 * Update INFO && PRINT
 */

import { C_QR, QR } from "../../models/cPanel/cQR_M";

// === Get QR Info === //
const qrGet = async () => {
  let newRes: any;
  try {
    await C_QR.findAll().then(async (getQR: C_QR[]) => {
      newRes = getQR;
    });
  } catch (e) {
    newRes = e;
  }
  return newRes; // === Send Language Data to Front || errors
};
// === Get QR Info === //
// === Update QR Info === //
const qrUpdate = async (res: QR) => {
  let newRes: any;
  // console.log("wifiName::",wifiName,"wifiPass::",wifiPass,"wifiType::",wifiType,"wifiHidden::",wifiHidden,"serverURL::",serverURL);
  try {
    await C_QR.findAll().then(async (getQR: C_QR[]) => {
      if (getQR.length === 0) {
        await C_QR.create(res);
      } else {
        await C_QR.update(res, { where: { id: res.id } });
      }
    });
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

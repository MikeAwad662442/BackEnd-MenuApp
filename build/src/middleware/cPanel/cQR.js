"use strict";
// =================== //
// === QR Server ===== //
// =================== //
Object.defineProperty(exports, "__esModule", { value: true });
exports.qrUpdate = exports.qrGet = void 0;
/**
 * QR Table
 * Import Facility LOGO
 * WIFI Info
 * Update INFO && PRINT
 */
const cQR_M_1 = require("../../models/cPanel/cQR_M");
// === Get QR Info === //
const qrGet = async () => {
    let newRes;
    try {
        await cQR_M_1.C_QR.findAll().then(async (getQR) => {
            newRes = getQR;
        });
    }
    catch (e) {
        newRes = e;
    }
    return newRes; // === Send Language Data to Front || errors
};
exports.qrGet = qrGet;
// === Get QR Info === //
// === Update QR Info === //
const qrUpdate = async (res) => {
    let newRes;
    // console.log("wifiName::",wifiName,"wifiPass::",wifiPass,"wifiType::",wifiType,"wifiHidden::",wifiHidden,"serverURL::",serverURL);
    try {
        await cQR_M_1.C_QR.findAll().then(async (getQR) => {
            if (getQR.length === 0) {
                await cQR_M_1.C_QR.create(res);
            }
            else {
                await cQR_M_1.C_QR.update(res, { where: { id: res.id } });
            }
        });
        newRes = true;
    }
    catch (e) {
        newRes = e;
    }
    // console.log("QR ::", newRes);
    return newRes; // === Send true || errors
};
exports.qrUpdate = qrUpdate;
// === Export Function === //

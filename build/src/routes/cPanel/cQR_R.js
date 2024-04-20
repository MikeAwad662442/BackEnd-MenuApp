"use strict";
// =================== //
// === QR Server ===== //
// =================== //
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.QR = void 0;
/**
 * QR Table
 * Import Facility LOGO
 * WIFI Info
 * Update INFO && PRINT
 */
const express_1 = __importDefault(require("express"));
const cors_1 = require("../../config/cors");
const cQR_1 = require("../../middleware/cPanel/cQR");
const cFacility_1 = require("../../middleware/cPanel/cFacility");
const QR = express_1.default.Router();
exports.QR = QR;
QR.route("/")
    // Get
    .get(cors_1.corsWithOptions, async (req, res, next) => {
    try {
        const cQR_Get = await (0, cQR_1.qrGet)();
        const cFacilityGet = await (0, cFacility_1.facilityGet)();
        return res.json({
            cQR_Get: cQR_Get,
            cFacilityGet: cFacilityGet,
        });
    }
    catch (e) {
        return res.json(e);
    }
})
    // Update
    .put(cors_1.corsWithOptions, async (req, res, next) => {
    try {
        await (0, cQR_1.qrUpdate)(req.body).then((cQrUpdate) => {
            return res.json(cQrUpdate);
        });
    }
    catch (e) {
        return res.json(e);
    }
});

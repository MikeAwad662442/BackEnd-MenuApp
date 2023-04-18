// =================== //
// === QR Server ===== //
// =================== //

/**
 * QR Table
 * Import Facility LOGO
 * WIFI Info
 * Update INFO && PRINT
 */

import express, { Request, Response, NextFunction } from "express";
import { corsWithOptions } from "../../config/cors";
import { qrGet, qrUpdate } from "../../middleware/cPanel/cQR";
import { facilityGet } from "../../middleware/cPanel/cFacility";
import { QR } from "../../models/cPanel/cQR_M";
const QR = express.Router();
QR.route("/")
  // Get
  .get(
    corsWithOptions,
    async (req: Request, res: Response, next: NextFunction) => {
      try {
        const cQR_Get = await qrGet();
        const cFacilityGet = await facilityGet();
        return res.json({
          cQR_Get: cQR_Get,
          cFacilityGet: cFacilityGet,
        });
      } catch (e) {
        return res.json(e);
      }
    }
  )
  // Update
  .put(
    corsWithOptions,
    async (req: Request, res: Response, next: NextFunction) => {
      try {
        await qrUpdate(req.body).then((cQrUpdate) => {
          return res.json(cQrUpdate);
        });
      } catch (e) {
        return res.json(e);
      }
    }
  );

// === Export QR Router === //
export { QR };

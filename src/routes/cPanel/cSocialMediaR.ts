// ==================== //
// === Social Media === //
// ==================== //

/**
 * SocialMedia Table
 * add Social Media Icon && Links
 * Frond Page have SocialMedia && Facility
 */

import express, { Request, Response, NextFunction } from "express";
import { corsWithOptions } from "../../config/cors";
import { socialGet, socialUpdate } from "../../middleware/cPanel/cSocialMedia";
import { facilityGet, facilityUpdate } from "../../middleware/cPanel/cFacility";
import { IMGup, fileDB } from "../../middleware/UploadFile/UpFiles";
import { FacilityInfo } from "../../models/cPanel/cFacilityM";

const SocialMediaRouter = express.Router();
SocialMediaRouter.route("/")
  // GET
  .get(
    corsWithOptions,
    async (req: Request, res: Response, next: NextFunction) => {
      try {
        const cSocialGet = await socialGet();
        const cFacilityGet = await facilityGet();
        return res.json({
          cSocialGet: cSocialGet,
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
    IMGup.single("File"),
    async (req: Request, res: Response, next: NextFunction) => {
      const FullInfo: FacilityInfo = req.body;
      const FacilityID = FullInfo.FacilityID;
      const FacilityName = FullInfo.FacilityName;
      const FacilityImageType = FullInfo.FacilityImageType;
      const IMG = await fileDB(
        req.file?.path,
        req.body.File,
        FacilityImageType
      ); //
      // === Console LOG === //
      console.log("FullSocialMedia Update :", req.file?.path);
      // console.log("IMG to DB ::", IMG);
      // === Console LOG === //
      try {
        const cSocialUpdate = await socialUpdate(FullInfo.upSocialMedia);
        const cFacilityGet = await facilityUpdate(
          FacilityID,
          FacilityName,
          IMG,
          FacilityImageType
        );
        if (cSocialUpdate === true && cFacilityGet === true) {
          // console.log("IF everything work well");
          return res.json(true);
        }
      } catch (e) {
        return res.json(e);
      }
    }
  );

// === Export Social Media Router === //
export { SocialMediaRouter };

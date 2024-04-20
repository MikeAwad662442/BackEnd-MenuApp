"use strict";
// ==================== //
// === Social Media === //
// ==================== //
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SocialMediaRouter = void 0;
/**
 * SocialMedia Table
 * add Social Media Icon && Links
 * Frond Page have SocialMedia && Facility
 */
const express_1 = __importDefault(require("express"));
const cors_1 = require("../../config/cors");
const cSocialMedia_1 = require("../../middleware/cPanel/cSocialMedia");
const cFacility_1 = require("../../middleware/cPanel/cFacility");
const UpFiles_1 = require("../../middleware/UploadFile/UpFiles");
const SocialMediaRouter = express_1.default.Router();
exports.SocialMediaRouter = SocialMediaRouter;
SocialMediaRouter.route("/")
    // GET
    .get(cors_1.corsWithOptions, async (req, res, next) => {
    try {
        const cSocialGet = await (0, cSocialMedia_1.socialGet)();
        const cFacilityGet = await (0, cFacility_1.facilityGet)();
        return res.json({
            cSocialGet: cSocialGet,
            cFacilityGet: cFacilityGet,
        });
    }
    catch (e) {
        return res.json(e);
    }
})
    // Update
    .put(cors_1.corsWithOptions, UpFiles_1.IMGup.single("File"), async (req, res, next) => {
    const FullInfo = req.body;
    const FacilityID = FullInfo.FacilityID;
    const FacilityName = FullInfo.FacilityName;
    const FacilityImageType = FullInfo.FacilityImageType;
    const IMG = await (0, UpFiles_1.fileDB)(req.file?.path, req.body.File, FacilityImageType); //
    // === Console LOG === //
    // console.log("FullSocialMedia Update :", req.body.File);
    // console.log("IMG to DB ::", IMG);
    // === Console LOG === //
    try {
        const cSocialUpdate = await (0, cSocialMedia_1.socialUpdate)(FullInfo.upSocialMedia);
        const cFacilityGet = await (0, cFacility_1.facilityUpdate)(FacilityID, FacilityName, IMG, FacilityImageType);
        if (cSocialUpdate === true && cFacilityGet === true) {
            // console.log("IF everything work well");
            return res.json(true);
        }
    }
    catch (e) {
        return res.json(e);
    }
});

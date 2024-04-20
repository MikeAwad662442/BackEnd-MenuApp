"use strict";
// =============== //
// == Item Type == //
// =============== //
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ItemTypesRouter = void 0;
/**
 * Item Type it`s Lv.1 of Menu
 * It`s includes the first and main level of classification of lists
 *
 * GET / UPDATE / INSERT / DELETE
 * ORDER LIST for Item Type
 * Active Item Type || Not
 * Note :: For Item Type,
 *      the Name of Item Type must be included but Body isn't required
 */
const express_1 = __importDefault(require("express"));
const cors_1 = require("../../config/cors");
const UpFiles_1 = require("../../middleware/UploadFile/UpFiles");
const vItemType_1 = require("../../middleware/Items/vItemType");
const ItemTypesRouter = express_1.default.Router();
exports.ItemTypesRouter = ItemTypesRouter;
/** GET ItemTypes && ItemTypes INFO page **/
// === Get All ItemTypes from Server by Front Language === //
ItemTypesRouter.route("/view/:lang")
    // GET
    .get(cors_1.corsWithOptions, async (req, res, next) => {
    const Lang = req.params.lang; // === Active Language
    try {
        await (0, vItemType_1.ItemTypesGatAll)(Lang).then((ItemTypeSend) => {
            return res.json(ItemTypeSend);
        });
    }
    catch (e) {
        return res.json(e);
    }
});
// === Get All ItemTypes from Server by Front Language === //
// === Get  ItemType By ID from Server by Front Language === //
ItemTypesRouter.route("/view/:lang/:ID")
    // GET
    .get(cors_1.corsWithOptions, async (req, res, next) => {
    const Lang = req.params.lang; // === Active Language
    const ID = req.params.ID; // === ItemTypeID
    try {
        await (0, vItemType_1.ItemTypesGat)(Lang, ID).then((ItemTypeSend) => {
            return res.json(ItemTypeSend);
        });
    }
    catch (e) {
        return res.json(e);
    }
});
// === Get  ItemTypes By ID from Server by Front Language === //
/** GET ItemTypes && ItemTypes INFO page **/
/** GET ItemTypes page && INFO page **/
/** ( GET & UPDATE ) UPDATE page **/
ItemTypesRouter.route("/Update/:ID")
    // GET
    .get(cors_1.corsWithOptions, async (req, res, next) => {
    // const params = req.params;
    const ID = req.params.ID; // === Event ID
    try {
        await (0, vItemType_1.ItemTypeGetUpdateID)(ID).then((ItemTypeSend) => {
            return res.json(ItemTypeSend);
        });
    }
    catch (e) {
        return res.json(e);
    }
})
    // Update
    .put(cors_1.corsWithOptions, 
// TokenCheck,
// ifAdmin,
UpFiles_1.fileUp.single("File"), async (req, res, next) => {
    const ID = req.params.ID; // === ItemTypeID
    const Full = req.body;
    const Active = Full.Active;
    const ImageType = Full.ImageType;
    const InfoArray = Full.InfoArray;
    const IMG = await (0, UpFiles_1.fileDB)(req.file?.path, req.body.File, ImageType); // Files Ro Images To DB
    try {
        await (0, vItemType_1.ItemTypesUpdateID)(ID, IMG, ImageType, Active, InfoArray).then((ItemTypeSend) => {
            return res.json(ItemTypeSend); // True/False
        });
    }
    catch (e) {
        return res.json(e);
    }
})
    // Delete
    .delete(cors_1.corsWithOptions, 
// TokenCheck,
// ifAdmin,
async (req, res, next) => {
    const ID = req.params.ID; // === ItemTypeID
    try {
        await (0, vItemType_1.ItemTypeDelete)(ID).then((ItemTypeSend) => {
            return res.json(ItemTypeSend); // True/False
        });
    }
    catch (e) {
        return res.json(e);
    }
});
ItemTypesRouter.route("/Update")
    // Update
    .put(cors_1.corsWithOptions, 
// TokenCheck,
// ifAdmin,
UpFiles_1.fileUp.single("File"), async (req, res, next) => {
    const Full = req.body;
    const Active = Full.Active;
    const ImageType = Full.ImageType;
    const InfoArray = Full.InfoArray;
    const IMG = await (0, UpFiles_1.fileDB)(req.file?.path, req.body.File, ImageType); // Files Ro Images To DB
    // console.log("Full ::", Full, "Active ::", Active);
    try {
        await (0, vItemType_1.ItemTypeNew)(IMG, ImageType, Active, InfoArray).then((ItemTypeSend) => {
            return res.json(ItemTypeSend); // True/False
        });
    }
    catch (e) {
        return res.json(e);
    }
})
    // Delete
    .delete(cors_1.corsWithOptions, 
// TokenCheck,
// ifAdmin,
async (req, res, next) => {
    const ID = req.params.ID; // === ItemTypeID
    try {
        await (0, vItemType_1.ItemTypeDelete)(ID).then((ItemTypeSend) => {
            return res.json(ItemTypeSend); // True/False
        });
    }
    catch (e) {
        return res.json(e);
    }
});
/** GET & UPDATE UPDATE page **/
/** Update Location of ItemType in View All ItemType Page **/
ItemTypesRouter.route("/OrderList")
    // Update
    .put(cors_1.corsWithOptions, 
// TokenCheck,
// ifAdmin,
async (req, res, next) => {
    const Full = req.body;
    try {
        await (0, vItemType_1.ItemTypesOrderList)(Full).then((ItemTypeSend) => {
            return res.json(ItemTypeSend); // True/False
        });
    }
    catch (e) {
        return res.json(e);
    }
});

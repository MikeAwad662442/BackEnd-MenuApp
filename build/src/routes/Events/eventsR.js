"use strict";
// =============== //
// ==== Events === //
// =============== //
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.EventsRouter = void 0;
/**
 * EVENTS && EVENTS Languages Tables
 * GET / UPDATE / INSERT / DELETE
 * ORDER LIST for Events
 * Active Event || Not
 * Note :: For Event,
 *      the Name of Event must be included but Body isn't required
 */
const express_1 = __importDefault(require("express"));
const cors_1 = require("../../config/cors");
const UpFiles_1 = require("../../middleware/UploadFile/UpFiles");
const vEvents_1 = require("../../middleware/events/vEvents");
const EventsRouter = express_1.default.Router();
exports.EventsRouter = EventsRouter;
/** GET EVENTS page && EVENT INFO page **/
// === Get All Events from Server by Front Language === //
EventsRouter.route("/view/:lang")
    // GET
    .get(cors_1.corsWithOptions, async (req, res, next) => {
    const Lang = req.params.lang; // === Active Language
    try {
        await (0, vEvents_1.eventsGatAll)(Lang).then((EventSend) => {
            return res.json(EventSend);
        });
    }
    catch (e) {
        return res.json(e);
    }
});
// === Get All Events from Server by Front Language === //
// === Get  Event By ID from Server by Front Language === //
EventsRouter.route("/view/:lang/:ID")
    // GET
    .get(cors_1.corsWithOptions, async (req, res, next) => {
    const Lang = req.params.lang; // === Active Language
    const ID = req.params.ID; // === Event ID
    try {
        await (0, vEvents_1.eventGat)(Lang, ID).then((EventSend) => {
            return res.json(EventSend);
        });
    }
    catch (e) {
        return res.json(e);
    }
});
// === Get  Event By ID from Server by Front Language === //
/** GET EVENTS page && INFO page **/
/** ( GET & UPDATE ) UPDATE page **/
EventsRouter.route("/Update/:ID")
    // GET
    .get(cors_1.corsWithOptions, async (req, res, next) => {
    // const params = req.params;
    const ID = req.params.ID; // === Event ID
    try {
        await (0, vEvents_1.eventGetUpdateID)(ID).then((EventSend) => {
            return res.json(EventSend);
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
    const ID = req.params.ID; // === Event ID
    const Full = req.body;
    const Active = Full.Active;
    const ImageType = Full.ImageType;
    const InfoArray = Full.InfoArray;
    const IMG = await (0, UpFiles_1.fileDB)(req.file?.path, req.body.File, ImageType); // Files Ro Images To DB
    try {
        await (0, vEvents_1.eventUpdateID)(ID, IMG, ImageType, Active, InfoArray).then((EventSend) => {
            return res.json(EventSend); // True/False
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
    const ID = req.params.ID; // === Event ID
    try {
        await (0, vEvents_1.eventDelete)(ID).then((EventSend) => {
            return res.json(EventSend); // True/False
        });
    }
    catch (e) {
        return res.json(e);
    }
});
EventsRouter.route("/Update")
    // Update
    .put(cors_1.corsWithOptions, 
// TokenCheck,
// ifAdmin,
UpFiles_1.fileUp.single("File"), async (req, res, next) => {
    console.log('fileUp.single("File")', UpFiles_1.fileUp.single("File"));
    const Full = req.body;
    const Active = Full.Active;
    const ImageType = Full.ImageType;
    const InfoArray = Full.InfoArray;
    console.log("EventsFull ::", Full);
    const IMG = await (0, UpFiles_1.fileDB)(req.file?.path, req.body.File, ImageType); // Files Ro Images To DB
    try {
        await (0, vEvents_1.eventNew)(IMG, ImageType, Active, InfoArray).then((EventSend) => {
            return res.json(EventSend); // True/False
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
    const ID = req.params.ID; // === Event ID
    try {
        await (0, vEvents_1.eventDelete)(ID).then((EventSend) => {
            return res.json(EventSend); // True/False
        });
    }
    catch (e) {
        return res.json(e);
    }
});
/** GET & UPDATE UPDATE page **/
/** Update Location of event in View All Events Page **/
EventsRouter.route("/OrderList")
    // Update
    .put(cors_1.corsWithOptions, 
// TokenCheck,
// ifAdmin,
async (req, res, next) => {
    const Full = req.body;
    try {
        await (0, vEvents_1.eventOrderList)(Full).then((EventSend) => {
            return res.json(EventSend); // True/False
        });
    }
    catch (e) {
        return res.json(e);
    }
});

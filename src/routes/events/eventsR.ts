// ======================================= //
// === Add & Import the Events =========== //
// === that Happening in the Location ==== //
// ======================================= //
import express, { Request, Response, NextFunction, response } from "express";
// =================== //
import { corsWithOptions } from "../../config/cors";
// =================== //
import {
  IMGup,
  fileUp,
  DeleteIMG,
  fileDB,
} from "../../middleware/UploadFile/UpFiles";
import {
  eventGat,
  eventsGatAll,
  eventUpdateID,
  eventUpdate,
  eventGetUpdateID,
} from "../../middleware/events/vEvents";
// =================== //
import { EventsFull } from "../../models/events/eventM";
// =================== //
// =================== //
const EventsRouter = express.Router();
// =================== //
// === Global path === //
// =================== //
/** GET EVENTS page && INFO page **/
// === Get All Events from Server by Front Language === //
EventsRouter.route("/view/:lang")
  // GET
  .get(
    corsWithOptions,
    async (req: Request, res: Response, next: NextFunction) => {
      const eventsLang = req.params.lang;
      // === Console LOG === //
      // console.log("eventsLang ::", eventsLang);
      // === Console LOG === //
      try {
        const eventsGat = await eventsGatAll(eventsLang);
        // // === Console LOG === //
        // console.log("eventsGat ::", eventsGat);
        // // === Console LOG === //
        return res.json(eventsGat);
        // return res.json({ eventsGat: eventsGat, LangDB: eventsLang });
      } catch (e) {
        return res.json(e);
      }
    }
  );
// === Get All Events from Server by Front Language === //
// === Get  Event By ID from Server by Front Language === //
EventsRouter.route("/view/:lang/:ID")
  // GET
  .get(
    corsWithOptions,
    async (req: Request, res: Response, next: NextFunction) => {
      const params = req.params;
      const eventLang = req.params.lang;
      const eventID = req.params.ID;
      // // === Console LOG === //
      // console.log("eventLang ::", eventLang);
      // console.log("eventID ::", eventID);
      // // === Console LOG === //
      try {
        const eventsGat = await eventGat(eventLang, eventID);
        // // === Console LOG === //
        // console.log("eventsGat ::", eventsGat);
        // // === Console LOG === //
        return res.json(eventsGat);
      } catch (e) {
        return res.json(e);
      }
    }
  );
// === Get  Event By ID from Server by Front Language === //
/** GET EVENTS page && INFO page **/
/** GET & UPDATE UPDATE page **/
EventsRouter.route("/Update/:ID")
  // GET
  .get(
    corsWithOptions,
    async (req: Request, res: Response, next: NextFunction) => {
      const params = req.params;
      const eventID = req.params.ID;
      // // === Console LOG === //
      // console.log("params ::", params);
      // console.log("eventID ::", eventID);
      // // === Console LOG === //
      try {
        const eventsGat = await eventGetUpdateID(eventID);
        // // === Console LOG === //
        // console.log("eventsGat ::", eventsGat);
        // // === Console LOG === //
        return res.json(eventsGat);
      } catch (e) {
        return res.json(e);
      }
    }
  )
  // Update
  .put(
    corsWithOptions,
    // TokenCheck,
    // ifAdmin,
    fileUp.single("File"),
    async (req: Request, res: Response, next: NextFunction) => {
      const EventsFull: EventsFull = req.body;
      const EventsID = EventsFull.EventsID;
      const EventsActive = EventsFull.EventsActive;
      const EventsImageType = EventsFull.EventsImageType;
      const EventsInfoArray = EventsFull.EventsInfoArray;
      const IMG = await fileDB(req.file?.path, req.body.File, EventsImageType); // Files Ro Images To DB
      // // === Console LOG === //
      // console.log("req.body", req.body);
      // console.log("IMG DB:", IMG)
      // console.log("imgType", EventsImageType);
      // console.log("active", EventsActive);
      // console.log("infoArray", EventsInfoArray);
      // // === Console LOG === //
      try {
        const EventUpdate = await eventUpdateID(
          EventsID,
          IMG,
          EventsImageType,
          EventsActive,
          EventsInfoArray
        );
        return res.json(EventUpdate); // True/False
      } catch (e) {
        return res.json(e);
      }
    }
  );
EventsRouter.route("/Update")
  // Update
  .put(
    corsWithOptions,
    // TokenCheck,
    // ifAdmin,
    fileUp.single("File"),
    async (req: Request, res: Response, next: NextFunction) => {
      const EventsFull: EventsFull = req.body;
      const EventsID = EventsFull.EventsID;
      const EventsActive = EventsFull.EventsActive;
      const EventsImageType = EventsFull.EventsImageType;
      const EventsInfoArray = EventsFull.EventsInfoArray;
      const IMG = await fileDB(req.file?.path, req.body.File, EventsImageType); // Files Ro Images To DB
      // // === Console LOG === //
      // console.log("req.body", req.body);
      // console.log("IMG DB:", IMG)
      // console.log("imgType", EventsImageType);
      // console.log("active", EventsActive);
      // console.log("infoArray", EventsInfoArray);
      // // === Console LOG === //
      try {
        const EventUpdate = await eventUpdate(
          IMG,
          EventsImageType,
          EventsActive,
          EventsInfoArray
        );
        return res.json(EventUpdate); // True/False
      } catch (e) {
        return res.json(e);
      }
    }
  );
/** GET & UPDATE UPDATE page **/
// === Export Event Router === //
export { EventsRouter };

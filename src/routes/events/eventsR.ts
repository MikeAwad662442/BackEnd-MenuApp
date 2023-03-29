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
import { eventUpdate, eventsGatAll } from "../../middleware/events/vEvents";
// =================== //
import { EventsFull } from "../../models/events/eventM";
// =================== //
// =================== //
const EventsRouter = express.Router();
// =================== //
// === Global path === //
// =================== //
EventsRouter.route("/")
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
        await eventUpdate(IMG, EventsImageType, EventsActive, EventsInfoArray);
        return res.json("True"); // True/False
      } catch (e) {
        return res.json(e);
      }
    }
  );
EventsRouter.route("/:lang")
  // GET
  .get(
    corsWithOptions,
    async (req: Request, res: Response, next: NextFunction) => {
      const eventsLang = req.params.lang;
      // === Console LOG === //
      console.log("eventsLang ::", eventsLang);
      // === Console LOG === //
      try {
        const eventsGat = await eventsGatAll(eventsLang);
        // === Console LOG === //
        console.log("eventsGat ::", eventsGat);
        // === Console LOG === //
        return res.json(eventsGat);
      } catch (e) {
        return res.json(e);
      }
    }
  );
// === Export Event Router === //
export { EventsRouter };

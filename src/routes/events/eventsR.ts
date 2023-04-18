// =============== //
// ==== Events === //
// =============== //

/**
 * EVENTS && EVENTS Languages Tables
 * GET / UPDATE / INSERT / DELETE
 * ORDER LIST for Events
 * Active Event || Not
 * Note :: For Event,
 *      the Name of Event must be included but Body isn't required
 */

import express, { Request, Response, NextFunction } from "express";
import { corsWithOptions } from "../../config/cors";
import { fileUp, fileDB } from "../../middleware/UploadFile/UpFiles";
import {
  eventGat,
  eventsGatAll,
  eventUpdateID,
  eventGetUpdateID,
  eventDelete,
  eventOrderList,
  eventNew,
} from "../../middleware/events/vEvents";
import { Events, EventsFull, V_Events } from "../../models/events/eventM";

const EventsRouter = express.Router();
/** GET EVENTS page && EVENT INFO page **/
// === Get All Events from Server by Front Language === //
EventsRouter.route("/view/:lang")
  // GET
  .get(
    corsWithOptions,
    async (req: Request, res: Response, next: NextFunction) => {
      const eventsLang = req.params.lang; // === Active Language
      try {
        await eventsGatAll(eventsLang).then((eventsGat) => {
          return res.json(eventsGat);
        });
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
      const eventLang = req.params.lang; // === Active Language
      const eventID = req.params.ID; // === Event ID
      try {
        await eventGat(eventLang, eventID).then((eventsGat) => {
          return res.json(eventsGat);
        });
      } catch (e) {
        return res.json(e);
      }
    }
  );
// === Get  Event By ID from Server by Front Language === //
/** GET EVENTS page && INFO page **/
/** ( GET & UPDATE ) UPDATE page **/
EventsRouter.route("/Update/:ID")
  // GET
  .get(
    corsWithOptions,
    async (req: Request, res: Response, next: NextFunction) => {
      // const params = req.params;
      const EventID = req.params.ID; // === Event ID
      try {
        await eventGetUpdateID(EventID).then((eventsGat) => {
          return res.json(eventsGat);
        });
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
      const EventID = req.params.ID; // === Event ID
      const EventsFull: EventsFull = req.body;
      // const EventsID = EventsFull.EventsID;
      const EventsActive = EventsFull.EventsActive;
      const EventsImageType = EventsFull.EventsImageType;
      const EventsInfoArray = EventsFull.EventsInfoArray;
      const IMG = await fileDB(req.file?.path, req.body.File, EventsImageType); // Files Ro Images To DB
      try {
        await eventUpdateID(
          EventID,
          IMG,
          EventsImageType,
          EventsActive,
          EventsInfoArray
        ).then((EventUpdate) => {
          return res.json(EventUpdate); // True/False
        });
      } catch (e) {
        return res.json(e);
      }
    }
  )
  // Delete
  .delete(
    corsWithOptions,
    // TokenCheck,
    // ifAdmin,
    async (req: Request, res: Response, next: NextFunction) => {
      const EventID = req.params.ID; // === Event ID
      try {
        await eventDelete(EventID).then((DeleteEvent) => {
          return res.json(DeleteEvent); // True/False
        });
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
      // const EventsID = EventsFull.EventsID;
      const EventsActive = EventsFull.EventsActive;
      const EventsImageType = EventsFull.EventsImageType;
      const EventsInfoArray = EventsFull.EventsInfoArray;
      const IMG = await fileDB(req.file?.path, req.body.File, EventsImageType); // Files Ro Images To DB
      try {
        await eventNew(
          IMG,
          EventsImageType,
          EventsActive,
          EventsInfoArray
        ).then((EventNew) => {
          return res.json(EventNew); // True/False
        });
      } catch (e) {
        return res.json(e);
      }
    }
  )
  // Delete
  .delete(
    corsWithOptions,
    // TokenCheck,
    // ifAdmin,
    async (req: Request, res: Response, next: NextFunction) => {
      const EventID = req.params.ID; // === Event ID
      try {
        await eventDelete(EventID).then((DeleteEvent) => {
          return res.json(DeleteEvent); // True/False
        });
      } catch (e) {
        return res.json(e);
      }
    }
  );
/** GET & UPDATE UPDATE page **/
/** Update Location of event in View All Events Page **/
EventsRouter.route("/OrderList")
  // Update
  .put(
    corsWithOptions,
    // TokenCheck,
    // ifAdmin,
    async (req: Request, res: Response, next: NextFunction) => {
      const EventsFull: Events[] = req.body;
      try {
        await eventOrderList(EventsFull).then((EventOrderList) => {
          return res.json(EventOrderList); // True/False
        });
      } catch (e) {
        return res.json(e);
      }
    }
  );
/** Update Location of event in View All Events Page **/
// === Export Event Router === //
export { EventsRouter };

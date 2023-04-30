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
      const Lang = req.params.lang; // === Active Language
      try {
        await eventsGatAll(Lang).then((EventSend) => {
          return res.json(EventSend);
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
      const Lang = req.params.lang; // === Active Language
      const ID = req.params.ID; // === Event ID
      try {
        await eventGat(Lang, ID).then((EventSend) => {
          return res.json(EventSend);
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
      const ID = req.params.ID; // === Event ID
      try {
        await eventGetUpdateID(ID).then((EventSend) => {
          return res.json(EventSend);
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
      const ID = req.params.ID; // === Event ID
      const Full: EventsFull = req.body;
      const Active = Full.Active;
      const ImageType = Full.ImageType;
      const InfoArray = Full.InfoArray;
      const IMG = await fileDB(req.file?.path, req.body.File, ImageType); // Files Ro Images To DB
      try {
        await eventUpdateID(ID, IMG, ImageType, Active, InfoArray).then(
          (EventSend) => {
            return res.json(EventSend); // True/False
          }
        );
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
      const ID = req.params.ID; // === Event ID
      try {
        await eventDelete(ID).then((EventSend) => {
          return res.json(EventSend); // True/False
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
      console.log('fileUp.single("File")', fileUp.single("File"));
      const Full: EventsFull = req.body;
      const Active = Full.Active;
      const ImageType = Full.ImageType;
      const InfoArray = Full.InfoArray;

      console.log("EventsFull ::", Full);

      const IMG = await fileDB(req.file?.path, req.body.File, ImageType); // Files Ro Images To DB

      try {
        await eventNew(IMG, ImageType, Active, InfoArray).then((EventSend) => {
          return res.json(EventSend); // True/False
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
      const ID = req.params.ID; // === Event ID
      try {
        await eventDelete(ID).then((EventSend) => {
          return res.json(EventSend); // True/False
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
      const Full: Events[] = req.body;
      try {
        await eventOrderList(Full).then((EventSend) => {
          return res.json(EventSend); // True/False
        });
      } catch (e) {
        return res.json(e);
      }
    }
  );
/** Update Location of event in View All Events Page **/
// === Export Event Router === //
export { EventsRouter };

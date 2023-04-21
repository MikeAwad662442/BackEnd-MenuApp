// =============== //
// == Item Type == //
// =============== //

/**
 * Item Type it`s Lv.1 of Menu
 * It includes the first and main level of classification of lists
 *
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
  ItemTypeDelete,
  ItemTypeGetUpdateID,
  ItemTypeNew,
  ItemTypesGat,
  ItemTypesGatAll,
  ItemTypesOrderList,
  eventUpdateID,
} from "../../middleware/Items/vItemType";
import { ItemTypes, ItemTypesFull } from "../../models/Items/ItemTypeM";

const ItemTypesRouter = express.Router();

/** GET ItemTypes && ItemTypes INFO page **/
// === Get All ItemTypes from Server by Front Language === //
ItemTypesRouter.route("/view/:lang")
  // GET
  .get(
    corsWithOptions,
    async (req: Request, res: Response, next: NextFunction) => {
      const ItemTypesLang = req.params.lang; // === Active Language
      try {
        await ItemTypesGatAll(ItemTypesLang).then((ItemTypesGat) => {
          return res.json(ItemTypesGat);
        });
      } catch (e) {
        return res.json(e);
      }
    }
  );
// === Get All ItemTypes from Server by Front Language === //
// === Get  Event By ID from Server by Front Language === //
ItemTypesRouter.route("/view/:lang/:ID")
  // GET
  .get(
    corsWithOptions,
    async (req: Request, res: Response, next: NextFunction) => {
      const eventLang = req.params.lang; // === Active Language
      const eventID = req.params.ID; // === Event ID
      try {
        await ItemTypesGat(eventLang, eventID).then((eventsGat) => {
          return res.json(eventsGat);
        });
      } catch (e) {
        return res.json(e);
      }
    }
  );
// === Get  Event By ID from Server by Front Language === //
/** GET ItemTypes && ItemTypes INFO page **/
/** GET ItemTypes page && INFO page **/
/** ( GET & UPDATE ) UPDATE page **/
ItemTypesRouter.route("/Update/:ID")
  // GET
  .get(
    corsWithOptions,
    async (req: Request, res: Response, next: NextFunction) => {
      // const params = req.params;
      const EventID = req.params.ID; // === Event ID
      try {
        await ItemTypeGetUpdateID(EventID).then((eventsGat) => {
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
      const EventsFull: ItemTypesFull = req.body;
      // const EventsID = EventsFull.EventsID;
      const EventsActive = EventsFull.Active;
      const EventsImageType = EventsFull.ImageType;
      const EventsInfoArray = EventsFull.InfoArray;
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
        await ItemTypeDelete(EventID).then((DeleteEvent) => {
          return res.json(DeleteEvent); // True/False
        });
      } catch (e) {
        return res.json(e);
      }
    }
  );
ItemTypesRouter.route("/Update")
  // Update
  .put(
    corsWithOptions,
    // TokenCheck,
    // ifAdmin,
    fileUp.single("File"),
    async (req: Request, res: Response, next: NextFunction) => {
      const EventsFull: ItemTypesFull = req.body;
      // const EventsID = EventsFull.EventsID;
      const EventsActive = EventsFull.Active;
      const EventsImageType = EventsFull.ImageType;
      const EventsInfoArray = EventsFull.InfoArray;
      const IMG = await fileDB(req.file?.path, req.body.File, EventsImageType); // Files Ro Images To DB
      console.log("EventsFull ::", EventsFull, "EventsActive ::", EventsActive);
      try {
        await ItemTypeNew(
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
        await ItemTypeDelete(EventID).then((DeleteEvent) => {
          return res.json(DeleteEvent); // True/False
        });
      } catch (e) {
        return res.json(e);
      }
    }
  );
/** GET & UPDATE UPDATE page **/
/** Update Location of event in View All Events Page **/
ItemTypesRouter.route("/OrderList")
  // Update
  .put(
    corsWithOptions,
    // TokenCheck,
    // ifAdmin,
    async (req: Request, res: Response, next: NextFunction) => {
      const EventsFull: ItemTypes[] = req.body;
      try {
        await ItemTypesOrderList(EventsFull).then((EventOrderList) => {
          return res.json(EventOrderList); // True/False
        });
      } catch (e) {
        return res.json(e);
      }
    }
  );
/** Update Location of event in View All Events Page **/

// === Export Event Router === //
export { ItemTypesRouter };

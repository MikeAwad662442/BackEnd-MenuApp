// =============== //
// ==== Item ===== //
// =============== //

/**
 * Items it`s Lv.2 of Menu
 * It`s includes the first and main level of classification of lists
 *
 * GET / UPDATE / INSERT / DELETE
 * ORDER LIST for Items
 * Active Items || Not
 * Note :: For Items,
 *      the Name & Body of Items must be included
 */

import express, { Request, Response, NextFunction } from "express";
import { corsWithOptions } from "../../config/cors";
import { fileUp, fileDB } from "../../middleware/UploadFile/UpFiles";
import {
  ItemGetUpdateID,
  ItemNew,
  ItemUpdateID,
  ItemsGatAll,
} from "../../middleware/Items/vItems";
import { ItemsFull } from "../../models/Items/ItemsM";

const ItemsRouter = express.Router();
/** GET Items && Items INFO page **/
// === Get All Items from Server by Front Language === //
ItemsRouter.route("/view/:lang/:ID")
  // GET
  .get(
    corsWithOptions,
    async (req: Request, res: Response, next: NextFunction) => {
      const Lang = req.params.lang; // === Active Language
      const ID = req.params.ID; // === ItemTypeID || ItemID
      try {
        await ItemsGatAll(Lang, ID).then((ItemSend) => {
          return res.json(ItemSend);
        });
      } catch (e) {
        return res.json(e);
      }
    }
  );
// === Get All Items from Server by Front Language === //
ItemsRouter.route("/Update/:ID")
  // GET
  .get(
    corsWithOptions,
    async (req: Request, res: Response, next: NextFunction) => {
      // const params = req.params;
      const ID = req.params.ID; // === Event ID
      try {
        await ItemGetUpdateID(ID).then((ItemSend) => {
          return res.json(ItemSend);
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
      const ID = req.params.ID; // === ItemTypeID
      const Full: ItemsFull = req.body;
      console.log("Full By ID ::", Full);
      const ItemTypeID = Full.ItemTypeID;
      const Active = Full.Active;
      const ImageType = Full.ImageType;
      const Price = Full.Price;
      const InfoArray = Full.InfoArray;
      const IMG = await fileDB(req.file?.path, req.body.File, ImageType); // Files Ro Images To DB
      try {
        await ItemUpdateID(
          ID,
          ItemTypeID,
          IMG,
          ImageType,
          Active,
          Price,
          InfoArray
        ).then((ItemSend) => {
          return res.json(ItemSend); // True/False
        });
      } catch (e) {
        return res.json(e);
      }
    }
  );
ItemsRouter.route("/Update/")
  // Update
  .put(
    corsWithOptions,
    // TokenCheck,
    // ifAdmin,
    fileUp.single("File"),
    async (req: Request, res: Response, next: NextFunction) => {
      const Full: ItemsFull = req.body;
      console.log("Full ::", Full);
      const ItemTypeID = Full.ItemTypeID;
      const Active = Full.Active;
      const ImageType = Full.ImageType;
      const Price = Full.Price;
      const InfoArray = Full.InfoArray;
      const IMG = await fileDB(req.file?.path, req.body.File, ImageType); // Files Ro Images To DB
      // console.log("Full ::", Full, "Active ::", Active);
      try {
        await ItemNew(
          ItemTypeID,
          IMG,
          ImageType,
          Active,
          Price,
          InfoArray
        ).then((ItemSend) => {
          return res.json(ItemSend); // True/False
        });
      } catch (e) {
        return res.json(e);
      }
    }
  );
// === Export Event Router === //
export { ItemsRouter };

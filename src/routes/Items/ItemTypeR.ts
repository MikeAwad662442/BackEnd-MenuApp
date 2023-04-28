// =============== //
// == Item Type == //
// =============== //

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
  ItemTypesUpdateID,
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
      const Lang = req.params.lang; // === Active Language
      try {
        await ItemTypesGatAll(Lang).then((ItemTypeSend) => {
          return res.json(ItemTypeSend);
        });
      } catch (e) {
        return res.json(e);
      }
    }
  );
// === Get All ItemTypes from Server by Front Language === //
// === Get  ItemType By ID from Server by Front Language === //
ItemTypesRouter.route("/view/:lang/:ID")
  // GET
  .get(
    corsWithOptions,
    async (req: Request, res: Response, next: NextFunction) => {
      const Lang = req.params.lang; // === Active Language
      const ID = req.params.ID; // === ItemTypeID
      try {
        await ItemTypesGat(Lang, ID).then((ItemTypeSend) => {
          return res.json(ItemTypeSend);
        });
      } catch (e) {
        return res.json(e);
      }
    }
  );
// === Get  ItemTypes By ID from Server by Front Language === //
/** GET ItemTypes && ItemTypes INFO page **/
/** GET ItemTypes page && INFO page **/
/** ( GET & UPDATE ) UPDATE page **/
ItemTypesRouter.route("/Update/:ID")
  // GET
  .get(
    corsWithOptions,
    async (req: Request, res: Response, next: NextFunction) => {
      // const params = req.params;
      const ID = req.params.ID; // === Event ID
      try {
        await ItemTypeGetUpdateID(ID).then((ItemTypeSend) => {
          return res.json(ItemTypeSend);
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
      const Full: ItemTypesFull = req.body;
      const Active = Full.Active;
      const ImageType = Full.ImageType;
      const InfoArray = Full.InfoArray;
      const IMG = await fileDB(req.file?.path, req.body.File, ImageType); // Files Ro Images To DB
      try {
        await ItemTypesUpdateID(ID, IMG, ImageType, Active, InfoArray).then(
          (ItemTypeSend) => {
            return res.json(ItemTypeSend); // True/False
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
      const ID = req.params.ID; // === ItemTypeID
      try {
        await ItemTypeDelete(ID).then((ItemTypeSend) => {
          return res.json(ItemTypeSend); // True/False
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
      const Full: ItemTypesFull = req.body;
      const Active = Full.Active;
      const ImageType = Full.ImageType;
      const InfoArray = Full.InfoArray;
      const IMG = await fileDB(req.file?.path, req.body.File, ImageType); // Files Ro Images To DB
      // console.log("Full ::", Full, "Active ::", Active);
      try {
        await ItemTypeNew(IMG, ImageType, Active, InfoArray).then(
          (ItemTypeSend) => {
            return res.json(ItemTypeSend); // True/False
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
      const ID = req.params.ID; // === ItemTypeID
      try {
        await ItemTypeDelete(ID).then((ItemTypeSend) => {
          return res.json(ItemTypeSend); // True/False
        });
      } catch (e) {
        return res.json(e);
      }
    }
  );
/** GET & UPDATE UPDATE page **/
/** Update Location of ItemType in View All ItemType Page **/
ItemTypesRouter.route("/OrderList")
  // Update
  .put(
    corsWithOptions,
    // TokenCheck,
    // ifAdmin,
    async (req: Request, res: Response, next: NextFunction) => {
      const Full: ItemTypes[] = req.body;
      try {
        await ItemTypesOrderList(Full).then((ItemTypeSend) => {
          return res.json(ItemTypeSend); // True/False
        });
      } catch (e) {
        return res.json(e);
      }
    }
  );
/** Update Location of event in View All Events Page **/

// === Export Event Router === //
export { ItemTypesRouter };

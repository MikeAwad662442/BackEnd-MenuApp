// =================== //
// === Language ====== //
// =================== //
import express, { Request, Response, NextFunction } from "express";
import { corsWithOptions } from "../../config/cors";
import { C_Language } from "../../models/cPanel/cLanguageM";
import {
  langActive,
  langGet,
  langUpdate,
} from "../../middleware/cPanel/cLanguage";
const LanguageRouter = express.Router();
// =================== //
// === Global path === //
// =================== //
LanguageRouter.route("/")
  // GET
  .get(
    corsWithOptions,
    async (req: Request, res: Response, next: NextFunction) => {
      try {
        const record = await langGet();
        return res.json(record);
      } catch (e) {
        return res.json(e);
      }
    }
  )
  .put(
    corsWithOptions,
    async (req: Request, res: Response, next: NextFunction) => {
      console.log(req.body);
      // const update = req.body;

      try {
        const record = await langUpdate(req.body);
        return res.json(record);
      } catch (e) {
        return res.json(e);
      }
    }
  );
// === Active Language === //
LanguageRouter.route("/langActive")
  // GET
  .get(
    corsWithOptions,
    async (req: Request, res: Response, next: NextFunction) => {
      try {
        const record = await langActive();
        return res.json(record);
      } catch (e) {
        return res.json(e);
      }
    }
  );
// === Active Language === //
// === Export Language Router === //
export { LanguageRouter };

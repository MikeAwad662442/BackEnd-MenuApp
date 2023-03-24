// =================== //
// === Language ====== //
// =================== //
import express, { Request, Response, NextFunction } from "express";
import { corsWithOptions } from "../../config/cors";
// import { C_Language } from "../../models/cPanel/cLanguageM";
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
        const cLangGet = await langGet();
        return res.json(cLangGet);
      } catch (e) {
        return res.json(e);
      }
    }
  )
  // Update
  .put(
    corsWithOptions,
    async (req: Request, res: Response, next: NextFunction) => {
      // // === Console LOG === //
      // console.log(req.body);
      // // === Console LOG === //
      try {
        const cLangUpdate = await langUpdate(req.body);
        return res.json(cLangUpdate);
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
        const cLangActive = await langActive();
        return res.json(cLangActive);
      } catch (e) {
        return res.json(e);
      }
    }
  );
// === Active Language === //
// === Export Language Router === //
export { LanguageRouter };

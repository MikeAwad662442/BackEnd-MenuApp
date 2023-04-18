// =================== //
// === Language ====== //
// =================== //
/**
 * Language Table
 * Default Language for APP
 * Multiple Language use || not use in APP
 * Direction Left => Right // Right => Left
 * DataBase
 */

import express, { Request, Response, NextFunction } from "express";
import { corsWithOptions } from "../../config/cors";
import {
  langActive,
  langGet,
  langUpdate,
} from "../../middleware/cPanel/cLanguage";
const LanguageRouter = express.Router();
LanguageRouter.route("/")
  // GET
  .get(
    corsWithOptions,
    async (req: Request, res: Response, next: NextFunction) => {
      try {
        await langGet().then((cLangGet) => {
          return res.json(cLangGet);
        });
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
        await langUpdate(req.body).then((cLangUpdate) => {
          return res.json(cLangUpdate);
        });
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
        await langActive().then((cLangActive) => {
          return res.json(cLangActive);
        });
      } catch (e) {
        return res.json(e);
      }
    }
  );
// === Active Language === //
// === Export Language Router === //
export { LanguageRouter };

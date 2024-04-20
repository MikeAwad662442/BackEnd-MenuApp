"use strict";
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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.LanguageRouter = void 0;
const express_1 = __importDefault(require("express"));
const cors_1 = require("../../config/cors");
const cLanguage_1 = require("../../middleware/cPanel/cLanguage");
const LanguageRouter = express_1.default.Router();
exports.LanguageRouter = LanguageRouter;
LanguageRouter.route("/")
    // GET
    .get(cors_1.corsWithOptions, async (req, res, next) => {
    try {
        await (0, cLanguage_1.langGet)().then((cLangGet) => {
            return res.json(cLangGet);
        });
    }
    catch (e) {
        return res.json(e);
    }
})
    // Update
    .put(cors_1.corsWithOptions, async (req, res, next) => {
    // // === Console LOG === //
    // console.log(req.body);
    // // === Console LOG === //
    try {
        await (0, cLanguage_1.langUpdate)(req.body).then((cLangUpdate) => {
            return res.json(cLangUpdate);
        });
    }
    catch (e) {
        return res.json(e);
    }
});
// === Active Language === //
LanguageRouter.route("/langActive")
    // GET
    .get(cors_1.corsWithOptions, async (req, res, next) => {
    try {
        await (0, cLanguage_1.langActive)().then((cLangActive) => {
            return res.json(cLangActive);
        });
    }
    catch (e) {
        return res.json(e);
    }
});

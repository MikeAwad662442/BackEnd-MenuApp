"use strict";
// ===================== //
// ==== Language ======= //
// ===================== //
Object.defineProperty(exports, "__esModule", { value: true });
exports.langActive = exports.langUpdate = exports.langGet = void 0;
/**
 * Language Table
 * Default Language for APP
 * Multiple Language use || not use in APP
 * Direction Left => Right // Right => Left
 * DataBase
 */
const cLanguageM_1 = require("../../models/cPanel/cLanguageM");
// === Get All Languages Info === //
const langGet = async () => {
    let newRes;
    try {
        await cLanguageM_1.C_Language.findAll().then(async (getLanguages) => {
            newRes = getLanguages;
        });
    }
    catch (e) {
        newRes = e;
    }
    return newRes; // === Send Language Data to Front || errors
};
exports.langGet = langGet;
// === Get All Languages Info === //
// === Update All Languages Info === //
const langUpdate = async (res) => {
    let newRes;
    try {
        await cLanguageM_1.C_Language.findAll().then(async (getLanguage) => {
            if (getLanguage.length === 0) {
                res.forEach((data) => {
                    cLanguageM_1.C_Language.create(data);
                });
            }
            else {
                res.forEach((data) => {
                    cLanguageM_1.C_Language.update(data, { where: { id: data.id } });
                });
            }
        });
        newRes = true;
    }
    catch (e) {
        newRes = e;
    }
    return newRes; // === Send true || errors
};
exports.langUpdate = langUpdate;
// === Update All Languages Info === //
// === Get All Active Languages === //
const langActive = async () => {
    let newRes;
    const active = true;
    try {
        await cLanguageM_1.C_Language.findAll({ where: { active } }).then(async (getLanguages) => {
            newRes = getLanguages;
        });
    }
    catch (e) {
        newRes = e;
    }
    return newRes; // === Send Language Data to Front || errors
};
exports.langActive = langActive;
// === Export Function === //

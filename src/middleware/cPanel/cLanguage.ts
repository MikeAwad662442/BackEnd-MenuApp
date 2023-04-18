// ===================== //
// ==== Language ======= //
// ===================== //

/**
 * Language Table
 * Default Language for APP
 * Multiple Language use || not use in APP
 * Direction Left => Right // Right => Left
 * DataBase
 */

import { C_Language, Language } from "../../models/cPanel/cLanguageM";

// === Get All Languages Info === //
const langGet = async () => {
  let newRes: any;
  try {
    await C_Language.findAll().then(async (getLanguages: C_Language[]) => {
      newRes = getLanguages;
    });
  } catch (e) {
    newRes = e;
  }
  return newRes; // === Send Language Data to Front || errors
};
// === Get All Languages Info === //
// === Update All Languages Info === //
const langUpdate = async (res: Language[]) => {
  let newRes: any;
  try {
    await C_Language.findAll().then(async (getLanguage: C_Language[]) => {
      if (getLanguage.length === 0) {
        res.forEach((data: Language) => {
          C_Language.create(data);
        });
      } else {
        res.forEach((data: Language) => {
          C_Language.update(data, { where: { id: data.id } });
        });
      }
    });
    newRes = true;
  } catch (e) {
    newRes = e;
  }
  return newRes; // === Send true || errors
};
// === Update All Languages Info === //
// === Get All Active Languages === //
const langActive = async () => {
  let newRes: any;
  const active = true;
  try {
    await C_Language.findAll({ where: { active } }).then(
      async (getLanguages: C_Language[]) => {
        newRes = getLanguages;
      }
    );
  } catch (e) {
    newRes = e;
  }
  return newRes; // === Send Language Data to Front || errors
};
// === Get All Active Languages === //
// === Export Function === //
export { langGet, langUpdate, langActive };
// === Export Function === //

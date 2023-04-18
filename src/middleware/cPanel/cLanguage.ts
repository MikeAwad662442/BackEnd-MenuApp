// ===================== //
// ==== Language ======= //
// ===================== //
import { C_Language, Language } from "../../models/cPanel/cLanguageM";

// === Get All Languages Info === //
const langGet = async () => {
  let newRes: any;
  try {
    const getLanguages = await C_Language.findAll();
    newRes = getLanguages;
    console.log(newRes);
  } catch (e) {
    newRes = e;
  }
  return newRes; // === Send Language Data to Front
};
// === Get All Languages Info === //
// === Update All Languages Info === //
const langUpdate = async (res: Language[]) => {
  // console.log("Language Insert ::", res.length);
  let newRes: any;
  try {
    const getLanguage = await C_Language.findAll();
    if (getLanguage.length === 0) {
      res.forEach((data: Language) => {
        C_Language.create(data);
      });
    } else {
      res.forEach((data: Language) => {
        C_Language.update(data, { where: { id: data.id } });
      });
    }
    newRes = true;
  } catch (e) {
    newRes = e;
  }
  // console.log("Language::", newRes)
  return newRes; // === Send true || errors
};
// === Update All Languages Info === //
// === Get All Languages Info === //
const langActive = async () => {
  let newRes: any;
  const active = true;
  try {
    const getLanguages = await C_Language.findAll({ where: { active } });
    newRes = getLanguages;
    // console.log(newRes);
  } catch (e) {
    newRes = e;
  }
  return newRes; // === Send Language Data to Front
};
// === Get All Languages Info === //
// === Export Function === //
export { langGet, langUpdate, langActive };
// === Export Function === //

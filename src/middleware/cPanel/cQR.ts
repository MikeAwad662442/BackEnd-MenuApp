import { C_QR } from "../../models/cPanel/cQR_M";

// === Get QR Info === //
const qrGet = async () => {
  let newRes: any;
  try {
    const getLanguages = await C_QR.findAll();
    newRes = getLanguages;
    console.log(newRes);
  } catch (e) {
    newRes = e;
  }
  return newRes; // === Send Language Data to Front
};
// === Get QR Info === //
// === Export Function === //
export { qrGet };
// === Export Function === //

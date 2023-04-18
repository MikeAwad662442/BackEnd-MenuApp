// ==================== //
// ===== Facility ===== //
// ==================== //

/**
 * Facility Name
 * Facility LOGO
 *
 * Facility DB include in Social Media Router
 * and in Social Media Frontend
 * and use the image in WIFI Network QR
 */

import { C_Facility } from "../../models/cPanel/cFacilityM";
import { DeleteIMG } from "../UploadFile/UpFiles";

// === Get Facility Info === //
const facilityGet = async () => {
  let newRes: any;
  try {
    await C_Facility.findAll().then(async (getLanguages: C_Facility[]) => {
      newRes = getLanguages;
    });
  } catch (e) {
    newRes = e;
  }
  return newRes; // === Send Language Data to Front || errors
};
// === Get Facility Info === //
// === Update Facility Info === //
const facilityUpdate = async (
  id: string,
  name: string,
  image: any,
  imgType: string
) => {
  let newRes: any;
  try {
    await C_Facility.findAll().then(async (getFacility: C_Facility[]) => {
      if (getFacility.length === 0) {
        // === Add New Facility
        await C_Facility.create({
          name: name,
          image: image,
          imgType: imgType,
        });
      } else {
        // === Update Facility
        // === Delete OLD Image === //
        getFacility.forEach((res: C_Facility) => {
          if (res?.getDataValue("image") !== image) {
            DeleteIMG(res?.getDataValue("image"));
          }
        });
        // === Delete OLD Image === //
        await C_Facility.update(
          { name: name, image: image, imgType: imgType },
          { where: { id: id } }
        );
      }
    });
    newRes = true;
  } catch (e) {
    newRes = e;
  }
  return newRes; // === Send true || errors
};
// === Update Facility Info === //
// === Export Function === //
export { facilityGet, facilityUpdate };
// === Export Function === //

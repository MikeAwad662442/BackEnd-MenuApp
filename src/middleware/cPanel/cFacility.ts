import { C_Facility, Facility } from "../../models/cPanel/cFacilityM";
import { DeleteIMG, IMGup, fileDB } from "../UploadFile/UpFiles";

// === Get Facility Info === //
const facilityGet = async () => {
  let newRes: any;
  try {
    const getLanguages = await C_Facility.findAll();
    newRes = getLanguages;
    // console.log(newRes);
  } catch (e) {
    newRes = e;
  }
  return newRes; // === Send Language Data to Front
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
    const getFacility = await C_Facility.findAll();
    // console.log("C_Facility DB ::", getFacility);
    if (getFacility.length === 0) {
      await C_Facility.create({ name: name, image: image, imgType: imgType });
    } else {
      // === Delete OLD Image === //
      getFacility.forEach((res) => {
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

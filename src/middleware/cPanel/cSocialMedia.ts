// ===================== //
// ==== Social Media === //
// ===================== //
import { C_SocialMedia, SocialMedia } from "../../models/cPanel/cSocialMediaM";

// === Get All Social Media Info === //
const socialGet = async () => {
  let newRes: any;
  try {
    const getSocial = await C_SocialMedia.findAll();
    newRes = getSocial;
  } catch (e) {
    newRes = e;
  }
  return newRes; // === Send Social Media Data to Front
};
// === Get All Social Media Info === //
// === Update All Social Media Info === //
const socialUpdate = async (res: any) => {
  const SocialMediaArray: SocialMedia[] = JSON.parse(res);
  // console.log("socialUpdate ::", SocialMediaArray);
  let newRes: any;
  try {
    const getSocial = await C_SocialMedia.findAll();
    if (getSocial.length === 0) {
      SocialMediaArray.forEach((data: SocialMedia) => {
        C_SocialMedia.create(data);
        // console.log("C_SocialMedia RES :", data);
      });
    } else {
      SocialMediaArray.forEach((data: SocialMedia) => {
        C_SocialMedia.update(data, { where: { id: data.id } });
        // console.log("C_SocialMedia RES :", data);
      });
    }
    newRes = true;
  } catch (e) {
    newRes = e;
  }
  //   console.log("Social Media::", newRes)
  return newRes; // === Send true || errors
};
// === Update All Social Media Info === //

// === Export Function === //
export { socialGet, socialUpdate };

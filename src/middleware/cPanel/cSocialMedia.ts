// ==================== //
// === Social Media === //
// ==================== //

/**
 * SocialMedia Table
 * add Social Media Icon && Links
 * Frond Page have SocialMedia && Facility
 */

import { C_SocialMedia, SocialMedia } from "../../models/cPanel/cSocialMediaM";

// === Get All Social Media Info === //
const socialGet = async () => {
  let newRes: any;
  try {
    await C_SocialMedia.findAll().then(async (getSocial: C_SocialMedia[]) => {
      newRes = getSocial;
    });
  } catch (e) {
    newRes = e;
  }
  return newRes; // === Send Social Media Data to Front || errors
};
// === Get All Social Media Info === //
// === Update All Social Media Info === //
const socialUpdate = async (res: any) => {
  const SocialMediaArray: SocialMedia[] = JSON.parse(res);
  // console.log("socialUpdate ::", SocialMediaArray);
  let newRes: any;
  try {
    await C_SocialMedia.findAll().then(async (getSocial: C_SocialMedia[]) => {
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
    });
    newRes = true;
  } catch (e) {
    newRes = e;
  }
  return newRes; // === Send true || errors
};
// === Update All Social Media Info === //

// === Export Function === //
export { socialGet, socialUpdate };

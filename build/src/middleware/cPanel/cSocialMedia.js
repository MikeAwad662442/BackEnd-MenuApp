"use strict";
// ==================== //
// === Social Media === //
// ==================== //
Object.defineProperty(exports, "__esModule", { value: true });
exports.socialUpdate = exports.socialGet = void 0;
/**
 * SocialMedia Table
 * add Social Media Icon && Links
 * Frond Page have SocialMedia && Facility
 */
const cSocialMediaM_1 = require("../../models/cPanel/cSocialMediaM");
// === Get All Social Media Info === //
const socialGet = async () => {
    let newRes;
    try {
        await cSocialMediaM_1.C_SocialMedia.findAll().then(async (getSocial) => {
            newRes = getSocial;
        });
    }
    catch (e) {
        newRes = e;
    }
    return newRes; // === Send Social Media Data to Front || errors
};
exports.socialGet = socialGet;
// === Get All Social Media Info === //
// === Update All Social Media Info === //
const socialUpdate = async (res) => {
    const SocialMediaArray = JSON.parse(res);
    // console.log("socialUpdate ::", SocialMediaArray);
    let newRes;
    try {
        await cSocialMediaM_1.C_SocialMedia.findAll().then(async (getSocial) => {
            if (getSocial.length === 0) {
                SocialMediaArray.forEach((data) => {
                    cSocialMediaM_1.C_SocialMedia.create(data);
                    // console.log("C_SocialMedia RES :", data);
                });
            }
            else {
                SocialMediaArray.forEach((data) => {
                    cSocialMediaM_1.C_SocialMedia.update(data, { where: { id: data.id } });
                    // console.log("C_SocialMedia RES :", data);
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
exports.socialUpdate = socialUpdate;

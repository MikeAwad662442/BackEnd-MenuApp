"use strict";
// ==================== //
// ===== Facility ===== //
// ==================== //
Object.defineProperty(exports, "__esModule", { value: true });
exports.facilityUpdate = exports.facilityGet = void 0;
/**
 * Facility Name
 * Facility LOGO
 *
 * Facility DB include in Social Media Router
 * and in Social Media Frontend
 * and use the image in WIFI Network QR
 */
const cFacilityM_1 = require("../../models/cPanel/cFacilityM");
const UpFiles_1 = require("../UploadFile/UpFiles");
// === Get Facility Info === //
const facilityGet = async () => {
    let newRes;
    try {
        await cFacilityM_1.C_Facility.findAll().then(async (getLanguages) => {
            newRes = getLanguages;
        });
    }
    catch (e) {
        newRes = e;
    }
    return newRes; // === Send Language Data to Front || errors
};
exports.facilityGet = facilityGet;
// === Get Facility Info === //
// === Update Facility Info === //
const facilityUpdate = async (id, name, image, imgType) => {
    let newRes;
    try {
        await cFacilityM_1.C_Facility.findAll().then(async (getFacility) => {
            if (getFacility.length === 0) {
                // === Add New Facility
                await cFacilityM_1.C_Facility.create({
                    name: name,
                    image: image,
                    imgType: imgType,
                });
            }
            else {
                // === Update Facility
                // === Delete OLD Image === //
                getFacility.forEach((res) => {
                    if (res?.getDataValue("image") !== image) {
                        (0, UpFiles_1.DeleteIMG)(res?.getDataValue("image"));
                    }
                });
                // === Delete OLD Image === //
                await cFacilityM_1.C_Facility.update({ name: name, image: image, imgType: imgType }, { where: { id: id } });
            }
        });
        newRes = true;
    }
    catch (e) {
        newRes = e;
    }
    return newRes; // === Send true || errors
};
exports.facilityUpdate = facilityUpdate;
// === Export Function === //

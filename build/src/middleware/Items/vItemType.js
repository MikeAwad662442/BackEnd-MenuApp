"use strict";
// =============== //
// == Item Type == //
// =============== //
Object.defineProperty(exports, "__esModule", { value: true });
exports.ItemTypesOrderList = exports.ItemTypeDelete = exports.ItemTypesUpdateID = exports.ItemTypeGetUpdateID = exports.ItemTypeNew = exports.ItemTypesGat = exports.ItemTypesGatAll = void 0;
/**
 * Item Type it`s Lv.1 of Menu
 * It includes the first and main level of classification of lists
 *
 * GET / UPDATE / INSERT / DELETE
 * ORDER LIST for ItemTypes
 * Active ItemTypes || Not
 * Note :: For ItemTypes,
 *      the Name of ItemTypes must be included but Body isn't required
 */
const ItemTypeM_1 = require("../../models/Items/ItemTypeM");
const UpFiles_1 = require("../UploadFile/UpFiles");
const vItems_1 = require("./vItems");
/** GET ItemTypes page && INFO page **/
// === Get All ItemTypes List Info === //
const ItemTypesGatAll = async (lang) => {
    let newRes;
    try {
        await ItemTypeM_1.V_ItemTypes.findAll({
            include: {
                model: ItemTypeM_1.V_ItemTypesLanguage,
                as: "info",
                attributes: ["lang", "name"],
                where: { lang: lang },
                required: true,
            },
            order: [["listNum", "ASC"]], // return All ItemTypes with Order that included in ListNum not Like the insert in table
        }).then((getItemTypes) => {
            newRes = getItemTypes;
        });
    }
    catch (e) {
        newRes = e;
    }
    return newRes; // === Send ItemTypes Data to Front || errors
};
exports.ItemTypesGatAll = ItemTypesGatAll;
// === Get All ItemTypes List Info === //
// === Get ItemTypes from DB by ID === //
const ItemTypesGat = async (lang, id) => {
    let newRes;
    try {
        await ItemTypeM_1.V_ItemTypes.findOne({
            where: { id: id },
            include: {
                model: ItemTypeM_1.V_ItemTypesLanguage,
                as: "info",
                attributes: ["lang", "name", "description"],
                where: { lang: lang },
                required: true,
            },
        }).then((getItemTypes) => {
            newRes = getItemTypes;
        });
    }
    catch (e) {
        newRes = e;
    }
    // console.log("newRes ::", newRes);
    return newRes; // === Send ItemTypes Data to Front || errors
};
exports.ItemTypesGat = ItemTypesGat;
// === Get ItemTypes from DB by ID === //
/** GET ItemTypes page && INFO page **/
/** ( GET & UPDATE ) UPDATE page **/
/**
 * Return All Information about the Item
 * ItemType by ID from V_ItemTypes Table
 * All Language that connect with ItemType by ID
 */
// === Get ItemType from DB by ID for Update === //
const ItemTypeGetUpdateID = async (id) => {
    let newRes;
    try {
        await ItemTypeM_1.V_ItemTypes.findOne({
            where: { id: id },
            include: {
                model: ItemTypeM_1.V_ItemTypesLanguage,
                as: "info",
                // attributes: ["lang", "name", "description"], // Get just this Column
                required: true,
            },
        }).then((getItemTypes) => {
            newRes = getItemTypes;
        });
    }
    catch (e) {
        newRes = e;
    }
    return newRes; // === Send ItemType Data to Front || errors
};
exports.ItemTypeGetUpdateID = ItemTypeGetUpdateID;
// === Get ItemType from DB by ID for Update === //
// === Update ItemType from DB by ID === //
const ItemTypesUpdateID = async (id, IMG, imgType, active, infoArray) => {
    const ItemTypesInfoArray = JSON.parse(infoArray);
    let newRes;
    try {
        await ItemTypeM_1.V_ItemTypes.findOne({ where: { id: id } }).then((updateItemTypesID) => {
            // === check if FILE is same || new FILE is set
            if (updateItemTypesID?.getDataValue("image") !== IMG) {
                const deleteFile = updateItemTypesID?.getDataValue("image");
                (0, UpFiles_1.DeleteIMG)(deleteFile); // === delete Old Image === //
            }
            // === Update DB === //
            updateItemTypesID?.set({
                image: IMG,
                imgType: imgType,
                active: active,
            });
            // === Update DB === //
            updateItemTypesID?.save().then((ItemTypesIDLang) => {
                const ItemTypeID = ItemTypesIDLang.getDataValue("id");
                ItemTypesInfoArray.forEach(async (data) => {
                    try {
                        await ItemTypeM_1.V_ItemTypesLanguage.findOne({
                            where: { id: data.id, ItemTypeID: ItemTypeID },
                        }).then((res) => {
                            res?.set({
                                lang: data.lang,
                                name: data.name,
                                description: data.description,
                            });
                            res?.save();
                        });
                    }
                    catch (e) {
                        newRes = e;
                    }
                });
            });
            // === Update DB === //
            newRes = true;
        });
    }
    catch (e) {
        newRes = e;
    }
    return newRes; // === Send true || errors
};
exports.ItemTypesUpdateID = ItemTypesUpdateID;
// === Update ItemTypes from DB by ID === //
// === Insert New ItemType  === //
const ItemTypeNew = async (IMG, imgType, active, infoArray) => {
    const ItemTypesInfoArray = JSON.parse(infoArray);
    let newRes;
    let RowNum = await ItemTypeM_1.V_ItemTypes.count(); // Get Number of Rows in the Table
    try {
        await ItemTypeM_1.V_ItemTypes.create({
            listNum: ++RowNum,
            image: IMG,
            imgType: imgType,
            active: active,
        }).then((res) => {
            if (res.dataValues.id !== undefined) {
                ItemTypesInfoArray.forEach(async (data) => {
                    try {
                        await ItemTypeM_1.V_ItemTypesLanguage.create({
                            ItemTypeID: res.dataValues.id,
                            lang: data.lang,
                            name: data.name,
                            description: data.description,
                        });
                    }
                    catch (e) {
                        newRes = e;
                    }
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
exports.ItemTypeNew = ItemTypeNew;
// === Insert New ItemType  === //
/** ( GET & UPDATE ) UPDATE page **/
/** Delete All & ByID **/
const ItemTypeDelete = async (id) => {
    let newRes;
    if (id === undefined) {
        // === Delete All ItemTypes === //
        try {
            await ItemTypeM_1.V_ItemTypes.findAll().then(async (DeleteItemTypesID) => {
                DeleteItemTypesID?.forEach(async (data) => {
                    // console.log("image ::", DeleteItemTypesID);
                    const ID = data?.getDataValue("id");
                    try {
                        // === check if FILE is same || new FILE is set
                        if (data?.getDataValue("image") !== null) {
                            const deleteFile = data?.getDataValue("image");
                            (0, UpFiles_1.DeleteIMG)(deleteFile); // === delete Old Image === //
                        }
                        await (0, vItems_1.ItemsDeleteItemType)(ID);
                        await ItemTypeM_1.V_ItemTypesLanguage.destroy({
                            where: { ItemTypeID: ID },
                        });
                        await ItemTypeM_1.V_ItemTypes.destroy({ where: { id: ID } });
                    }
                    catch (e) {
                        newRes = e;
                    }
                });
            });
            newRes = true;
        }
        catch (e) {
            newRes = e;
        }
        // === Delete All ItemTypes === //
    }
    else {
        // === Delete ItemTypes by ID === //
        try {
            await ItemTypeM_1.V_ItemTypes.findOne({
                where: { id: id },
            }).then(async (DeleteItemTypesID) => {
                // console.log("image ::", DeleteItemTypesID);
                const ID = DeleteItemTypesID?.getDataValue("id");
                try {
                    // === check if FILE is same || new FILE is set
                    if (DeleteItemTypesID?.getDataValue("image") !== null) {
                        const deleteFile = DeleteItemTypesID?.getDataValue("image");
                        (0, UpFiles_1.DeleteIMG)(deleteFile); // === delete Old Image === //
                    }
                    await (0, vItems_1.ItemsDeleteItemType)(ID);
                    await ItemTypeM_1.V_ItemTypesLanguage.destroy({ where: { ItemTypeID: ID } });
                    await ItemTypeM_1.V_ItemTypes.destroy({ where: { id: ID } });
                }
                catch (e) {
                    newRes = e;
                }
            });
            newRes = true;
        }
        catch (e) {
            newRes = e;
        }
        // === Delete ItemTypes by ID === //
    }
    return newRes; // === Send true || errors
};
exports.ItemTypeDelete = ItemTypeDelete;
/** Delete All & ByID **/
/** Order List of ItemTypes **/
/**
 * Insert New Number in listNum column
 */
const ItemTypesOrderList = async (NewList) => {
    let newRes;
    try {
        NewList.forEach(async (UpdateList) => {
            // === Console LOG === //
            console.log("UpdateList ::", UpdateList.id);
            // === Console LOG === //
            await ItemTypeM_1.V_ItemTypes.update({ listNum: UpdateList.listNum }, { where: { id: UpdateList.id } });
        });
        newRes = true;
    }
    catch (e) {
        newRes = e;
    }
    return newRes; // === Send true || errors
};
exports.ItemTypesOrderList = ItemTypesOrderList;
// === Export Function === //

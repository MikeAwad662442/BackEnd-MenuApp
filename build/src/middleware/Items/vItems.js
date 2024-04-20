"use strict";
// =============== //
// ==== Item ===== //
// =============== //
Object.defineProperty(exports, "__esModule", { value: true });
exports.ItemsDeleteItemType = exports.ItemDeleteID = exports.ItemsOrderList = exports.ItemNew = exports.ItemUpdateID = exports.ItemGetUpdateID = exports.ItemsGatAll = void 0;
const ItemsM_1 = require("../../models/Items/ItemsM");
const UpFiles_1 = require("../UploadFile/UpFiles");
/**
 * Items it`s Lv.2 of Menu
 * It`s includes the first and main level of classification of lists
 *
 * GET / UPDATE / INSERT / DELETE
 * ORDER LIST for Items
 * Active Items || Not
 * Note :: For Items,
 *      the Name & Body of Items must be included
 */
// === Get All ItemTypes List Info === //
/**
 * It use in ItemType INFO Page
 * and in Item INFO Page
 **/
const ItemsGatAll = async (lang, ID) => {
    let newRes;
    try {
        await ItemsM_1.V_Items.findOne({
            where: { id: ID },
            include: {
                model: ItemsM_1.V_ItemsLanguage,
                as: "info",
                attributes: ["lang", "name", "description"],
                // where: { lang: lang, ItemsID: ID },
                where: { lang: lang },
                required: true,
            },
            order: [["listNum", "ASC"]], // return All ItemTypes with Order that included in ListNum not Like the insert in table
        }).then(async (getItems) => {
            console.log(getItems);
            if (getItems !== null) {
                newRes = getItems;
            }
            else {
                try {
                    await ItemsM_1.V_Items.findAll({
                        where: { ItemTypeID: ID },
                        include: {
                            model: ItemsM_1.V_ItemsLanguage,
                            as: "info",
                            attributes: ["lang", "name", "description"],
                            where: { lang: lang },
                            required: true,
                        },
                        order: [["listNum", "ASC"]], // return All ItemTypes with Order that included in ListNum not Like the insert in table
                    }).then((getItems) => {
                        newRes = getItems;
                    });
                }
                catch (e) {
                    newRes = e;
                }
            }
            // newRes = getItemTypes;
        });
    }
    catch (e) {
        newRes = e;
    }
    console.log("newRes ::", newRes);
    return newRes; // === Send ItemTypes Data to Front || errors
};
exports.ItemsGatAll = ItemsGatAll;
// === Get All ItemTypes List Info === //
// === Get Item from DB by ID for Update === //
const ItemGetUpdateID = async (id) => {
    console.log(id);
    let newRes;
    try {
        await ItemsM_1.V_Items.findOne({
            where: { id: id },
            include: {
                model: ItemsM_1.V_ItemsLanguage,
                as: "info",
                // attributes: ["lang", "name", "description"], // Get just this Column
                required: true,
            },
        }).then((getItems) => {
            newRes = getItems;
        });
    }
    catch (e) {
        newRes = e;
    }
    console.log("newRes ::", newRes);
    return newRes; // === Send Events Data to Front || errors
};
exports.ItemGetUpdateID = ItemGetUpdateID;
// === Get Item from DB by ID for Update === //
// === Update Event from DB by ID === //
const ItemUpdateID = async (id, ItemTypeID, IMG, imgType, active, Price, infoArray) => {
    const EventsInfoArray = JSON.parse(infoArray);
    let newRes;
    try {
        await ItemsM_1.V_Items.findOne({ where: { id: id } }).then((updateEventID) => {
            // === check if FILE is same || new FILE is set
            if (updateEventID?.getDataValue("image") !== IMG) {
                const deleteFile = updateEventID?.getDataValue("image");
                (0, UpFiles_1.DeleteIMG)(deleteFile); // === delete Old Image === //
            }
            // === Update DB === //
            updateEventID?.set({
                ItemTypeID: ItemTypeID,
                image: IMG,
                imgType: imgType,
                active: active,
                price: Price,
            });
            // === Update DB === //
            updateEventID?.save().then((EventIDLang) => {
                const ItemsID = EventIDLang.getDataValue("id");
                EventsInfoArray.forEach(async (data) => {
                    try {
                        await ItemsM_1.V_ItemsLanguage.findOne({
                            where: { id: data.id, ItemsID: ItemsID },
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
exports.ItemUpdateID = ItemUpdateID;
// === Update ItemTypes from DB by ID === //
// === Insert New ItemType  === //
const ItemNew = async (ItemTypeID, IMG, imgType, active, Price, infoArray) => {
    const ItemTypesInfoArray = JSON.parse(infoArray);
    let newRes;
    let RowNum = await ItemsM_1.V_Items.count(); // Get Number of Rows in the Table
    try {
        await ItemsM_1.V_Items.create({
            ItemTypeID: ItemTypeID,
            listNum: ++RowNum,
            image: IMG,
            imgType: imgType,
            active: active,
            price: Price,
        }).then((res) => {
            if (res.dataValues.id !== undefined) {
                ItemTypesInfoArray.forEach(async (data) => {
                    try {
                        await ItemsM_1.V_ItemsLanguage.create({
                            ItemsID: res.dataValues.id,
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
exports.ItemNew = ItemNew;
// === Insert New ItemType  === //
/** Delete All & ByID **/
const ItemDeleteID = async (id) => {
    let newRes;
    try {
        await ItemsM_1.V_Items.findOne({
            where: { id: id },
        }).then(async (DeleteItemID) => {
            // console.log("image ::", DeleteItemTypesID);
            const ID = DeleteItemID?.getDataValue("id");
            try {
                // === check if FILE is same || new FILE is set
                if (DeleteItemID?.getDataValue("image") !== null) {
                    const deleteFile = DeleteItemID?.getDataValue("image");
                    (0, UpFiles_1.DeleteIMG)(deleteFile); // === delete Old Image === //
                }
                await ItemsM_1.V_ItemsLanguage.destroy({ where: { ItemsID: ID } });
                await ItemsM_1.V_ItemsLanguage.destroy({ where: { id: ID } });
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
    // }
    return newRes; // === Send true || errors
};
exports.ItemDeleteID = ItemDeleteID;
const ItemsDeleteItemType = async (ItemTypeID) => {
    let newRes;
    // === Delete All Items === //
    try {
        await ItemsM_1.V_Items.findAll({
            where: { ItemTypeID: ItemTypeID },
        }).then(async (DeleteItemTypesID) => {
            DeleteItemTypesID?.forEach(async (data) => {
                console.log("DeleteItemTypesID ::", DeleteItemTypesID);
                const ID = data?.getDataValue("id");
                try {
                    // === check if FILE is same || new FILE is set
                    if (data?.getDataValue("image") !== null) {
                        const deleteFile = data?.getDataValue("image");
                        (0, UpFiles_1.DeleteIMG)(deleteFile); // === delete Old Image === //
                    }
                    await ItemsM_1.V_ItemsLanguage.destroy({
                        where: { ItemsID: ID },
                    });
                    await ItemsM_1.V_Items.destroy({ where: { id: ID } });
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
    console.log(newRes);
    return newRes; // === Send true || errors
};
exports.ItemsDeleteItemType = ItemsDeleteItemType;
/** Delete All & ByID **/
/** Order List of ItemTypes **/
/**
 * Insert New Number in listNum column
 */
const ItemsOrderList = async (NewList) => {
    let newRes;
    try {
        NewList.forEach(async (UpdateList) => {
            // === Console LOG === //
            console.log("UpdateList ::", UpdateList.id);
            // === Console LOG === //
            await ItemsM_1.V_Items.update({ listNum: UpdateList.listNum }, { where: { id: UpdateList.id } });
        });
        newRes = true;
    }
    catch (e) {
        newRes = e;
    }
    return newRes; // === Send true || errors
};
exports.ItemsOrderList = ItemsOrderList;
// === Export Function === //

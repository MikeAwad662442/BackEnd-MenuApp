"use strict";
// =============== //
// ==== Events === //
// =============== //
Object.defineProperty(exports, "__esModule", { value: true });
exports.eventOrderList = exports.eventDelete = exports.eventGetUpdateID = exports.eventUpdateID = exports.eventNew = exports.eventGat = exports.eventsGatAll = void 0;
/**
 * EVENTS && EVENTS Languages Tables
 * GET / UPDATE / INSERT / DELETE
 * ORDER LIST for Events
 * Active Event || Not
 * Note :: For Event,
 *      the Name of Event must be included but Body isn't required
 */
const eventM_1 = require("../../models/events/eventM");
const UpFiles_1 = require("../UploadFile/UpFiles");
/** GET EVENTS page && INFO page **/
// === Get All Events List Info === //
const eventsGatAll = async (lang) => {
    let newRes;
    try {
        await eventM_1.V_Events.findAll({
            include: {
                model: eventM_1.V_EventsLanguage,
                as: "info",
                attributes: ["lang", "name"],
                where: { lang: lang },
                required: true,
            },
            order: [["listNum", "ASC"]], // return All EVENTS with Order that included in ListNum not Like the insert in table
        }).then((getEvents) => {
            newRes = getEvents;
        });
    }
    catch (e) {
        newRes = e;
    }
    return newRes; // === Send Events Data to Front || errors
};
exports.eventsGatAll = eventsGatAll;
// === Get All Events List Info === //
// === Get Event from DB by ID === //
const eventGat = async (lang, id) => {
    let newRes;
    try {
        await eventM_1.V_Events.findOne({
            where: { id: id },
            include: {
                model: eventM_1.V_EventsLanguage,
                as: "info",
                attributes: ["lang", "name", "description"],
                where: { lang: lang },
                required: true,
            },
        }).then((getEvents) => {
            newRes = getEvents;
        });
    }
    catch (e) {
        newRes = e;
    }
    return newRes; // === Send Events Data to Front || errors
};
exports.eventGat = eventGat;
// === Get Event from DB by ID === //
/** GET EVENTS page && INFO page **/
/** ( GET & UPDATE ) UPDATE page **/
/**
 * Return All Information about the Item
 * event by ID from V_Events Table
 * All Language that connect with event by ID
 */
// === Get Event from DB by ID for Update === //
const eventGetUpdateID = async (id) => {
    let newRes;
    try {
        await eventM_1.V_Events.findOne({
            where: { id: id },
            include: {
                model: eventM_1.V_EventsLanguage,
                as: "info",
                // attributes: ["lang", "name", "description"], // Get just this Column
                required: true,
            },
        }).then((getEvents) => {
            newRes = getEvents;
        });
    }
    catch (e) {
        newRes = e;
    }
    return newRes; // === Send Events Data to Front || errors
};
exports.eventGetUpdateID = eventGetUpdateID;
// === Get Event from DB by ID for Update === //
// === Update Event from DB by ID === //
const eventUpdateID = async (id, IMG, imgType, active, infoArray) => {
    const EventsInfoArray = JSON.parse(infoArray);
    let newRes;
    try {
        await eventM_1.V_Events.findOne({ where: { id: id } }).then((updateEventID) => {
            // === check if FILE is same || new FILE is set
            if (updateEventID?.getDataValue("image") !== IMG) {
                const deleteFile = updateEventID?.getDataValue("image");
                (0, UpFiles_1.DeleteIMG)(deleteFile); // === delete Old Image === //
            }
            // === Update DB === //
            updateEventID?.set({
                image: IMG,
                imgType: imgType,
                active: active,
            });
            // === Update DB === //
            updateEventID?.save().then((EventIDLang) => {
                const EventID = EventIDLang.getDataValue("id");
                EventsInfoArray.forEach(async (data) => {
                    try {
                        await eventM_1.V_EventsLanguage.findOne({
                            where: { id: data.id, EventID: EventID },
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
exports.eventUpdateID = eventUpdateID;
// === Update Event from DB by ID === //
// === Insert New Event  === //
const eventNew = async (IMG, imgType, active, infoArray) => {
    const EventsInfoArray = JSON.parse(infoArray);
    let newRes;
    let RowNum = await eventM_1.V_Events.count(); // Get Number of Rows in the Table
    try {
        await eventM_1.V_Events.create({
            listNum: ++RowNum,
            image: IMG,
            imgType: imgType,
            active: active,
        }).then((res) => {
            if (res.dataValues.id !== undefined) {
                EventsInfoArray.forEach(async (data) => {
                    try {
                        await eventM_1.V_EventsLanguage.create({
                            EventID: res.dataValues.id,
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
exports.eventNew = eventNew;
// === Insert New Event  === //
/** ( GET & UPDATE ) UPDATE page **/
/** Delete All & ByID **/
const eventDelete = async (id) => {
    let newRes;
    if (id === undefined) {
        // === Delete All Events === //
        try {
            await eventM_1.V_Events.findAll().then(async (DeleteEventID) => {
                DeleteEventID?.forEach(async (data) => {
                    // console.log("image ::", DeleteEventID);
                    const EventID = data?.getDataValue("id");
                    try {
                        // === check if FILE is same || new FILE is set
                        if (data?.getDataValue("image") !== null) {
                            const deleteFile = data?.getDataValue("image");
                            (0, UpFiles_1.DeleteIMG)(deleteFile); // === delete Old Image === //
                        }
                        await eventM_1.V_EventsLanguage.destroy({
                            where: { EventID: EventID },
                        });
                        await eventM_1.V_Events.destroy({ where: { id: EventID } });
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
        // === Delete All Events === //
    }
    else {
        // === Delete EVENT by ID === //
        try {
            await eventM_1.V_Events.findOne({
                where: { id: id },
            }).then(async (DeleteEventID) => {
                // console.log("image ::", DeleteEventID);
                const EventID = DeleteEventID?.getDataValue("id");
                try {
                    // === check if FILE is same || new FILE is set
                    if (DeleteEventID?.getDataValue("image") !== null) {
                        const deleteFile = DeleteEventID?.getDataValue("image");
                        (0, UpFiles_1.DeleteIMG)(deleteFile); // === delete Old Image === //
                    }
                    await eventM_1.V_EventsLanguage.destroy({ where: { EventID: EventID } });
                    await eventM_1.V_Events.destroy({ where: { id: EventID } });
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
        // === Delete EVENT by ID === //
    }
    return newRes; // === Send true || errors
};
exports.eventDelete = eventDelete;
/** Delete All & ByID **/
/** Order List of EVENTS **/
/**
 * Insert New Number in listNum column
 */
const eventOrderList = async (NewList) => {
    let newRes;
    try {
        NewList.forEach(async (UpdateList) => {
            // === Console LOG === //
            console.log("UpdateList ::", UpdateList.id);
            // === Console LOG === //
            await eventM_1.V_Events.update({ listNum: UpdateList.listNum }, { where: { id: UpdateList.id } });
        });
        newRes = true;
    }
    catch (e) {
        newRes = e;
    }
    return newRes; // === Send true || errors
};
exports.eventOrderList = eventOrderList;
// === Export Function === //

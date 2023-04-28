// =============== //
// ==== Events === //
// =============== //

/**
 * EVENTS && EVENTS Languages Tables
 * GET / UPDATE / INSERT / DELETE
 * ORDER LIST for Events
 * Active Event || Not
 * Note :: For Event,
 *      the Name of Event must be included but Body isn't required
 */

import {
  Events,
  EventsFull,
  EventsLanguage,
  V_Events,
  V_EventsLanguage,
} from "../../models/events/eventM";
import { DeleteIMG } from "../UploadFile/UpFiles";
/** GET EVENTS page && INFO page **/
// === Get All Events List Info === //
const eventsGatAll = async (lang: string) => {
  let newRes: any;
  try {
    await V_Events.findAll({
      include: {
        model: V_EventsLanguage,
        as: "info",
        attributes: ["lang", "name"], // Get just this Column
        where: { lang: lang },
        required: true,
      },
      order: [["listNum", "ASC"]], // return All EVENTS with Order that included in ListNum not Like the insert in table
    }).then((getEvents: V_Events[]) => {
      newRes = getEvents;
    });
  } catch (e) {
    newRes = e;
  }
  return newRes; // === Send Events Data to Front || errors
};
// === Get All Events List Info === //
// === Get Event from DB by ID === //
const eventGat = async (lang: string, id: string) => {
  let newRes: any;
  try {
    await V_Events.findOne({
      where: { id: id },
      include: {
        model: V_EventsLanguage,
        as: "info",
        attributes: ["lang", "name", "description"], // Get just this Column
        where: { lang: lang },
        required: true,
      },
    }).then((getEvents) => {
      newRes = getEvents;
    });
  } catch (e) {
    newRes = e;
  }
  return newRes; // === Send Events Data to Front || errors
};
// === Get Event from DB by ID === //
/** GET EVENTS page && INFO page **/
/** ( GET & UPDATE ) UPDATE page **/
/**
 * Return All Information about the Item
 * event by ID from V_Events Table
 * All Language that connect with event by ID
 */
// === Get Event from DB by ID for Update === //
const eventGetUpdateID = async (id: string) => {
  let newRes: any;
  try {
    await V_Events.findOne({
      where: { id: id },
      include: {
        model: V_EventsLanguage,
        as: "info",
        // attributes: ["lang", "name", "description"], // Get just this Column
        required: true,
      },
    }).then((getEvents) => {
      newRes = getEvents;
    });
  } catch (e) {
    newRes = e;
  }
  return newRes; // === Send Events Data to Front || errors
};
// === Get Event from DB by ID for Update === //
// === Update Event from DB by ID === //
const eventUpdateID = async (
  id: string,
  IMG: string,
  imgType: string,
  active: boolean,
  infoArray: any
) => {
  const EventsInfoArray: EventsLanguage[] = JSON.parse(infoArray);
  let newRes: any;
  try {
    await V_Events.findOne({ where: { id: id } }).then(
      (updateEventID: V_Events | null) => {
        // === check if FILE is same || new FILE is set
        if (updateEventID?.getDataValue("image") !== IMG) {
          const deleteFile: any = updateEventID?.getDataValue("image");
          DeleteIMG(deleteFile); // === delete Old Image === //
        }
        // === Update DB === //
        updateEventID?.set({
          image: IMG,
          imgType: imgType,
          active: active,
        });
        // === Update DB === //
        updateEventID?.save().then((EventIDLang: V_Events) => {
          const EventID = EventIDLang.getDataValue("id");
          EventsInfoArray.forEach(async (data: EventsLanguage) => {
            try {
              await V_EventsLanguage.findOne({
                where: { id: data.id, EventID: EventID },
              }).then((res: V_EventsLanguage | null) => {
                res?.set({
                  lang: data.lang,
                  name: data.name,
                  description: data.description,
                });
                res?.save();
              });
            } catch (e) {
              newRes = e;
            }
          });
        });
        // === Update DB === //
        newRes = true;
      }
    );
  } catch (e) {
    newRes = e;
  }
  return newRes; // === Send true || errors
};
// === Update Event from DB by ID === //
// === Insert New Event  === //
const eventNew = async (
  IMG: string,
  imgType: string,
  active: boolean,
  infoArray: any
) => {
  const EventsInfoArray: EventsLanguage[] = JSON.parse(infoArray);
  let newRes: any;
  let RowNum: number = await V_Events.count(); // Get Number of Rows in the Table
  try {
    await V_Events.create({
      listNum: ++RowNum,
      image: IMG,
      imgType: imgType,
      active: active,
    }).then((res: V_Events) => {
      if (res.dataValues.id !== undefined) {
        EventsInfoArray.forEach(async (data: EventsLanguage) => {
          try {
            await V_EventsLanguage.create({
              EventID: res.dataValues.id,
              lang: data.lang,
              name: data.name,
              description: data.description,
            });
          } catch (e) {
            newRes = e;
          }
        });
      }
    });
    newRes = true;
  } catch (e) {
    newRes = e;
  }
  return newRes; // === Send true || errors
};
// === Insert New Event  === //
/** ( GET & UPDATE ) UPDATE page **/
/** Delete All & ByID **/
const eventDelete = async (id: string) => {
  let newRes: any;
  if (id === undefined) {
    // === Delete All Events === //
    try {
      await V_Events.findAll().then(
        async (DeleteEventID: V_Events[] | null) => {
          DeleteEventID?.forEach(async (data: V_Events) => {
            // console.log("image ::", DeleteEventID);
            const EventID = data?.getDataValue("id");
            try {
              // === check if FILE is same || new FILE is set
              if (data?.getDataValue("image") !== null) {
                const deleteFile: any = data?.getDataValue("image");
                DeleteIMG(deleteFile); // === delete Old Image === //
              }
              await V_EventsLanguage.destroy({
                where: { EventID: EventID },
              });
              await V_Events.destroy({ where: { id: EventID } });
            } catch (e) {
              newRes = e;
            }
          });
        }
      );
      newRes = true;
    } catch (e) {
      newRes = e;
    }
    // === Delete All Events === //
  } else {
    // === Delete EVENT by ID === //
    try {
      await V_Events.findOne({
        where: { id: id },
      }).then(async (DeleteEventID: V_Events | null) => {
        // console.log("image ::", DeleteEventID);
        const EventID = DeleteEventID?.getDataValue("id");
        try {
          // === check if FILE is same || new FILE is set
          if (DeleteEventID?.getDataValue("image") !== null) {
            const deleteFile: any = DeleteEventID?.getDataValue("image");
            DeleteIMG(deleteFile); // === delete Old Image === //
          }
          await V_EventsLanguage.destroy({ where: { EventID: EventID } });
          await V_Events.destroy({ where: { id: EventID } });
        } catch (e) {
          newRes = e;
        }
      });
      newRes = true;
    } catch (e) {
      newRes = e;
    }
    // === Delete EVENT by ID === //
  }
  return newRes; // === Send true || errors
};
/** Delete All & ByID **/
/** Order List of EVENTS **/
/**
 * Insert New Number in listNum column
 */
const eventOrderList = async (NewList: Events[]) => {
  let newRes: any;
  try {
    NewList.forEach(async (UpdateList: Events) => {
      // === Console LOG === //
      console.log("UpdateList ::", UpdateList.id);
      // === Console LOG === //
      await V_Events.update(
        { listNum: UpdateList.listNum },
        { where: { id: UpdateList.id } }
      );
    });
    newRes = true;
  } catch (e) {
    newRes = e;
  }
  return newRes; // === Send true || errors
};
/** Order List of EVENTS **/
// === Export Function === //
export {
  eventsGatAll,
  eventGat,
  eventNew,
  eventUpdateID,
  eventGetUpdateID,
  eventDelete,
  eventOrderList,
};
// === Export Function === //

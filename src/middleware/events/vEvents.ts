import {
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
    const getEvents = await V_Events.findAll({
      include: {
        model: V_EventsLanguage,
        as: "info",
        attributes: ["lang", "name"], // Get just this Column
        where: { lang: lang },
        required: true,
      },
    });
    newRes = getEvents;
  } catch (e) {
    newRes = e;
  }
  return newRes; // === Send Events Data to Front
};
// === Get All Events List Info === //
// === Get Event from DB by ID === //
const eventGat = async (lang: string, id: string) => {
  let newRes: any;
  try {
    const getEvents = await V_Events.findOne({
      where: { id: id },
      include: {
        model: V_EventsLanguage,
        as: "info",
        attributes: ["lang", "name", "description"], // Get just this Column
        where: { lang: lang },
        required: true,
      },
    });
    newRes = getEvents;
  } catch (e) {
    newRes = e;
  }
  return newRes; // === Send Events Data to Front
};
/** GET EVENTS page && INFO page **/
/** GET & UPDATE UPDATE page **/
// === Get Event from DB by ID === //
const eventGetUpdateID = async (id: string) => {
  let newRes: any;
  try {
    const getEvents = await V_Events.findOne({
      where: { id: id },
      include: {
        model: V_EventsLanguage,
        as: "info",
        // attributes: ["lang", "name", "description"], // Get just this Column
        required: true,
      },
    });
    newRes = getEvents;
  } catch (e) {
    newRes = e;
  }
  return newRes; // === Send Events Data to Front
};
// === Get Event from DB by ID === //
// === Update Event from DB by ID === //
const eventUpdateID = async (
  id: string,
  IMG: string,
  imgType: string,
  active: boolean,
  infoArray: any
) => {
  const EventsInfoArray: EventsLanguage[] = JSON.parse(infoArray);
  // // === Console LOG === //
  // console.log("IMG DB:", IMG);
  // console.log("imgType", imgType);
  // console.log("active", active);
  // console.log("infoArray", EventsInfoArray);
  // // === Console LOG === //
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
        updateEventID?.save().then((EventIDLang: V_Events) => {
          // console.log("From Event Table to lang ::", EventIDLang);
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
  //   console.log("Event Update ::", newRes)
  return newRes; // === Send true || errors
};
// === Update Event from DB by ID === //
// === Insert New Event  === //
const eventUpdate = async (
  IMG: string,
  imgType: string,
  active: boolean,
  infoArray: any
) => {
  const EventsInfoArray: EventsLanguage[] = JSON.parse(infoArray);
  // // === Console LOG === //
  // console.log("IMG DB:", IMG);
  // console.log("imgType", imgType);
  // console.log("active", active);
  // console.log("infoArray", EventsInfoArray);
  // // === Console LOG === //
  let newRes: any;
  try {
    await V_Events.create({
      image: IMG,
      imgType: imgType,
      active: active,
    }).then((res: V_Events) => {
      // console.log("V_Events ID ::", res.dataValues.id);
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
  //   console.log("Event Update ::", newRes)
  return newRes; // === Send true || errors
};
// === Insert New Event  === //
/** GET & UPDATE UPDATE page **/
/** Delete All & ByID **/
const eventDelete = async (id: string) => {
  console.log("Delete ID ::", id);
  let newRes: any;
  if (id === undefined) {
    try {
      await V_Events.findAll().then(
        async (DeleteEventID: V_Events[] | null) => {
          DeleteEventID?.forEach(async (data: V_Events) => {
            console.log("image ::", DeleteEventID);
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
              newRes = true;
            } catch (e) {
              newRes = e;
            }
          });
        }
      );
    } catch (e) {
      newRes = e;
    }
  } else {
    try {
      await V_Events.findOne({
        where: { id: id },
      }).then(async (DeleteEventID: V_Events | null) => {
        console.log("image ::", DeleteEventID);
        const EventID = DeleteEventID?.getDataValue("id");
        try {
          // === check if FILE is same || new FILE is set
          if (DeleteEventID?.getDataValue("image") !== null) {
            const deleteFile: any = DeleteEventID?.getDataValue("image");
            DeleteIMG(deleteFile); // === delete Old Image === //
          }
          await V_EventsLanguage.destroy({ where: { EventID: EventID } });
          await V_Events.destroy({ where: { id: EventID } });
          newRes = true;
        } catch (e) {
          newRes = e;
        }
      });
    } catch (e) {
      newRes = e;
    }
  }

  //   console.log("Event Update ::", newRes)
  return newRes; // === Send true || errors
};
/** Delete All & ByID **/
// === Export Function === //
export {
  eventsGatAll,
  eventGat,
  eventUpdate,
  eventUpdateID,
  eventGetUpdateID,
  eventDelete,
};
// === Export Function === //

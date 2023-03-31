import {
  EventsLanguage,
  V_Events,
  V_EventsLanguage,
} from "../../models/events/eventM";

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
    await V_Events.create(
      {
        image: IMG,
        imgType: imgType,
        active: active,
        // info: infoArray,
      }
      // {include: [info] }
    )
      .then((res: V_Events) => {
        console.log("V_Events ID ::", res.dataValues.id);
        if (res.dataValues.id !== undefined) {
          EventsInfoArray.forEach(async (data: EventsLanguage) => {
            try {
              await V_EventsLanguage.create({
                // await res.setV_EventsLanguage({
                EventID: res.dataValues.id,
                lang: data.lang,
                name: data.name,
                description: data.description,
              });
            } catch (e) {
              console.log(e);
            }
          });
        }
        console.log("LangArray", infoArray);
      })
      .then((res) => {
        console.log("V_Events finally ::", res);
      });
    newRes = true;
  } catch (e) {
    newRes = e;
  }
  //   console.log("Social Media::", newRes)
  return newRes; // === Send true || errors
};

// === Export Function === //
export { eventsGatAll, eventUpdate };
// === Export Function === //

// =============== //
// ==== Item ===== //
// =============== //

import {
  Items,
  ItemsLanguage,
  V_Items,
  V_ItemsLanguage,
} from "../../models/Items/ItemsM";
import { DeleteIMG } from "../UploadFile/UpFiles";

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
const ItemsGatAll = async (lang: string, ID: string) => {
  let newRes: any;
  try {
    await V_Items.findOne({
      where: { id: ID },
      include: {
        model: V_ItemsLanguage,
        as: "info",
        attributes: ["lang", "name", "description"], // Get just this Column
        // where: { lang: lang, ItemsID: ID },
        where: { lang: lang },
        required: true,
      },
      order: [["listNum", "ASC"]], // return All ItemTypes with Order that included in ListNum not Like the insert in table
    }).then(async (getItems: V_Items | null) => {
      console.log(getItems);
      if (getItems !== null) {
        newRes = getItems;
      } else {
        try {
          await V_Items.findAll({
            where: { ItemTypeID: ID },
            include: {
              model: V_ItemsLanguage,
              as: "info",
              attributes: ["lang", "name", "description"], // Get just this Column
              where: { lang: lang },
              required: true,
            },
            order: [["listNum", "ASC"]], // return All ItemTypes with Order that included in ListNum not Like the insert in table
          }).then((getItems: V_Items[]) => {
            newRes = getItems;
          });
        } catch (e) {
          newRes = e;
        }
      }
      // newRes = getItemTypes;
    });
  } catch (e) {
    newRes = e;
  }
  console.log("newRes ::", newRes);
  return newRes; // === Send ItemTypes Data to Front || errors
};
// === Get All ItemTypes List Info === //
// === Get Item from DB by ID for Update === //
const ItemGetUpdateID = async (id: string) => {
  console.log(id);
  let newRes: any;
  try {
    await V_Items.findOne({
      where: { id: id },
      include: {
        model: V_ItemsLanguage,
        as: "info",
        // attributes: ["lang", "name", "description"], // Get just this Column
        required: true,
      },
    }).then((getItems) => {
      newRes = getItems;
    });
  } catch (e) {
    newRes = e;
  }
  console.log("newRes ::", newRes);
  return newRes; // === Send Events Data to Front || errors
};
// === Get Item from DB by ID for Update === //
// === Update Event from DB by ID === //
const ItemUpdateID = async (
  id: string,
  ItemTypeID: string,
  IMG: string,
  imgType: string,
  active: boolean,
  Price: number,
  infoArray: any
) => {
  const EventsInfoArray: ItemsLanguage[] = JSON.parse(infoArray);
  let newRes: any;
  try {
    await V_Items.findOne({ where: { id: id } }).then(
      (updateEventID: V_Items | null) => {
        // === check if FILE is same || new FILE is set
        if (updateEventID?.getDataValue("image") !== IMG) {
          const deleteFile: any = updateEventID?.getDataValue("image");
          DeleteIMG(deleteFile); // === delete Old Image === //
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
        updateEventID?.save().then((EventIDLang: V_Items) => {
          const ItemsID = EventIDLang.getDataValue("id");
          EventsInfoArray.forEach(async (data: ItemsLanguage) => {
            try {
              await V_ItemsLanguage.findOne({
                where: { id: data.id, ItemsID: ItemsID },
              }).then((res: V_ItemsLanguage | null) => {
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
// === Update ItemTypes from DB by ID === //
// === Insert New ItemType  === //
const ItemNew = async (
  ItemTypeID: string,
  IMG: string,
  imgType: string,
  active: boolean,
  Price: number,
  infoArray: any
) => {
  const ItemTypesInfoArray: ItemsLanguage[] = JSON.parse(infoArray);
  let newRes: any;
  let RowNum: number = await V_Items.count(); // Get Number of Rows in the Table
  try {
    await V_Items.create({
      ItemTypeID: ItemTypeID,
      listNum: ++RowNum,
      image: IMG,
      imgType: imgType,
      active: active,
      price: Price,
    }).then((res: V_Items) => {
      if (res.dataValues.id !== undefined) {
        ItemTypesInfoArray.forEach(async (data: ItemsLanguage) => {
          try {
            await V_ItemsLanguage.create({
              ItemsID: res.dataValues.id,
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
// === Insert New ItemType  === //
/** Delete All & ByID **/
const ItemDeleteID = async (id: string) => {
  let newRes: any;
  // if (id === undefined) {
  //   // === Delete All Items === //
  //   try {
  //     await V_Items.findAll().then(
  //       async (DeleteItemTypesID: V_Items[] | null) => {
  //         DeleteItemTypesID?.forEach(async (data: V_Items) => {
  //           // console.log("image ::", DeleteItemTypesID);
  //           const ID = data?.getDataValue("id");
  //           try {
  //             // === check if FILE is same || new FILE is set
  //             if (data?.getDataValue("image") !== null) {
  //               const deleteFile: any = data?.getDataValue("image");
  //               DeleteIMG(deleteFile); // === delete Old Image === //
  //             }
  //             await V_ItemsLanguage.destroy({
  //               where: { ItemsID: ID },
  //             });
  //             await V_Items.destroy({ where: { id: ID } });
  //           } catch (e) {
  //             newRes = e;
  //           }
  //         });
  //       }
  //     );
  //     newRes = true;
  //   } catch (e) {
  //     newRes = e;
  //   }
  //   // === Delete All ItemTypes === //
  // } else {
  // === Delete ItemTypes by ID === //
  try {
    await V_Items.findOne({
      where: { id: id },
    }).then(async (DeleteItemTypesID: V_Items | null) => {
      // console.log("image ::", DeleteItemTypesID);
      const ID = DeleteItemTypesID?.getDataValue("id");
      try {
        // === check if FILE is same || new FILE is set
        if (DeleteItemTypesID?.getDataValue("image") !== null) {
          const deleteFile: any = DeleteItemTypesID?.getDataValue("image");
          DeleteIMG(deleteFile); // === delete Old Image === //
        }
        await V_ItemsLanguage.destroy({ where: { ItemsID: ID } });
        await V_ItemsLanguage.destroy({ where: { id: ID } });
      } catch (e) {
        newRes = e;
      }
    });
    newRes = true;
  } catch (e) {
    newRes = e;
  }
  // === Delete ItemTypes by ID === //
  // }
  return newRes; // === Send true || errors
};
/** Delete All & ByID **/
/** Order List of ItemTypes **/
/**
 * Insert New Number in listNum column
 */
const ItemsOrderList = async (NewList: Items[]) => {
  let newRes: any;
  try {
    NewList.forEach(async (UpdateList: Items) => {
      // === Console LOG === //
      console.log("UpdateList ::", UpdateList.id);
      // === Console LOG === //
      await V_Items.update(
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
/** Order List of ItemTypes **/
// === Export Function === //
export {
  ItemsGatAll,
  ItemGetUpdateID,
  ItemUpdateID,
  ItemNew,
  ItemsOrderList,
  ItemDeleteID,
};
// === Export Function === //

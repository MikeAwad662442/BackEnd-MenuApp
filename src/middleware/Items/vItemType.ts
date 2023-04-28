// =============== //
// == Item Type == //
// =============== //

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
import {
  ItemTypes,
  ItemTypesLanguage,
  V_ItemTypes,
  V_ItemTypesLanguage,
} from "../../models/Items/ItemTypeM";
import { DeleteIMG } from "../UploadFile/UpFiles";
/** GET ItemTypes page && INFO page **/
// === Get All ItemTypes List Info === //
const ItemTypesGatAll = async (lang: string) => {
  let newRes: any;
  try {
    await V_ItemTypes.findAll({
      include: {
        model: V_ItemTypesLanguage,
        as: "info",
        attributes: ["lang", "name"], // Get just this Column
        where: { lang: lang },
        required: true,
      },
      order: [["listNum", "ASC"]], // return All ItemTypes with Order that included in ListNum not Like the insert in table
    }).then((getItemTypes: V_ItemTypes[]) => {
      newRes = getItemTypes;
    });
  } catch (e) {
    newRes = e;
  }
  return newRes; // === Send ItemTypes Data to Front || errors
};
// === Get All ItemTypes List Info === //
// === Get ItemTypes from DB by ID === //
const ItemTypesGat = async (lang: string, id: string) => {
  let newRes: any;
  try {
    await V_ItemTypes.findOne({
      where: { id: id },
      include: {
        model: V_ItemTypesLanguage,
        as: "info",
        attributes: ["lang", "name", "description"], // Get just this Column
        where: { lang: lang },
        required: true,
      },
    }).then((getItemTypes) => {
      newRes = getItemTypes;
    });
  } catch (e) {
    newRes = e;
  }
  return newRes; // === Send ItemTypes Data to Front || errors
};
// === Get ItemTypes from DB by ID === //
/** GET ItemTypes page && INFO page **/
/** ( GET & UPDATE ) UPDATE page **/
/**
 * Return All Information about the Item
 * ItemType by ID from V_ItemTypes Table
 * All Language that connect with ItemType by ID
 */
// === Get ItemType from DB by ID for Update === //
const ItemTypeGetUpdateID = async (id: string) => {
  let newRes: any;
  try {
    await V_ItemTypes.findOne({
      where: { id: id },
      include: {
        model: V_ItemTypesLanguage,
        as: "info",
        // attributes: ["lang", "name", "description"], // Get just this Column
        required: true,
      },
    }).then((getItemTypes) => {
      newRes = getItemTypes;
    });
  } catch (e) {
    newRes = e;
  }
  return newRes; // === Send ItemType Data to Front || errors
};
// === Get ItemType from DB by ID for Update === //
// === Update ItemType from DB by ID === //
const ItemTypesUpdateID = async (
  id: string,
  IMG: string,
  imgType: string,
  active: boolean,
  infoArray: any
) => {
  const ItemTypesInfoArray: ItemTypesLanguage[] = JSON.parse(infoArray);
  let newRes: any;
  try {
    await V_ItemTypes.findOne({ where: { id: id } }).then(
      (updateItemTypesID: V_ItemTypes | null) => {
        // === check if FILE is same || new FILE is set
        if (updateItemTypesID?.getDataValue("image") !== IMG) {
          const deleteFile: any = updateItemTypesID?.getDataValue("image");
          DeleteIMG(deleteFile); // === delete Old Image === //
        }
        // === Update DB === //
        updateItemTypesID?.set({
          image: IMG,
          imgType: imgType,
          active: active,
        });
        // === Update DB === //
        updateItemTypesID?.save().then((ItemTypesIDLang: V_ItemTypes) => {
          const ItemTypeID = ItemTypesIDLang.getDataValue("id");
          ItemTypesInfoArray.forEach(async (data: ItemTypesLanguage) => {
            try {
              await V_ItemTypesLanguage.findOne({
                where: { id: data.id, ItemTypeID: ItemTypeID },
              }).then((res: V_ItemTypesLanguage | null) => {
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
const ItemTypeNew = async (
  IMG: string,
  imgType: string,
  active: boolean,
  infoArray: any
) => {
  const ItemTypesInfoArray: ItemTypesLanguage[] = JSON.parse(infoArray);
  let newRes: any;
  let RowNum: number = await V_ItemTypes.count(); // Get Number of Rows in the Table
  try {
    await V_ItemTypes.create({
      listNum: ++RowNum,
      image: IMG,
      imgType: imgType,
      active: active,
    }).then((res: V_ItemTypes) => {
      if (res.dataValues.id !== undefined) {
        ItemTypesInfoArray.forEach(async (data: ItemTypesLanguage) => {
          try {
            await V_ItemTypesLanguage.create({
              ItemTypeID: res.dataValues.id,
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
/** ( GET & UPDATE ) UPDATE page **/
/** Delete All & ByID **/
const ItemTypeDelete = async (id: string) => {
  let newRes: any;
  if (id === undefined) {
    // === Delete All ItemTypes === //
    try {
      await V_ItemTypes.findAll().then(
        async (DeleteItemTypesID: V_ItemTypes[] | null) => {
          DeleteItemTypesID?.forEach(async (data: V_ItemTypes) => {
            // console.log("image ::", DeleteItemTypesID);
            const ID = data?.getDataValue("id");
            try {
              // === check if FILE is same || new FILE is set
              if (data?.getDataValue("image") !== null) {
                const deleteFile: any = data?.getDataValue("image");
                DeleteIMG(deleteFile); // === delete Old Image === //
              }
              await V_ItemTypesLanguage.destroy({
                where: { ItemTypeID: ID },
              });
              await V_ItemTypes.destroy({ where: { id: ID } });
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
    // === Delete All ItemTypes === //
  } else {
    // === Delete ItemTypes by ID === //
    try {
      await V_ItemTypes.findOne({
        where: { id: id },
      }).then(async (DeleteItemTypesID: V_ItemTypes | null) => {
        // console.log("image ::", DeleteItemTypesID);
        const ID = DeleteItemTypesID?.getDataValue("id");
        try {
          // === check if FILE is same || new FILE is set
          if (DeleteItemTypesID?.getDataValue("image") !== null) {
            const deleteFile: any = DeleteItemTypesID?.getDataValue("image");
            DeleteIMG(deleteFile); // === delete Old Image === //
          }
          await V_ItemTypesLanguage.destroy({ where: { ItemTypeID: ID } });
          await V_ItemTypes.destroy({ where: { id: ID } });
        } catch (e) {
          newRes = e;
        }
      });
      newRes = true;
    } catch (e) {
      newRes = e;
    }
    // === Delete ItemTypes by ID === //
  }
  return newRes; // === Send true || errors
};
/** Delete All & ByID **/
/** Order List of ItemTypes **/
/**
 * Insert New Number in listNum column
 */
const ItemTypesOrderList = async (NewList: ItemTypes[]) => {
  let newRes: any;
  try {
    NewList.forEach(async (UpdateList: ItemTypes) => {
      // === Console LOG === //
      console.log("UpdateList ::", UpdateList.id);
      // === Console LOG === //
      await V_ItemTypes.update(
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
  ItemTypesGatAll,
  ItemTypesGat,
  ItemTypeNew,
  ItemTypeGetUpdateID,
  ItemTypesUpdateID,
  ItemTypeDelete,
  ItemTypesOrderList,
};
// === Export Function === //

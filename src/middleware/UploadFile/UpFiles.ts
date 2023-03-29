// ===================== //
// ==== Upload Files === //
// ===================== //
import multer from "multer";
import path from "path";
import sharp from "sharp"; // === For Comprise Images
import fs from "fs";
import { json } from "sequelize";
// === Static INFO === //
const LinkServer = "./public/gallery";
// const LinkDB = "/gallery";
// === Static INFO === //
// === Stor Upload File in Server Storage File === //
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    if (!fs.existsSync(LinkServer)) {
      fs.mkdirSync(LinkServer, { recursive: true });
    }
    cb(null, LinkServer);
  },
  filename: (req, file, cb) => {
    const fileName = Date.now() + path.extname(file.originalname);
    cb(null, fileName);
  },
});
// === Stor Upload File in Server Storage File === //
// ==== IMG Store ==== //
const IMGup = multer({
  storage: storage,
  fileFilter: (req, file, cb) => {
    const fileType = /jpeg|jpg|JPG|png|gif|webp|jfif/;
    const mimetype = fileType.test(file.mimetype);
    const extname = fileType.test(path.extname(file.originalname));
    if (mimetype && extname) {
      return cb(null, true);
    } else {
      return cb(new Error("You can upload only image files!"));
    }
  },
});
// ==== IMG Store ==== //
// === Video Store === //
const fileUp = multer({ storage: storage });
// === Video Store === //
// ==== Delete IMG ==== //
function DeleteIMG(imgDelete: string) {
  const path = `${LinkServer}/${imgDelete}`;
  // const path = `./public${imgDelete}`;
  try {
    fs.unlinkSync(path); //file removed
  } catch (err) {
    console.error(err);
    return err;
  }
}
// // ==== Delete IMG ==== //
// // =================== //
// = ADD IMAGES / FILES TO DB = //
// ========================================================= //
// = to Get IMAGES File PATH and SPLIT to SAVE in DataBase = //
// == http://localhost:662/public/images//************.png = //
// ======= Folder: public/images/*************.png ========= //
// ========================================================= //
// .split(path.sep); // Get PATH & Split To ARRAY
function fileDB(fileReQ: any, bodyREQ: any, imgType: string) {
  // === Console LOG === //
  console.log("IMG DB:", fileReQ);
  console.log("imgType", imgType);
  console.log("bodyREQ", bodyREQ);
  // === Console LOG === //
  var type = imgType;
  var IMG: any;
  if (fileReQ !== undefined) {
    const imgPath: any = fileReQ.split(path.sep); // Get PATH & Split To ARRAY
    // [public , images , 1645211075347.png] //
    IMG = imgPath.pop(); // Get the last value
    // [1645211075347.png] //
    const webp = IMG.split(".").shift(); // remove the type of image
    // [1645211075347] //
    const IMGwebp = `1${webp}.webp`; // make image type WEBP
    // === Resize IMAGES === //
    if (type === "image") {
      // var NewIMG = `${LinkDB}/${IMGwebp}`; // Send the Path\image to DB
      var NewIMG = `${IMGwebp}`; // Send the Path\image to DB
      sharp(`${LinkServer}/${IMG}`)
        .webp()
        // === Upload IMAGE to File === //
        .toFile(`${LinkServer}/${IMGwebp}`, (err) => {
          if (err) {
            sharp.cache({ memory: 0, files: 0, items: 0 });
            fs.unlinkSync(`${LinkServer}/${IMGwebp}`); //file removed
            console.log(
              "Error " + `${LinkServer}/${IMGwebp}` + " " + err.toString()
            );
            return json(
              "Error " + `${LinkServer}/${IMGwebp}` + " " + err.toString()
            );
          } else {
            sharp.cache({ memory: 0, files: 0, items: 0 });
            fs.unlinkSync(`${LinkServer}/${IMG}`); //file removed
          }
        });
      // === Upload IMAGE to File === //
      return NewIMG; // Send the Path\image to DB
    } else {
      // return `${LinkDB}/${IMG}`; // if Upload File id VIDEO Send the Path\image to DB
      return `${IMG}`; // if Upload File id VIDEO Send the Path\image to DB
    }
    // === Resize IMAGES === //
  } else if (bodyREQ !== undefined) {
    // IMG = `${LinkDB}/${bodyREQ}`;
    IMG = `${bodyREQ}`;
    return IMG;
  }
}
// === EXPORT === //
// export {publicFile, IMGup, fileUp, DeleteIMG, fileDB, DeleteResize,tempFile };
export { IMGup, fileUp, DeleteIMG, fileDB };

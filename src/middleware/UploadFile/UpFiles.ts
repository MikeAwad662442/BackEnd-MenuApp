// ===================== //
// ==== Upload Files === //
// ===================== //
import multer from "multer";
import path from "path";
import sharp from "sharp"; // === For Comprise Images
import fs from "fs";
// === Static INFO === //
const LinkServer = "./public/gallery";
const LinkDB = "/gallery";
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
  // const path = `${LinkServer}/${imgDelete}`;
  const path = `./public${imgDelete}`;
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
  var type = imgType;
  var IMG: any;
  if (fileReQ !== undefined) {
    const imgPath: any = fileReQ.split(path.sep); // Get PATH & Split To ARRAY
    // [public , images , 1645211075347.png] //
    IMG = imgPath.pop(); // Get the last value
    // [1645211075347.png] //
    const webp = IMG.split(".").shift(); // remove the type of image
    // [1645211075347] //
    const IMGwebp = `${webp}.webp`; // make image type WEBP
    // === Resize IMAGES === //
    if (type === "image") {
      var NewIMG = `${LinkDB}/${IMGwebp}`; // Send the Path\image to DB
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
          } else {
            sharp.cache({ memory: 0, files: 0, items: 0 });
            fs.unlinkSync(`${LinkServer}/${IMG}`); //file removed
          }
        });
      // === Upload IMAGE to File === //
      return NewIMG; // Send the Path\image to DB
    } else {
      return `${LinkDB}/${IMG}`; // if Upload File id VIDEO Send the Path\image to DB
    }
    // === Resize IMAGES === //
  } else if (bodyREQ !== undefined) {
    IMG = `${LinkDB}/${bodyREQ}`;
    return IMG;
  }
}
// ========================================================= //
// = to Get IMAGES File PATH and SPLIT to SAVE in DataBase = //
// ========================================================= //
// // ================= Image resize by SHARP ================= //
// // ========================================================= //
// function DeleteResize(path: any, imgType: string) {
//     var type = imgType;
// // === Delete Original IMAGES === //
//   if (type === 'image') {
//       fs.unlinkSync(path);  //file removed
//   }
// // === Delete Original IMAGES === //
//   }
// // ========================================================= //
// // ================= Image resize by SHARP ================= //
// // ========================================================= //
// === SOCKET.IO === //
const tempFile = async (upFile: string, saveFile: any, type: string) => {
  //   try {
  //     if (!fs.existsSync(upFile)){
  //       fs.mkdirSync(upFile,{recursive: true});
  //     }
  //     fs.writeFileSync(`${upFile}/${saveFile}`,saveFile)
  //       //     fs.writeFile(upFile,saveFile,(error) => {
  //       // // console.log({ message: err ? "failure" : "success" });
  //       //        console.error(error)
  //       // })
  // // // === Resize IMAGES === //
  //     if (type === 'image') {
  //      var NewIMG = 1 + saveFile;
  //   sharp(`${upFile}/${saveFile}`)
  //         // .resize(300, 300, { fit: "contain" })
  //     .webp()
  // // === Upload IMAGE to File === //
  //     .toFile(`${upFile}/${NewIMG}`, (err) => {
  //       if (err) {
  //         console.log('Error ' + `${upFile}/${NewIMG}` + ' ' + err.toString());
  //       } else {
  //         sharp.cache({ memory: 0, files: 0, items: 0 })
  //         fs.unlinkSync(`${upFile}/${saveFile}`);  //file removed
  //       }
  //     })
  // // === Upload IMAGE to File === //
  //       return NewIMG;
  //     } else {
  //       return saveFile;
  //     }
  //   }catch (e) {
  //         console.error(e)
  //       }

  //   // save the content to the disk, for example
  //   // console.log('image', image)
  //   // console.log('saveFile', saveFile)
  //     // fs.writeFile(upFile, saveFile, (err) => {
  //     //   console.log({ message: err ? "failure" : "success" });
  //     // });
  console.log("upFile:", upFile);
  console.log("saveFile:", saveFile);
};
// === EXPORT === //
// export {publicFile, IMGup, fileUp, DeleteIMG, fileDB, DeleteResize,tempFile };
export { IMGup, fileUp, DeleteIMG, fileDB };

"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.fileDB = exports.DeleteIMG = exports.fileUp = exports.IMGup = void 0;
// ===================== //
// ==== Upload Files === //
// ===================== //
const multer_1 = __importDefault(require("multer"));
const path_1 = __importDefault(require("path"));
const sharp_1 = __importDefault(require("sharp")); // === For Comprise Images
const fs_1 = __importDefault(require("fs"));
const sequelize_1 = require("sequelize");
// === Static INFO === //
const LinkServer = "./public/gallery";
// const LinkDB = "/gallery";
// === Static INFO === //
// === Stor Upload File in Server Storage File === //
const storage = multer_1.default.diskStorage({
    destination: (req, file, cb) => {
        if (!fs_1.default.existsSync(LinkServer)) {
            fs_1.default.mkdirSync(LinkServer, { recursive: true });
        }
        cb(null, LinkServer);
    },
    filename: (req, file, cb) => {
        const fileName = Date.now() + path_1.default.extname(file.originalname);
        cb(null, fileName);
    },
});
// === Stor Upload File in Server Storage File === //
// ==== IMG Store ==== //
const IMGup = (0, multer_1.default)({
    storage: storage,
    fileFilter: (req, file, cb) => {
        const fileType = /jpeg|jpg|JPG|png|gif|webp|jfif/;
        const mimetype = fileType.test(file.mimetype);
        const extname = fileType.test(path_1.default.extname(file.originalname));
        if (mimetype && extname) {
            return cb(null, true);
        }
        else {
            return cb(new Error("You can upload only image files!"));
        }
    },
});
exports.IMGup = IMGup;
// ==== IMG Store ==== //
// === Video Store === //
const fileUp = (0, multer_1.default)({ storage: storage });
exports.fileUp = fileUp;
// === Video Store === //
// ==== Delete IMG ==== //
function DeleteIMG(imgDelete) {
    const path = `${LinkServer}/${imgDelete}`;
    // const path = `./public${imgDelete}`;
    try {
        fs_1.default.unlinkSync(path); //file removed
    }
    catch (err) {
        console.error(err);
        return err;
    }
}
exports.DeleteIMG = DeleteIMG;
// // ==== Delete IMG ==== //
// // =================== //
// = ADD IMAGES / FILES TO DB = //
// ========================================================= //
// = to Get IMAGES File PATH and SPLIT to SAVE in DataBase = //
// == http://localhost:662/public/images//************.png = //
// ======= Folder: public/images/*************.png ========= //
// ========================================================= //
// .split(path.sep); // Get PATH & Split To ARRAY
function fileDB(fileReQ, bodyREQ, imgType) {
    // === Console LOG === //
    console.log("IMG DB:", fileReQ);
    console.log("imgType", imgType);
    console.log("bodyREQ", bodyREQ);
    // === Console LOG === //
    var type = imgType;
    var IMG;
    if (fileReQ !== undefined) {
        const imgPath = fileReQ.split(path_1.default.sep); // Get PATH & Split To ARRAY
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
            (0, sharp_1.default)(`${LinkServer}/${IMG}`)
                .webp()
                // === Upload IMAGE to File === //
                .toFile(`${LinkServer}/${IMGwebp}`, (err) => {
                if (err) {
                    sharp_1.default.cache({ memory: 0, files: 0, items: 0 });
                    fs_1.default.unlinkSync(`${LinkServer}/${IMGwebp}`); //file removed
                    console.log("Error " + `${LinkServer}/${IMGwebp}` + " " + err.toString());
                    return (0, sequelize_1.json)("Error " + `${LinkServer}/${IMGwebp}` + " " + err.toString());
                }
                else {
                    sharp_1.default.cache({ memory: 0, files: 0, items: 0 });
                    fs_1.default.unlinkSync(`${LinkServer}/${IMG}`); //file removed
                }
            });
            // === Upload IMAGE to File === //
            return NewIMG; // Send the Path\image to DB
        }
        else {
            // return `${LinkDB}/${IMG}`; // if Upload File id VIDEO Send the Path\image to DB
            return `${IMG}`; // if Upload File id VIDEO Send the Path\image to DB
        }
        // === Resize IMAGES === //
    }
    else if (bodyREQ !== undefined) {
        // IMG = `${LinkDB}/${bodyREQ}`;
        IMG = `${bodyREQ}`;
        return IMG;
    }
}
exports.fileDB = fileDB;

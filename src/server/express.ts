// ==================== //
// = All EXPRESS TOOLS  //
// ==================== //
import express, { Application, Request, Response } from "express"; // Import Express Server
import compression from "compression"; // compress all Files before be sended to the Client
import { corsWithOptions } from "../config/cors";
import path from "path";
const exp: Application = express();
exp
  .use(compression({ level: 6 })) // compress all Files before be sended to the Client
  .use(corsWithOptions) // to let Browser connect express server
  .use(express.json()) // Get JSON from Body
  // === to read the www file it must to add to same path of server.ts === //
  .use("/", express.static("./www")) // === Red Files === //
  // === to read the www file it must to add to same path of server.ts === //
  .use(express.static("public")); // === Red Files === //
// === Routes === //
// ItemTypesRouter
import { ItemTypesRouter } from "../routes/Items/ItemTypeR";
exp.use("/ItemTypes", ItemTypesRouter);
// ItemsRouter
import { ItemsRouter } from "../routes/Items/ItemsR";
exp.use("/Items", ItemsRouter);
// EventsRouter
import { EventsRouter } from "../routes/Events/eventsR";
exp.use("/events", EventsRouter);
// *** cPanel *** //
// LanguageRouter
import { LanguageRouter } from "../routes/cPanel/cLanguageR";
exp.use("/language", LanguageRouter);
// SocialMedia
import { SocialMediaRouter } from "../routes/cPanel/cSocialMediaR";
exp.use("/social", SocialMediaRouter);
// QR Server
import { QR } from "../routes/cPanel/cQR_R";
exp.use("/qr", QR);
// *** cPanel *** //
// === Routes === //
// === Front === //
exp.get("*", corsWithOptions, (req: Request, res: Response) => {
  return res.sendFile(path.join(__dirname, "./../../www/index.html"));
});
// === Front === //
export { exp };

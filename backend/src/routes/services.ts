import { Router } from "express";
import multer from "multer";
import {
  createService,
  getServices,
  getService,
  updateService,
  deleteService,
  getServicesByType,
  getServicesByLocation,
} from "../controllers/services";

export const serviceRouter = Router();
const Storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "public/serviceImages");
  },
  filename: (req, file, cb) => {
    cb(
      null,
      file.fieldname + "-" + Date.now() + "." + file.mimetype.split("/")[1]
    );
  },
});
const upload = multer({ storage: Storage });

serviceRouter.get("/location/:location", getServicesByLocation);
serviceRouter.get("/type/:type", getServicesByType);
serviceRouter.post("/", upload.single("image"), createService);
serviceRouter.get("/", getServices);
serviceRouter.get("/:id", getService);
serviceRouter.patch("/:id", upload.single("image"), updateService);
serviceRouter.delete("/:id", deleteService);

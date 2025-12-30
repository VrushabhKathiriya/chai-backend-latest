import { Router } from "express";
import { registerUser } from "../controllers/user.controller.js";
import {upload} from "../middlewares/multer.middleware.js"

const router = Router()

// router.post(
//   "/register",
//   upload.fields([
//     { name: "avatar", maxCount: 1 },
//     { name: "coverImage", maxCount: 1 }
//   ]),
//   registerUser
// );

router.post(
  "/register",

  (req, res, next) => {
    console.log("🔥 route reached");
    next();
  },

  upload.fields([
    { name: "avatar", maxCount: 1 },
    { name: "coverImage", maxCount: 1 }
  ]),

  (req, res, next) => {
    console.log("🔥 multer passed");
    console.log("FILES:", req.files);
    next();
  },

  registerUser
);



export default router
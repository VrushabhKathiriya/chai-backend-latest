import { Router } from "express";
import { loginUser, logoutUser, registerUser, refreshAccessToken } from "../controllers/user.controller.js";
import {upload } from "../middlewares/multer.middleware.js"
import { verifyJWT } from "../middlewares/auth.middleware.js";

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

router.route("/login").post(loginUser)

//secured routes
router.route("/logout").post(
  verifyJWT,
  router.route("/refresh-token").post(refreshAccessToken,
  logoutUser))


 


export default router
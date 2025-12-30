import { asyncHandler } from "../utils/asyncHandler.js";
import {ApiError} from "../utils/ApiError.js"
import { ApiResponse } from "../utils/ApiResponse.js";
import {User} from "../models/user.models.js"
import {uploadOnCloudinary} from "../utils/cloudinary.js"

const registerUser = asyncHandler(async (req, res) => {

  console.log("Content-Type:", req.headers["content-type"]);
  console.log("Files:", req.files);

  const { fullname, email, username, password } = req.body;

  if (!fullname?.trim()) throw new ApiError(400, "fullname is required");
  if (!email?.trim()) throw new ApiError(400, "email is required");
  if (!username?.trim()) throw new ApiError(400, "username is required");
  if (!password?.trim()) throw new ApiError(400, "password is required");

  const existedUser = await User.findOne({
    $or: [{ username }, { email }]
  });

  if (existedUser) {
    throw new ApiError(409, "User with email or username already exist");
  }

  const avatarLocalPath = req.files?.avatar?.[0]?.path;
  const coverImageLocalPath = req.files?.coverImage?.[0]?.path;

  console.log("Avatar local path:", avatarLocalPath);
  if (!avatarLocalPath) {
    throw new ApiError(400, "Avatar file is required");
  }

  const avatar = await uploadOnCloudinary(avatarLocalPath);
  if (!avatar?.url) {
    throw new ApiError(400, "Avatar upload failed");
  }

  let coverImage;
  if (coverImageLocalPath) {
    coverImage = await uploadOnCloudinary(coverImageLocalPath);
  }

  const user = await User.create({
    fullname,
    avatar: avatar.url,
    coverImage: coverImage?.url || "",
    email,
    password,
    username: username.toLowerCase(),
  });

  const createdUser = await User.findById(user._id)
    .select("-password -refreshToken");

  return res.status(201).json(
    new ApiResponse(201, createdUser, "User registered successfully")
  );
});


export {registerUser}
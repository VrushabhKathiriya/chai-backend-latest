import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import jwt from "jsonwebtoken";
import { User } from "../models/user.models.js";

export const verifyJWT = asyncHandler(async(req,res,
next)=>{
    try {
        const token = req.cookies?.accessToken || 
        req.header("Authorization")?.replace("Bearer ","")
    
        if(!token){
            throw new ApiError(401, "Unauthorized request")
        }
    
        const decodedToken = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET)
    
        const user = await User.findById(decodedToken?._id).select // token nu structure che emathi khabar padi jase
        ("-password -refreshToken")
    
        if (!user) {
            // NEXT_VIDEO: discuss about frontend
            throw new ApiError(401, "Invalid Access Token")
        }
    
        req.user = user;  // req ni anadar new object add kari didho user namno etle have req. karso to user batavase
        next()
        
    } catch (error) {
        throw new ApiError(401, error?.message ||
            "Invalid access token"
        )
    }

})
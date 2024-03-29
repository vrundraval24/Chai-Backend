import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/apiError.js";
import { User } from "../models/user.model.js";
import { cloudinaryFileUpload } from "../utils/cloudinary.js";
import { ApiResponse } from "../utils/apiResponse.js";

const registerUser = asyncHandler(async (req, res) => {
  // res.status(200).json({
  //   message: "ok",
  // });

  // get user details from frontend
  const { username, password, fullName, email } = req.body;
  console.log(username, password, fullName, email);

  // validate user info - check that values should not be empty
  if (
    [username, password, fullName, email].some((field) => field?.trim() === "")
  ) {
    throw new ApiError(400, "All fields are required.");
  }

  // check if user already exists
  const existingUser = await User.findOne({
    $or: [{ username }, { email }],
  });

  if (existingUser) {
    throw new ApiError(409, "username or email already in use, please enter some different username or email.");
  }


  // WRONG WAY TO EXTRACT PATH, IF FILE OR ARRAY IS MISSING THAN THROWS UNDEFINED TYPEERROR
  // get local path of avatar and coverImage
  // const avatarLocalPath = req.files?.avatar[0]?.path;
  // const coverImageLocalPath = req.files?.coverImage[0]?.path;


  // check if avatar is given, then extract path from it
  let avatarLocalPath;
  if(req.files && Array.isArray(req.files.avatar) && req.files.avatar.length > 0){
    avatarLocalPath = req.files.avatar[0].path;
  }else{
    console.log('Avatar is not given.');
  }

  // check if coverImage is given, then extract path from it
  let coverImageLocalPath;
  if(req.files && Array.isArray(req.files.coverImage) && req.files.coverImage.length > 0){
    coverImageLocalPath = req.files.coverImage[0].path;
  }else{
    console.log('CoverImage is not given.');
  }

  // avatar is required, is not available than throw error
  if (!avatarLocalPath) {
    throw new ApiError(400, "Avatar file is required.");
  }

  // upload avatar and coverImage to cloudinary
  const avatar = await cloudinaryFileUpload(avatarLocalPath);
  const coverImage = await cloudinaryFileUpload(coverImageLocalPath);

  // check that avatar file is successfully uploaded to cloudinary
  if (!avatar) {
    throw new ApiError(400, "Avatar file is required.");
  }

  // create user in database
  const user = await User.create({
    username: username.toLowerCase(),
    password,
    email,
    fullName,

    avatar: avatar.url,
    coverImage: coverImage?.url || "",
  });

  // remove password and refreshToken from user response
  const createdUser = await User.findById(user._id).select(
    "-password -refreshToken"
  );

  if (!createdUser) {
    throw new ApiError(500, "Something went wrong while registering user.");
  }

  res
    .status(201)
    .json(new ApiResponse(200, createdUser, "User registered successfully."));
});

export { registerUser };

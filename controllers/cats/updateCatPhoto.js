const cloudinary = require('cloudinary').v2;
const Jimp = require('jimp');
const fs = require('fs/promises');
const { v4: uuidv4 } = require('uuid');

const createError = require('http-errors');
const { Cat } = require('../../models/index');
const { catchAsync } = require('../../utils');

const { CLOUDINARY_CLOUD_NAME, CLOUDINARY_API_KEY, CLOUDINARY_API_SECRET } =
  process.env;

cloudinary.config({
  cloud_name: CLOUDINARY_CLOUD_NAME,
  api_key: CLOUDINARY_API_KEY,
  api_secret: CLOUDINARY_API_SECRET,
});

const updateCatPhoto = catchAsync(async (req, res, next) => {
  const { catId } = req.params;
  const { path: tempUpload, originalname } = req.file;

  let { photo } = req.body;

  const photoName = `${uuidv4()}_${originalname}`;
  const catPhoto = await Jimp.read(tempUpload);

  if (!catPhoto) {
    throw createError(400, 'Download users avatar error');
  }

  const cloudinaryUpload = await cloudinary.uploader.upload(tempUpload, {
    public_id: photoName,
    folder: 'public/photos',
    crop: 'fill',
    gravity: 'face',
  });

  await fs.unlink(tempUpload);

  photo = cloudinaryUpload.secure_url;

  const result = await Cat.findByIdAndUpdate(
    catId,
    { photo },
    {
      new: true,
    }
  );

  res.status(201).json({
    status: 'added',
    code: 201,
    data: { result },
  });
});

module.exports = updateCatPhoto;

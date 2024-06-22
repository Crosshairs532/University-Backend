import { v2 as cloudinary } from 'cloudinary';
import multer from 'multer';
import fs from 'fs';
cloudinary.config({
  cloud_name: 'diygzkicn',
  api_key: '298155555133462',
  api_secret: '37mK2aJEN7rMdhZVqz0h98kIDSc',
});
export const sendImageToCloudinary = (imageName: string, path: string) => {
  return new Promise((resolve, reject) => {
    cloudinary.uploader.upload(path, {
      public_id: imageName,
      function(error, Result) {
        if (error) {
          reject(error);
        }
        resolve(Result);
        fs.unlink(path, (err) => {
          if (err) {
            reject(err);
          } else {
            console.log('file deleted');
          }
        });
      },
    });
  });
};

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, process.cwd() + '/uploads');
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
    cb(null, file.fieldname + '-' + uniqueSuffix);
  },
});

export const upload = multer({ storage: storage });

import { v2 as cloudinary } from 'cloudinary';
import multer from 'multer';
export const sendImageToCloudinary = () => {
  cloudinary.config({
    cloud_name: 'diygzkicn',
    api_key: '298155555133462',
    api_secret: '<your_api_secret>', // Click 'View Credentials' below to copy your API secret
  });

  cloudinary.uploader.upload(
    'https://res.cloudinary.com/demo/image/upload/getting-started/shoes.jpg',
    {
      public_id: 'shoes',
    },
  );
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

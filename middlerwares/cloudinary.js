const cloudinary = require('cloudinary').v2;
const multer = require('multer');
const { CloudinaryStorage } = require('multer-storage-cloudinary');

// Configuración de Cloudinary
cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.CLOUD_API_KEY,
    api_secret: process.env.CLOUD_API_SECRET
  });


// Configuración de almacenamiento de imágenes en Cloudinary
const storage = new CloudinaryStorage({
    cloudinary: cloudinary,
    params: {
      folder: 'menu_images',
      allowedFormats: ['jpg', 'jpeg', 'png']
    }
  });
  
  const upload = multer({ storage: storage });
  
  
 module.exports = upload;


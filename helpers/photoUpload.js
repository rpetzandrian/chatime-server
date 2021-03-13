const multer = require("multer");

let storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./public/uploads/photos");
  },
  filename: function (req, file, cb) {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});

let fileFilter = (req, file, cb) => {
  if (
    file.mimetype == "image/png" ||
    file.mimetype == "image/jpg" ||
    file.mimetype == "image/jpeg"
  ) {
    cb(null, true);
  } else {
    cb(new Error("Only input jpg / jpeg / png"), false);
  }
};

let limits = {
  fileSize: 5000000,
};

let upload = multer({
  storage: storage,
  fileFilter: fileFilter,
  limits: limits,
});

const uploadHandler = {
  uploadPhoto: (req, res, next) => {
    const uploadedPhoto = upload.single("photo");
    uploadedPhoto(req, res, (err) => {
      if (err instanceof multer.MulterError) {
        // A Multer error occurred when uploading.
        res.status(400).send({
          messages: err.message,
          statusCode: 400,
        });
      } else if (err) {
        res.status(400).send({
          messages: err.message,
          statusCode: 400,
        });
        // An unknown error occurred when uploading.
      } else if (req.file == undefined) {
        next();
      } else next();
    });
  },
};

module.exports = uploadHandler;

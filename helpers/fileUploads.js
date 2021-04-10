const multer = require("multer");

let storage = multer.diskStorage({
  destination: function (req, file, cb) {
    if (file.fieldname == "images") {
      cb(null, "./public/uploads/images");
    } else if (file.fieldname == "file") {
      cb(null, "./public/uploads/files");
    } else if (file.fieldname == "document") {
      cb(null, "./public/uploads/documents");
    }
  },
  filename: function (req, file, cb) {
    cb(null, `${file.fieldname}-${Date.now()}-${file.originalname}`);
  },
});

let fileFilter = (req, file, cb) => {
  if (file.fieldname == "images") {
    if (
      file.mimetype == "image/png" ||
      file.mimetype == "image/jpg" ||
      file.mimetype == "image/jpeg"
    ) {
      cb(null, true);
    } else {
      cb(new Error("Only input jpg / jpeg / png"), false);
    }
  } else if (file.fieldname == "document") {
    if (
      file.mimetype == "application/docx" ||
      file.mimetype == "application/pdf" ||
      file.mimetype == "application/txt" ||
      file.mimetype == "application/ai" ||
      file.mimetype == "application/eps" ||
      file.mimetype == "application/psd"
    ) {
      cb(null, true);
    } else {
      cb(new Error("Only input docx / pptx / pdf"), false);
    }
  } else {
    cb(null, true);
  }
};

let limits = {
  fileSize: 20000000,
};

let upload = multer({
  storage: storage,
  fileFilter: fileFilter,
  limits: limits,
});

const uploadHandler = {
  uploadImage: (req, res, next) => {
    const uploadedImages = upload.single("images");
    uploadedImages(req, res, (err) => {
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

  uploadFile: (req, res, next) => {
    const uploadedFile = upload.single("file");
    uploadedFile(req, res, (err) => {
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

  uploadDoc: (req, res, next) => {
    const uploadedDoc = upload.single("document");
    uploadedDoc(req, res, (err) => {
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

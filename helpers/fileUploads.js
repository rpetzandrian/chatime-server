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

let limitsImage = {
  fileSize: 5000000,
};

let limitsDocument = {
  fileSize: 20000000,
};

let limitsFile = {
  fileSize: 50000000,
};

let uploadImage = multer({
  storage: storage,
  fileFilter: fileFilter,
  limits: limitsImage,
});

let uploadDoc = multer({
  storage: storage,
  fileFilter: fileFilter,
  limits: limitsDocument,
});

let uploadFile = multer({
  storage: storage,
  fileFilter: fileFilter,
  limits: limitsFile,
});

const uploadHandler = {
  uploadImage: (req, res, next) => {
    const uploadedImages = uploadImage.array("images", 10);
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
    const uploadedFile = uploadFile.array("file", 1);
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
    const uploadedDoc = uploadDoc.array("document", 3);
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

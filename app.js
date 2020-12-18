const path = require("path");
const express = require("express");
const multer = require("multer");
const cors = require("cors");

const app = express();

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, `${__dirname}/public/uploads`);
  },
  filename: function (req, file, cb) {
    let filename = file.originalname.split(".")[0];
    let fileExtension = file.originalname.split(".")[1];
    let fileName = `${filename}-${Date.now()}.${fileExtension}`;
    cb(null, fileName);
  },
});
const upload = multer({ storage: storage });

app.use(express.static(path.join(__dirname, "public")));

app.use(cors());

app.post(
  "/api/v1/uploads/images",
  upload.single("picture"),
  function (req, res) {
    console.log(req.body);
    console.log(req.file);
    res.status(201).json({
      status: "success",
      data: {
        url: `${req.file.filename}`,
        title: req.body.filetitle,
      },
    });
  }
);

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`${port}`);
});

"use strict";
import { Storage } from "@google-cloud/storage";
import dateFormat from "dateformat";
import path from "path";

const pathKey = path.resolve("./imgUpload.json");

// TODO: Sesuaikan konfigurasi Storage
const gcs = new Storage({
  projectId: "smartrinse",
  keyFilename: pathKey,
});

// TODO: Tambahkan nama bucket yang digunakan
const bucketName = "assets-sr";
const bucket = gcs.bucket(bucketName);

function getPublicUrl(filename) {
  return "https://storage.googleapis.com/" + bucketName + "/" + filename;
}

let ImgUpload = {};

ImgUpload.uploadToGcs = (req, res, next) => {
  
  if (!req.file) return next();

  const folder = req.body.folder; 
  const user = req.body.user
  const owner = req.body.owner
  const upload = user || owner  
  
  const timestamp = dateFormat(new Date(), "yyyymmdd-HHMMss");
  const filename = `${timestamp}-${upload}`;
  const gcsname = folder + "/" + filename;
  const file = bucket.file(gcsname);

  const stream = file.createWriteStream({
    metadata: {
      contentType: req.file.mimetype,
    },
  });

  stream.on("error", (err) => {
    req.file.cloudStorageError = err;
    next(err);
  });

  stream.on("finish", () => {
    req.file.cloudStorageObject = gcsname;
    req.file.cloudStoragePublicUrl = getPublicUrl(gcsname);
    next();
  });

  stream.end(req.file.buffer);
};

export default ImgUpload;

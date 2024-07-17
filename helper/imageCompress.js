"use strict";

var Jimp = require("jimp");

let _compressImage = async () => {
  let imagePath = __dirname + "/original.jpg";
  let output = __dirname + "/compressed.jpg";

  Jimp.read(imagePath, (err, lenna) => {
    if (err) throw err;
    lenna
      .resize(256, 256) // resize
      .quality(60) // set JPEG quality
      //   .greyscale()
      .write(output); // save
  });
};

// _compressImage();

module.exports = {
  compressImage: _compressImage,
};

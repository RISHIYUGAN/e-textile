const Compress = require("compress.js");
const compress = new Compress();

export const compressFile = async (files, options = {}, callBack) => {
    compress
      .compress(files, {
        size: options.size ? options.size : 2, // the max size in MB, defaults to 2MB
        quality: options.quality ? options.quality : 0.75, // the quality of the image, max is 1,
        maxWidth: 1920, // the max width of the output image, defaults to 1920px
        maxHeight: 1920, // the max height of the output image, defaults to 1920px
        resize: options.resize !== undefined ? options.resize : false, // defaults to true, set false if you do not want to resize the image width and height
      })
      .then((data) => {
        let newData = data.map((el) => ({
          ...el,
          dataWithPrefix: el.prefix + el.data,
        }));
        //   data[0].prefix + data[0].data
        callBack(newData);
        //   return [...data];
      });
  };
// import imagemin from "imagemin";
// import imageminGiflossy from "imagemin-giflossy";

const optimizeImage = (gifData: string) => {
  return gifData;
  // const optimizedBuffer = imagemin.bufferSync(gifData, {
  //   plugins: [imageminGiflossy({ lossy: 80 })],
  // });
  // const optimizedData = `data:image/gif;base64,${optimizedBuffer.toString(
  //   "base64"
  // )}`;
  // return optimizedData;
};

export { optimizeImage };

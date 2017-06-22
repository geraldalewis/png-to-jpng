import pngToJPNG from '../../lib/png-to-jpng';
import jpng from 'jpng';

function convertPNG(record, quality){
  return new Promise( (resolve, reject) => {
    pngToJPNG(record.input.dataURL, quality, (out) => {
      const img = new Image();
      img.onerror = (error) => {
        img.onerror = img.onload = null;
        record.error = error;
        reject(record);
      }
      img.onload = () => {
        const x = record.output.x, 
              y = record.output.y, 
              w = record.output.w, 
              h = record.output.h;
        img.onerror = img.onload = null;
        record.result.img = img;
        record.result.canvas = jpng(img, x, y, w, h);
        jpng.toDataURL(out.url, x, y, w, h, (dataURL) => {
          record.result.dataURL = dataURL;
          resolve(record);
        });
      };
      record.output = out;
      img.src = out.url;
    });
  });
}
export default convertPNG;
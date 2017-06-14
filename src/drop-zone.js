import pngToJPNG from '../lib/png-to-jpng';
import { appendResults } from './jpng-results';
import jpng from 'jpng';

const supported = pngToJPNG.supported &&
                  typeof FileReader === 'function' && !!(FileReader.prototype.readAsDataURL) &&
                  typeof URL === 'function' && !!(URL.createObjectURL);

const nonPNGError = "Not a PNG file";

function createRecord(file){
  return { 
      file,  
      type: file.type,
      name: file.name, 
      size: file.size, 
      dataURL: null, 
      error: null,
      img: null,
      jpng: null,
      jpngIMG: null, jpngCanvas: null,
      w: 0, h: 0
  };
}

function readImage(record){
  return new Promise( (resolve, reject) => {
    const reader = new FileReader();
    reader.addEventListener('error', (e) => { 
      record.error = reader.error;
      reject(record);
    });
    reader.addEventListener('load', (e) => {
      record.dataURL = reader.result;
      const img = new Image();
      img.onerror = (error) => {
        img.onerror = img.onload = null;
        record.error = error;
        reject(record);
      }
      img.onload = () => {
        img.onerror = img.onload = null;
        record.img = img;
        if (record.type === 'image/png') resolve(record);
        else {
          record.error = nonPNGError;
          reject(record);
        }
      };
      img.src = record.dataURL;
    });
    reader.readAsDataURL(record.file);
  });
}

function convertToJPNG(record){
  return new Promise( (resolve, reject) => {
    pngToJPNG(record.dataURL, .7, (out) => {
      const img = new Image();
      img.onerror = (error) => {
        img.onerror = img.onload = null;
        record.error = error;
        reject(record);
      }
      img.onload = () => {
        img.onerror = img.onload = null;
        record.jpngIMG = img;
        try {
          record.jpngCanvas = jpng(img, record.jpng.x, record.jpng.y, record.jpng.w, record.jpng.h);
          resolve(record);
        } catch (e) {
          record.error = e;
          reject(record);
        }
      };
      record.w = out.w; record.h = out.h;
      record.jpng = out;
      img.src = URL.createObjectURL(out.blob);
    });
  });
}

function ondropped(e){
  // Note: `files` is a `FileList` object, which looks like an Array object, but is not.
  const files = e.dataTransfer.files,
        len = files.length, records = [],
        promises = [];
  for (let file, i = 0; i < len; i++) {
    file = files.item(i);
    records.push(createRecord(file));
  }
  records.forEach( (record) => {
    let promise = null;
    promise = readImage(record).then(convertToJPNG).catch( (record) => Promise.resolve(record));
    promises.push(promise);
  });
  Promise.all(promises).then( (records) => {
    appendResults(records);
  });
}

function createDropZone(){
  const zone = document.getElementById('drop-zone');

  if (!supported) {
    zone.classList.add('dnd-not-supported');
    return;
  }

  zone.style.backgroundColor = '#00ff00';
  zone.addEventListener('dragenter', (e) => {
    zone.style.backgroundColor = '#ff0000';
  });
  zone.addEventListener('dragleave', (e) => {
    zone.style.backgroundColor = '#00ff00';
  });
  zone.addEventListener('drop', ondropped);
}

export default createDropZone;
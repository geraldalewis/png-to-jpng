function isFN(o){ return o === 'function'; }

var supported = isFN(typeof HTMLCanvasElement) && 
                (HTMLCanvasElement.prototype.toBlob || (isFN(typeof atob) && isFN(typeof Uint8Array))) &&
                isFN(typeof URL) && !!(URL.createObjectURL);

const errors = {
  notPNG: "This file is not a png.",
  notTransparent: "This image has no transparency.",
  cannotCompress: "This image could not be compressed."
};

function toBlob(canvas, callback, type, quality){
  if (canvas.toBlob) return canvas.toBlob(callback, type, quality);
  var dataURL = canvas.toDataURL(type, quality),
      string = atob(dataURL.split(',')[1]),
      i, len = string.length, data = new Uint8Array(len);

  for (i = 0; i < len; i++) data[i] = string.charCodeAt(i);
  
  callback( new Blob([ data ], { type: type } ));
}

function context2d(w, h){
  var canvas = document.createElement('canvas'),
      ctx = canvas.getContext('2d');
  canvas.width = w; canvas.height = h;
  return ctx;
}

function free(ctx){
  const canvas = ctx.canvas;
  canvas.width = 0; canvas.height = 0;
}

function createRGB(png){
  var w = png.width, h = png.height,
      ctx = context2d(w, h),
      image, data, i, len;

  ctx.drawImage(png, 0, 0);

  image = ctx.getImageData(0, 0, w, h);
  data = image.data; len = data.length;

  // ensure the image is opaque; otherwise, the final compositing step
  // will double-premultiply.
  for (i = 0; i < len; i += 4) data[i+3] = 255;
  ctx.putImageData(image, 0, 0);
  return ctx;
}

function createAlpha(png){
  var w = png.width, h = png.height,
      ctx = context2d(w, h);

  ctx.fillStyle = 'rgb(255,255,255)';
  ctx.fillRect(0, 0, w, h);
  ctx.globalCompositeOperation = 'xor';
  ctx.drawImage(png, 0, 0);

  return ctx;
}

function createJPNGBlob(png, quality, callback){
  var w = png.width, h = png.height,
      rgb = createRGB(png),
      a = createAlpha(png),
      height = h<<1,
      ctx = context2d(width, height);
  
  if (quality === undefined || (quality !== quality)) quality = 0.7;
  else if (quality < 0) quality = 0;
  else if (quality > 1) quality = 1;
  
  ctx.drawImage(rgb.canvas, 0, 0);
  ctx.drawImage(a.canvas, 0, h);
  
  toBlob(ctx.canvas, (blob) => { callback(blob); }, 'image/jpeg', quality);
}

function hasTransparency(img){
  const w = img.width, h = img.height,
        ctx = context2d(w, h),
        transparent = false;

  ctx.drawImage(img, 0, 0);
  const data = ctx.getImageData(0, 0, w, h),
        channels = data.data, len = channels.length;

  for (let i = 0; i < len; i += 4) {
    if (channels[i + 3] !== 255) { transparent = true; break; }
  }
  free(ctx);
  return transparent;
}

function canCompress(png, bytes, resolve, reject){
  const lowQuality = 0.1;
  createJPNGBlob(png, lowQuality, (blob) => {
    const diff = bytes - blob.size;
    if (diff > 1024) resolve(diff);
    else reject(diff);
  });
}

function validatePNG(src, size, resolve, reject){
  const img = new Image();
  img.onerror = () => {
    img.onerror = img.onload = null;
    reject(errors.notPNG);
  }
  img.onload = () => {
    img.onerror = img.onload = null;
    if (hasTransparency(img)) {
      canCompress(img, size, 
        => { resolve({ src, size, img }) }, 
        => { reject({ img, error: errors.cannotCompress }) }
      });
    }
    else reject({ img, error: errors.notTransparent });
  };
  img.crossorigin = 'anonymous';
  img.src = src;
}

function readFile(file, resolve, reject){
  const reader = new FileReader();
  reader.addEventListener('error', => reject(reader.error));
  reader.addEventListener('load', => validatePNG(reader.result, file.size, resolve, reject));
  reader.readAsDataURL(file);
}

function findQualityForRatio(png, size, ratio, lower, upper, callback){
  const tolerance = 0.01, qTolerance = 0.01;
  var quality = (lower + upper) / 2;
  function onblob(blob){
    const s = blob.size, r = s/size;
    if      (r > (ratio + tolerance)) upper = quality;
    else if (r < (ratio - tolerance)) lower = quality;
    else { return callback({ quality, size: s }); }
    // if the difference between upper and lower is too slim, abort and return lower.
    if ((upper - lower) < qTolerance) {
      return callback({ quality: lower, size: s });
    }
    createJPNGBlob( png, (quality = (lower + upper) / 2), onblob );
  }
  createJPNGBlob( png, (quality = (lower + upper) / 2), onblob );
}

function pruneVersions(results, size){
  var ratio, percent, originalKB = Math.round(size / 1024);
  return results.filter( (version, index, array) => {
    ratio = version.size/size;
    percent = -(100 - Math.round( ratio * 100));
    version.original = size;
    version.originalKB = originalKB;
    version.ratio = ratio;
    version.kb = Math.round(version.size / 1024);
    version.percent = (ratio >= 0 ? '+' : '') + percent + '%';
    version.selected = index === 0;
    return index == 0 || (version.kb !== array[index-1].kb);
  });
}

function createVersions(png, size, callback){
  var lower = 0.05, upper = 0.93, results = [];
  findQualityForRatio(png, size, .5, lower, upper, (result) => {
    upper = result.quality; results.push(result);
    findQualityForRatio(png, size, .1, lower, upper, (result) => {
      lower = result.quality; results.push(result);
      findQualityForRatio(png, size, .25, lower, upper, (result) => {
        upper = result.quality; results.push(result);
        findQualityForRatio(png, size, .15, lower, upper, (result) => {
          lower = result.quality; results.push(result);
          callback(pruneVersions(results, size));
        });
      });
    });
  });
}

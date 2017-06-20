<template>
  <section class="drop-zone-section">
    <div id="drop-zone" 
      class="drop-zone"
      @dragenter="ondragenter"
      @dragleave="ondragleave"
      @drop="ondropped"
    >
      <div class="drop-zone_cta">
        <svg 
          xmlns="http://www.w3.org/2000/svg" 
          width="32" 
          height="32" 
          viewBox="0 0 24 24" 
          fill="none" 
          stroke="#606060" 
          stroke-width="3" 
          stroke-linecap="round" 
          stroke-linejoin="round">
  <path d="M3,17v3a2,2,0,0,0,2,2H19a2,2,0,0,0,2-2V17"/>
  <polyline points="8 12 12 16 16 12"/>
  <line x1="12" y1="2" x2="12" y2="16"/>
</svg><span>drop your PNGs here</span>
        </div>
      </div>
      <div class="drop-zone_logo">
        <span class="drop-zone_logo-j">J</span><span class="drop-zone_logo-p">P</span><span class="drop-zone_logo-n">N</span><span class="drop-zone_logo-g">G</span>
      </div>
      <img class="rooster" src="../assets/rooster-250px.png">
    </div>
  </section>
</template>

<script>
import pngToJPNG from '../../lib/png-to-jpng';
import convertPNG from '../utils/convert-png';
import jpng from 'jpng';

const supported = pngToJPNG.supported &&
                  typeof FileReader === 'function' && 
                  !!(FileReader.prototype.readAsDataURL);

const errors = {
  notPNG: "This file is not a png.",
  notTransparent: "This image has no transparency."
};

let id = 0;
function createRecord(file){
  return {
    id: ++id,
    name: file.name.substring(0, file.name.lastIndexOf('.')),
    error: null,
    removed: false,
    input: {
      file,
      type: file.type,
      name: file.name, 
      size: file.size, 
      dataURL: null, 
      img: null,
      w: 0, h: 0
    },
    output: null,
    result: {
      img: null,
      canvas: null,
      dataURL: null
    },
    sizes: []
  };
}

function hasTransparency(img){
  const canvas = document.createElement('canvas'),
        ctx = canvas.getContext('2d'),
        w = img.width, h = img.height;
  canvas.width  = w;
  canvas.height = h;
  ctx.drawImage(img, 0, 0);
  const data = ctx.getImageData(0, 0, w, h),
        channels = data.data, len = channels.length;

  for (let i = 0; i < len; i += 4) {
    if (channels[i + 3] !== 255) return true;
  }
  return false;
}

function readImage(record){
  return new Promise( (resolve, reject) => {
    const reader = new FileReader();
    reader.addEventListener('error', (e) => { 
      record.error = reader.error;
      reject(record);
    });
    reader.addEventListener('load', (e) => {
      record.input.dataURL = reader.result;
      const img = new Image();
      img.onerror = (error) => {
        img.onerror = img.onload = null;
        record.error = error;
        reject(record);
      }
      img.onload = () => {
        img.onerror = img.onload = null;
        record.input.w = img.width;
        record.input.h = img.height;
        record.input.img = img;
        if (record.input.type === 'image/png') {
          if (hasTransparency(img)) resolve(record);
          else {
            record.error = errors.notTransparent;
            reject(record);
          }
        }
        else {
          record.error = errors.notPNG;
          reject(record);
        }
      };
      img.src = record.input.dataURL;
    });
    reader.readAsDataURL(record.input.file);
  });
}

function findQuality(record, size){
  return new Promise( (resolve, reject) => {
    pngToJPNG.calibrate(record.input.dataURL, size, (quality) => {
      record.sizes.push( quality );
      record.sizes.sort( (a, b) => { return b.quality - a.quality } );
      resolve(quality);
    });
  });
}

function convertToJPNG(record){
  return new Promise( (resolve, reject) => {
    const qualities = [.5, .25, .15, .1].map( (q) => {
      return Math.round( (record.input.size * q)/ 1024 );
    });
    const promises = qualities.map( (quality) => findQuality(record, quality) );
    Promise.all(promises).then( () => {
      const quality = record.sizes[0].quality;
      convertPNG(record, quality).
        then( (record) => resolve(record) ).
        catch( (record) => reject(record) );
    });
  });
}

export default {
  name: 'drop-zone',
  methods: {
    ondragenter(){},
    ondragleave(){},
    ondropped(e){
      // Note: `files` is a `FileList` object, which looks like an Array object, 
      // but is not.
      const files = e.dataTransfer.files,
            len = files.length, records = [];
      for (let file, i = 0; i < len; i++) {
        file = files.item(i);
        records.push(createRecord(file));
      }
      const promises = records.map( (record) => {
        return readImage(record).
          then(convertToJPNG).
          catch( (record) => Promise.resolve(record));
      });
      Promise.all(promises).then( (records) => {
        this.$emit('appendJPNGResults', records);
      });
    }
  },
  mounted(){
    if (!supported) this.$el.classList.add('dnd-not-supported');
  }
}
</script>
<style>
.drop-zone-section {
  position: relative;
  margin-bottom: 0;
  background-color: #f0f0f0;
  /*
  background-color: #fff;
  background-size: 20px 20px;
  background-position: 0 0, 10px 10px;
  background-image: 
    linear-gradient(45deg, #e7e7e7 25%, transparent 25%, transparent 75%, #e7e7e7 75%, #e7e7e7), 
    linear-gradient(45deg, #e7e7e7 25%, transparent 25%, transparent 75%, #e7e7e7 75%, #e7e7e7);
  */
  background-image: repeating-linear-gradient(
    40deg,
    #fff,
    #fff 15px,
    #f0f0f0 15px,
    #f0f0f0 30px
  );
}
.drop-zone {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 200px;
  margin: 20px auto 20px auto;
  min-width: 280px;
  max-width: 680px;
  padding: 20px;

  border: 3px dashed #ddd;
  border-radius: 4px;

  background: rgba(255,255,255,.5);

  font-size: 38px;
  font-weight: 700;
  letter-spacing: 1px;
  color: rgba(255,68,255,1);/*#ff44ff;*/
  /*text-shadow: 2px 2px 1px rgba(0,212,212,1);*/
}
.drop-zone  svg {
  margin: 0 5px 0 0;
  padding: 5px 0;
  width: 52px;
  height: 52px;
}
.dnd-not-supported {
  background-color: #ff0000;
}
.drop-zone_cta {
  display: flex;
  justify-content: center;
  align-items: flex-end;
  line-height: 52px;
}
.drop-zone_logo {
  position: absolute;
  top: 30px;
  left: 10px;
  font-size: 48px;
  font-weight: 700;
  color: #f0f0f0;
  text-shadow: 0px 0px 8px rgba(0,0,0,.23);
}
.drop-zone_logo-j {
  background-color: #222;
  padding: 5px 16px;
}
.drop-zone_logo-p {
  background-color: #333;
  padding: 5px 14px;
}
.drop-zone_logo-n {
  background-color: #444;
  padding: 5px 14px;
}
.drop-zone_logo-g {
  background-color: #555;
  padding: 5px 14px;
}
.rooster {
  pointer-events: none;
  position: absolute;
  right: -20px;
  bottom: -10px;
}
</style>
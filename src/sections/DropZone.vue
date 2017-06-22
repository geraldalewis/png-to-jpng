<template>
  <header 
    id="drop-zone" 
    @dragenter="ondragenter"
    @dragleave="ondragleave"
    @dragover="ondragover"
    @drop="ondropped"
    class="drop--header"
  >
    <h1 class="drop--logo">
      <span class="drop--logo-j">J</span><span class="drop--logo-p">P</span><span class="drop--logo-n">N</span><span class="drop--logo-g">G</span>
    </h1>
    <img 
      id="rooster"
      alt="A saucy rooster"
      class="drop--rooster" 
      src="../assets/rooster-250px.png"
      draggable="true"
      @dragstart="ondragrooster"
      >
    <div class="drop--zone">
      <div class="drop--zone_cta">
        <svg 
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg" 
          width="24" 
          height="24" 
          viewBox="0 0 24 24" 
          fill="#ff3344" 
          stroke="#ff4466" 
          stroke-width="1" 
          stroke-linecap="round" 
          stroke-linejoin="round"><path d="M20.84,4.61a5.5,5.5,0,0,0-7.78,0L12,5.67,10.94,4.61a5.5,5.5,0,0,0-7.78,7.78l1.06,1.06L12,21.23l7.78-7.78,1.06-1.06A5.5,5.5,0,0,0,20.84,4.61Z"/>
        </svg><span>drop your PNGs here</span>
        </div>
      </div>
    </div>
  </header>
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
  notIMG: "This file is not an image.",
  notTransparent: "This image has no transparency."
};

let id = 0;

function createRecord_(name){
  return {
    id: ++id,
    name,
    error: null,
    removed: false,
    input: {
      img: null
    },
    output: null,
    versions: []
  };
}
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
      img.onerror = () => {
        img.onerror = img.onload = null;
        record.error = errors.notIMG;
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
      quality.original = record.input.size;
      quality.originalKB =  Math.round(record.input.size/1024);
      quality.kb = Math.round(quality.size/1024);
      quality.ratio = quality.size/record.input.size;
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

function drawIMG(id){
  const img = document.getElementById(id),
        canvas = document.createElement('canvas'),
        ctx = canvas.getContext('2d');
  canvas.width = img.width; canvas.height = img.height;
  ctx.drawImage(img, 0, 0);
  function readBlob(blob){
    const reader = new FileReader();
    reader.addEventListener('error', (e) => { 
      /*
      record.error = reader.error;
      reject(record);
      */
    });
    reader.addEventListener('load', (e) => {
      /*record.input.dataURL = reader.result;*/
      console.log(reader.result);
    });
    reader.readAsDataURL(blob);
  }
  canvas.toBlob((blob) => { readBlob(blob); }, 'image/png', 1.0);
}

export default {
  name: 'drop-zone',
  methods: {
    ondragenter(){},
    ondragleave(){},
    ondragrooster(e){
      e.dataTransfer.setData('text', 'rooster');
    },
    ondragover(e){ e.preventDefault(); return false; },
    ondropped_(e){
      const name = file.name.substring(0, file.name.lastIndexOf('.')),
            record = createRecord(name);

      function onpng({ src, size, img }){
        toJPNG.createVersions(img, size, (versions) => {
          record.versions = versions;
          toJPNG.create
          this.$emit('appendJPNGResults', [record]);
        });
      }
      function onerr(error){ // string | Error | { img, error }
        if (error && error.img) {
          record.input.img = error.img;
          record.error = error.error;
        }
        this.$emit('appendJPNGResults', [record]);
      }
      toJPNG.readFile(file, onpng, onerr);
    },
    ondropped(e){
      // Note: `files` is a `FileList` object, which looks like an Array object, 
      // but is not.
      e.preventDefault();
      const id = e.dataTransfer.getData('text/plain');
      if (id) {
        drawIMG(id);
        return;
      }
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
.drop--header {
  position: relative;
  padding: 20px;
  margin-bottom: 0;
  background-color: #f0f0f0;
  background-image: repeating-linear-gradient(
    40deg,
    #fff,
    #fff 20px,
    #f7f7f7 20px,
    #f7f7f7 40px
  );
}
.drop--zone {
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

  background: rgba(255,255,255,.45);

  font-size: 24px;
  font-weight: 400;
  letter-spacing: 1px;
  color: #555;
}
.drop--zone  svg {
  margin: 0 5px 0 0;
  padding: 5px 0;
  width: 48px;
  height: 48px;
}
.dnd-not-supported {
  background-color: #ff0000;
}
.drop--zone_cta {
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  user-select: none;
}
.drop--logo {
  position: absolute;
  top: 30px;
  left: 10px;
  font-size: 48px;
  font-weight: 700;
  color: #fff;
  text-shadow: 0px 0px 8px rgba(0,0,0,.16);
}
.drop--logo-j {
  background-color: #222;
  padding: 5px 18px;

  background-image: linear-gradient( 45deg, #494949 50%, #00eeee 50.5%);
}
.drop--logo-p {
  background-color: #333;
  padding: 5px 18px;
  background-image: linear-gradient( 45deg, #333 50%, #00eeee 50.5%);
}
.drop--logo-n {
  background-color: #444;
  padding: 5px 18px;
  background-image: linear-gradient( 45deg, #333 50%, #666 50.5%);
}
.drop--logo-g {
  background-color: #555;
  padding: 5px 18px;
  background-image: linear-gradient( 45deg, #333 50%, #00eeee 50.5%);
}
.drop--rooster {
  position: absolute;
  right: -20px;
  bottom: -10px;
  width: 125px;
  height: 130px;
}
@media (min-width: 600px) {
  .drop--rooster {
    width: 188px;
    height: 195px;
  }
}
@media (min-width: 768px) {
  .drop--rooster {
    width: 250px;
    height: 260px;
  }
}
</style>
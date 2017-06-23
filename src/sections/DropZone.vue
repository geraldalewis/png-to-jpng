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
import { toDataURL as jpngToDataURL } from 'jpng';
import toJPNG from '../../lib/to-jpng';
//import roosterSrc from '../assets/rooster-250px-jpng.jpg';

let id = 0;
function createRecord(file){
  return {
    id: ++id,
    name: file.name.substring(0, file.name.lastIndexOf('.')),
    filename: file.name,
    size: file.size,
    error: null,
    removed: false,
    w: 0, h: 0,
    img: null,
    jpng: null,
    input: null,
    output: null,
    download: null,
    versions: []
  };
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
    createJpngFromFile(file){
      const name = file.name.substring(0, file.name.lastIndexOf('.')),
            record = createRecord(file);

      const onpng = ({ src, size, img }) => {
        record.img = img;
        record.w = img.width;
        record.h = img.height;
        toJPNG.createVersions(img, size, (versions) => {
          record.jpng = toJPNG.createJPNGCanvas(img);
          record.versions = versions;
          toJPNG.createCompositedJpngDataURL(record.jpng, record.w, record.h, versions[0].quality, (dataURL) => {
          //toJPNG.createCompositedJpngDataURL(img, versions[0].quality, (dataURL) => {
            record.output = dataURL;
            setTimeout(() => {
              record.download = toJPNG.createJPNGDataURL(img, versions[0].quality);
        }, 100);
          });
        });
        this.$emit('appendJPNGResults', [record]);
      }
      const onerr = (error) => { // string | Error | { img, error }
        if (error && error.img) {
          record.img = error.img;
          record.input = error.src;
          record.error = error.error;
        }
        else record.error = error;
        this.$emit('appendJPNGResults', [record]);
      }
      toJPNG.readFile(file, onpng, onerr);
    },
    ondropped(e){
      e.preventDefault();
      const files = e.dataTransfer.files,
            len = files.length;
      //const id = e.dataTransfer.getData('text/plain');
      //if (id) { drawIMG(id); return; }
      // Note: `files` is a `FileList` object, which looks like an Array object, 
      // but is not.
      for (let i = 0; i < len; i++) this.createJpngFromFile(files.item(i));
    }
  },
  mounted(){
    if (!toJPNG.supported) this.$el.classList.add('dnd-not-supported');
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

  background-image: linear-gradient( 45deg, #4e4e4e 50%, #00eeee 50.5%);
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
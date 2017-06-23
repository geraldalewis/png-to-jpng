<template>
  <li>
    <jpng-result-header 
      :filename="record.filename" 
      :filesize="originalKB"
      :error="record.error"
      @close="close"
      ></jpng-result-header>
    <div v-if="!!record.error" class="result--error">{{ record.error }}</div>
    <div class="result--image">
      <img 
        v-if="!!(record.error && record.input)" 
        :src="record.input">
      <img 
        v-else="!!record.error" 
        :src="record.output" 
        class="bg-transparent">
    </div>
    <div class="result--output" v-if="!record.error">
      <size-picker 
        :record="record" 
        :selected="size"
        @sizeChanged="onsize"
      ></size-picker>
      <download-button v-if="record.download" :record="record"></download-button>
    </div>
    <img-code :record="record" v-if="!record.error">></img-code>
  </li>
</template>
<script>
import toJPNG from '../../lib/to-jpng';
import SizePicker from '../components/SizePicker.vue';
import DownloadButton from '../components/DownloadButton.vue';
import ImgCode from '../components/ImgCode.vue';
import JpngResultHeader from '../components/JpngResultHeader.vue';

export default {
  name: 'jpng-result',
  props: ['record'],
  data: function(){
    return { 
      size_: 0
    }
  },
  components: { JpngResultHeader, SizePicker, DownloadButton, ImgCode },
  computed: {
    originalKB(){
      return Math.round(this.record.size  / 1024);
    },
    versions(){
      return this.record.versions;
    },
    size: {
      get: function(){
        return this.versions[this.size_];
      },
      set: function(size){
        const versions = this.versions, len = versions.length;
        for (let i = 0; i < len; i++) {
          if (size === versions[i]) { this.size_ = i; return; }
        }
        this.size_ = 0;
      }
    }
  },
  methods: {
    onsize(version){
      const record = this.record, w = record.w, h = record.h,
            quality = version.quality;
      this.size = version;
      toJPNG.createCompositedJpngDataURL(record.jpng, w, h, quality, (dataURL) => {
        this.record.output = dataURL;
        setTimeout(() => {
          this.record.download = toJPNG.createJPNGDataURL(record.img, quality);
        }, 100);
      });
    },
    close(){
      this.record.removed = true;
    }
  }
}
</script>
<style>
.result--image {
  line-height: 0px;
  padding: 0 10px;
  margin: 0 auto 20px 0;
  text-align: center;
}
.result--image > img {
  max-width: 100%;
  max-height: 100%;
  object-fit: contain;
  box-shadow: inset 0 0 10px rgba(0,0,0,.1);
}
.bg-transparent {
  background-color: #fff;
  background-size: 20px 20px;
  background-position: 0 0, 10px 10px;
  background-image: 
    linear-gradient(45deg, #f0f0f0 25%, transparent 25%, transparent 75%, #f0f0f0 75%, #f0f0f0), 
    linear-gradient(45deg, #f0f0f0 25%, transparent 25%, transparent 75%, #f0f0f0 75%, #f0f0f0);
}
.result--output {
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  justify-content: space-around;
  margin-bottom: 20px;
}

.result--error {
  font-size: 18px;
  font-style: italic;
  padding: 10px;
  margin-bottom: 10px;
  text-align: left;
  display: flex;
  align-items: center;
}
</style>
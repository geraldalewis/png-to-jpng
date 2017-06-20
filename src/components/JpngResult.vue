<template>
  <li>
    <div class="jpng-result_header">
      <span class="mono jpng-result_header-name">{{ record.input.name }}</span>
    </div>
    <!--
    <bg-picker @bg="onbg" :selected="bg"></bg-picker>
    -->
    <div class="jpng-result_compare-container">
      <div :class="['jpng-result_compare-image', bg]">
        <p class="jpng-result_compare-header"><span class="jpng-result_compare-name">original</span> <span class="jpng-result_compare-kb">{{ record.input.size | kb }}</span><span class="jpng-result_compare-unit">kb</span></p>
        <img :src="pngSrc" class="jpng-result_img">
      </div>
      <div :class="['jpng-result_compare-image', bg]">
        <p class="jpng-result_compare-header"><span class="jpng-result_compare-name">jpng</span> <span class="jpng-result_compare-kb">{{ record.output.size | kb }}</span><span class="jpng-result_compare-unit">kb</span> <span class="results-compare__compressed">{{ '('+ percent +')' }}</span></p>
        <img :src="jpngSrc" class="jpng-result_img">
      </div>
    </div>
    <div class="jpng-result_output">
      <size-picker @updateSize="onsize" :sizes="sizes" :selected="size"></size-picker>
      <a 
        :href="downloadURL"
        :download="jpngFilename"
        class="jpng-result_download"
      ><div class="jpng-result_download-content">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" 
          fill="none" 
          stroke="#fff" 
          stroke-width="3" 
          stroke-linecap="round" 
          stroke-linejoin="round">
  <line x1="12" y1="4" x2="12" y2="20"/>
  <polyline points="18 14 12 20 6 14"/>
</svg><span>DOWNLOAD</span>
        </div>
      </a>
    </div></div>
  </li>
</template>
<script>
import CodeBlock from '../components/CodeBlock.vue';
import SizePicker from '../components/SizePicker.vue';
import BGPicker from '../components/BGPicker.vue';
import convertPNG from '../utils/convert-png';

export default {
  name: 'jpng-result',
  props: ['record'],
  data: function(){
    return { 
      bg: 'bg-transparent',
      size: null
    }
  },
  components: { CodeBlock, 'bg-picker': BGPicker, SizePicker },
  mounted(){
    const record = this.record;
    this.size = record.sizes[0];
  },
  computed: {
    pngSrc(){
      return this.record.input.dataURL;
    },
    jpngSrc(){
      return this.record.result.dataURL;
    },
    width(){ return this.record.input.w; },
    height(){ return this.record.input.h; },
    vertical(){ return this.record.output.vertical; },
    isSmaller(){ return (this.record.input.size - this.record.output.size) > 1024; },
    percent(){
      const record = this.record,
            ratio = record.output.size / record.input.size,
            diff = -(100 - Math.round( ratio * 100));
      if (diff >= 0) return '+' + diff + '%';
      return diff + '%';
    },
    jpngFilename(){
      return this.record.name + '-jpng.jpg';
    },
    downloadURL(){
      return this.record.output.download;
    },
    sizes(){
      return this.record.sizes.reduce( (array, size) => {
        size.kb = Math.round(size.size / 1024);
        if (array.length === 0 || size.kb < array[array.length - 1].kb) {
          array.push(size);
        }
        return array;
      }, []);
    }
  },
  filters: {
    kb(bytes){
      return Math.round(bytes/1024);
    }
  },
  methods: {
    onbg(bg){
      this.bg = bg;
    },
    onsize(size){
      this.size = size;
      convertPNG(this.record, size.quality).then( () => {
      });
    }
  }
}
</script>
<style>
.jpng-result_compare-container {
  margin: 0 auto 30px auto;
  text-align: center;
}
.jpng-result_compare-name {
  font-size: 16px;
  font-weight: 600;
}
.jpng-result_compare-image {
  position: relative;
  display: inline-block;
  min-width: 200px;
  background-color: #ccc;
  margin: 0 10px 10px 10px;
}

.jpng-result_compare-image > img,
.jpng-result_compare-image > canvas
{
  max-width: 100%;
  max-height: 100%;
  object-fit: contain;
}
.jpng-result_compare-header {
  background-color: #fff;
}
.jpng-result_compare-kb {
  font-size: 16px;
}
.jpng-result_compare-unit {
  font-family: "SFMono-Regular", Consolas, "Liberation Mono", Menlo, Courier, monospace;
  font-size: 12px;
}

.jpng-result_img {
  max-width: 100%;
  max-height: 100%;
  object-fit: contain;
}

.jpng-result_output {
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  justify-content: center;
}
.jpng-result_download {
  text-decoration: none;
  font-weight: 500;
  letter-spacing: 1px;
  color: #fff;
  margin: 22px 0 0 0;
  padding: 0;
}

.jpng-result_download-content {
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 14px;
  height: 40px;
  padding: 0 16px 0 10px;
  background-color: #00ccff;
}
.jpng-result_download-content > svg {
  margin: 0 4px 0 0;
}
@media (min-width: 375px) {
  .jpng-result_download-content {
    font-size: 16px;
    height: 50px;
  }
}
@media (min-width: 425px) {
  .jpng-result_download-content {
    font-size: 18px;
    height: 60px;
  }
}


.bg-white {
  background-color: #fff;
  background-image: none;
}
.bg-grey {
  background-color: #ccc;
  background-image: none;
}
.bg-black {
  background-color: #000;
  background-image: none;
}
.bg-transparent {
  background-color: #fff;
  background-size: 20px 20px;
  background-position: 0 0, 10px 10px;
  background-image: 
    linear-gradient(45deg, #f0f0f0 25%, transparent 25%, transparent 75%, #f0f0f0 75%, #f0f0f0), 
    linear-gradient(45deg, #f0f0f0 25%, transparent 25%, transparent 75%, #f0f0f0 75%, #f0f0f0);
}
.result_controls-header > h4 {
  font-weight: 600;
  font-size: 14px;
}
.result_controls-header > p {
  font-size: 12px;
  font-style: italic;
  line-height: 16px;
  margin-bottom: 6px;
}
</style>
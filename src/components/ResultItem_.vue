<template>
  <li class="result">
    <div class="result-thumb">
      <img v-if="!!src" :src="src" class="result-thumb_img">
      <div v-else class="result-thumb_placeholder"></div>
    </div>
    <p class="result-name">{{ record.name }}</p>
    <div class="result-buttons">
      <button class="btn result-button_copy" 
        @click="copyIMGTag"
      >Copy &lt;img&gt; tag</button>
    </div>
  </li>
</template>
<script>
export default {
  name: 'result-item',
  props: ['record'],
  computed: {
    hasError(){
      return !!this.record.error;
    },
    src(){
      if (this.hasError) {
        return this.record.input.img ? this.record.input.dataURL : '';
      }
      return this.record.result.dataURL;
    }
  },
  mounted(){
    
  },
  methods: {
    close(){
      this.record.removed = true;
    }
  }
}
</script>
<style>
.result {
  list-style: none;
  margin: 0;
  padding: 0;
}
.result-thumb {
  flex: none;
  width:  50px;
  height: 50px;
  display: flex;
  justify-content: center;
  align-items: center;

  background-color: #fff;
  background-size: 20px 20px;
  background-position: 0 0, 10px 10px;
  background-image: 
    linear-gradient(45deg, #f0f0f0 25%, transparent 25%, transparent 75%, #f0f0f0 75%, #f0f0f0), 
    linear-gradient(45deg, #f0f0f0 25%, transparent 25%, transparent 75%, #f0f0f0 75%, #f0f0f0);
}

@media (min-width: 425px) {
  .result-thumb {
    width:  100px;
    height: 100px;
  }
}
.result-thumb_img {
  max-width: 100%;
  max-height: 100%;
  object-fit: contain;
}
.result-thumb_placeholder {

}
.result-name {
  font-weight: 600;
  font-size: 16px;
  color: #333;
}
</style>
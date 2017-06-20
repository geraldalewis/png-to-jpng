<template>
  <li>
    <div class="jpng-result_header">
      <span class="jpng-result_header-name">{{ record.input.name }}</span>
      <button 
        class="jpng-result_header-close"
        @click="close"
      ><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#000" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
  <circle cx="12" cy="12" r="10"/>
  <line x1="15" y1="9" x2="9" y2="15"/>
  <line x1="9" y1="9" x2="15" y2="15"/>
</svg><span class="visually-hidden">remove</span></button>
    </div>
    <p class="jpng-error">
      <svg 
        xmlns="http://www.w3.org/2000/svg" 
        width="24" 
        height="24" 
        viewBox="0 0 24 24" 
        fill="none" 
        stroke="#fff" 
        stroke-width="2" 
        stroke-linecap="round" 
        stroke-linejoin="round">
        <polygon points="7.86 2 16.14 2 22 7.86 22 16.14 16.14 22 7.86 22 2 16.14 2 7.86 7.86 2"/>
        <line x1="12" y1="8" x2="12" y2="12"/>
        <line x1="12" y1="16" x2="12" y2="16"/>
      </svg>
    {{ record.error }}</p>
    <div class="jpng-error_image">
      <img v-if="src !== ''" :src="src">
    </div>
  </li>
</template>

<script>
export default {
  name: 'jpng-error',
  props: ['record'],
  computed: {
    src(){
      return this.record.input.img ? this.record.input.dataURL : '';
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
.jpng-error {
  color: #fff;
  background-color: #ff4444;
  padding: 10px;
  text-align: left;
  display: flex;
  align-items: center;
}
.jpng-error > svg {
  margin-right: 10px;
  flex: none;
}
.jpng-error_image {
  text-align: center;
}
.jpng-error_image > img {
  max-width: 100%;
  max-height: 100%;
  object-fit: contain;
}
</style>
<template>
  <div :class="['result--header', !!error ? 'result--header-error-bg' : '']">
    <svg 
      v-if="!!error" 
      class="result--header-error"
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
    <div class="result--header-file">{{ filename }}</div><div class="result--header-size">({{ filesize }}<span class="mono result--header-unit">kb</span>)</div>
    <button 
      class="result--header-close"
      @click="onclose"
    ><svg 
      xmlns="http://www.w3.org/2000/svg" 
      width="24" height="24" 
      viewBox="0 0 24 24" 
      fill="none" 
      stroke-width="2" 
      stroke-linecap="round" 
      stroke-linejoin="round"

      aria-hidden="true"
      >
        <line x1="18" y1="6" x2="6" y2="18"/>
        <line x1="6" y1="6" x2="18" y2="18"/>
      </svg><span 
        class="visually-hidden"
      >remove</span></button>
  </div>
</template>
<script>
export default {
  name: 'jpng-result-header',
  props: ['filename', 'filesize', 'error'],
  methods: {
    onclose(){ this.$emit('close'); }
  }
}
</script>
<style>
.result--header {
  display: flex;
  align-items: flex-start;
  padding: 20px;
  font-size: 16px;
  background-color: #666;
  margin-bottom: 10px;
}
.result--header-error-bg {
  background-color: #ff4444;
}
.result--header-file {
  color: #fff;
  font-weight: 600;
  flex-shrink: 1;
  min-width: 0;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  margin-right: 4px;
}
.result--header-size {
  flex: none;
  color: #fff;
  margin-left: 4px;
  padding-right: 4px;
  margin-right: auto;
}
.result--header-unit {
  font-size: 14px;
}
.result--header-close {
  flex: none;
  margin-left: auto;
  width:  24px;
  height: 24px;
}
.result--header-close > svg{
  stroke: #fff;
}
.result--header-close:hover > svg{
  stroke: #ddd;
}

.result--header-error {
  margin-right: 10px;
  flex: none;
}
</style>
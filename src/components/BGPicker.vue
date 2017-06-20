<template>
  <section class="bg-picker">
    <header class="result_controls-header">
      <h4>Preview background color</h4>
      <p>The background won't be visible in the final image.</p>
    </header>
    <div class="bg-picker_items">
      <button 
        v-for="bg in bgs"
        :key="bg"
        :class="[bg, 'bg-picker_item', bg === selected ? 'bg-picker_selected' : '']"
        @click="onclick(bg)"
        ></button>
    </div>
  </section>
</template>
<script>
export default {
  name: 'bg-picker',
  props: ['selected'],
  data: function(){
    return {
      bgs: [
        'bg-transparent',
        'bg-white',
        'bg-grey',
        'bg-black'
      ]
    }
  },
  methods: {
    onclick(bg){
      this.$emit("bg", bg);
    }
  }
}
</script>
<style>
.bg-picker {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  background-color: #e0e0e0;
}
.bg-picker_items {
  display: flex;
  align-items: flex-start;
}
.bg-picker_selected {
  border-bottom: 4px solid #00ffff;
}
.bg-picker_item {
  width:  40px;
  height: 40px;
}
@media (min-width: 375px) {
  .bg-picker_item {
    width:  50px;
    height: 50px;
  }
}
@media (min-width: 425px) {
  .bg-picker_item {
    width:  60px;
    height: 60px;
  }
}
</style>
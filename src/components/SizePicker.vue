<template>
  <section class="size-picker">
    <header class="result_controls-header">
      <h4>Select a filesize</h4>
    </header>
    <div class="size-picker_sizes">
      <button 
        v-for="(size, index) in sizes"
        :key="size.size"
        :class="['size-picker_item', 
          'size-picker_item-bg-' + index, 
          size === selected ? 'size-picker_selected' : '']"
        @click="onclick(size)"
        ><div class="size-picker_size"><span>{{ size.size | kb }}</span><span class="mono size-picker_unit">kb</span></div>
      </button>
    </div>
  </section>
</template>
<script>
export default {
  name: 'size-picker',
  props: ['selected', 'sizes'],
  methods: {
    onclick(size){
      this.$emit("updateSize", size);
    }
  },
  filters: {
    kb(bytes){
      return Math.round(bytes/1024);
    }
  }
}
</script>
<style>
.size-picker {
  margin: 0;
}
.size-picker_sizes {
  display: flex;
  align-items: center;
}
.size-picker_item {
  padding: 2px 4px;
  background-color: #444;
  height: 40px;
  min-width: 40px;
}
.size-picker_size {
  font-size: 14px;
  font-weight: 700;
  color: #fff;
  text-shadow: 0px 0px 4px rgba(0,0,0,.9);
}
.size-picker_unit {
  font-size: 10px;
}

@media (min-width: 375px) {
  .size-picker_item {
    min-width: 50px;
  }
}
@media (min-width: 425px) {
  .size-picker_item {
    padding: 5px 10px;
    height: 60px;
    min-width: 60px;
  }
  .size-picker_size {
    font-size: 18px;
  }
  .size-picker_unit {
    font-size: 12px;
  }
}
.size-picker_selected {
  border-bottom: 4px solid #00ffff;
}
.size-picker_item-bg-0 {
  background-color: #444;
}
.size-picker_item-bg-1 {
  background-color: #555;
}
.size-picker_item-bg-2 {
  background-color: #666;
}
.size-picker_item-bg-3 {
  background-color: #777;
}
</style>
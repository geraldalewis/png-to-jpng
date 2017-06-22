<template>
  <div class="size-input">
    <input
      :id="'version-' + resultId + '-' + idx"
      type="radio"
      class="size-input--input"
      :name="'version-' + resultId"
      :checked="version === selected"
      @change="oninput(version)"
    >
    <label
      :for="'version-' + resultId + '-' + idx"
      :class="['size-input--label', 'size-input--label-bg-' + idx]"
    ><div class="size-input--filesize"><span class="size-input--size">{{ kb }}</span><span class="mono size-input--unit">kb</span></div><div class="size-input--percent"><span class="size-input--size">{{percent}}</span><span class="mono size-input--unit">%</span></div></label>
  </div>
</template>
<script>
export default {
  name: 'size-input',
  props: ['version', 'selected', 'idx', 'resultId'],
  computed: {
    kb(){ return Math.round(this.version.size/1024); },
    percent(){
      const ratio = this.version.ratio,
            diff = -(100 - Math.round( ratio * 100));
      if (diff >= 0) return '+' + diff + '%';
      return diff;
    }
  },
  methods: {
    oninput(version){ this.$emit('changed', version); }
  }
}
</script>
<style>
.size-input {
  user-select: none;
}
.size-input--input {
  display: none;
}
.size-input--label {
  position: relative;
  cursor: pointer;
  background-color: #444;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 40px;
  min-width: 40px;
  padding: 2px 4px;
  overflow: hidden;
}
.size-input--input:not(:checked):hover + .size-input--label {
  background-image: linear-gradient(0deg, rgba(0,0,0,.45), rgba(0,0,0,.45));
}
.size-input--input:not(:checked):hover + .size-input--label > .size-input--filesize {
  left: -65px;
}
.size-input--input:not(:checked):hover + .size-input--label > .size-input--percent {
  opacity: 1;
}
.size-input--input:checked + .size-input--label {
  border-bottom: 5px solid #00ffff;
}
.size-input--filesize {
  position: relative;
  top: 0;
  left: 0;
  transition: left .20s ease-out;
}
.size-input--percent {
  opacity: 0;
  position: absolute;
  transition: opacity .1s ease-in;
}
.size-input--size {
  font-size: 14px;
  font-weight: 700;
  color: #fff;
  text-shadow: 0px 0px 4px rgba(0,0,0,.9);
}
.size-input--unit {
  color: #fff;
  font-size: 10px;
}

@media (min-width: 375px) {
  .size-input--label {
    min-width: 50px;
  }
}
@media (min-width: 425px) {
  .size-input--label {
    padding: 5px 10px;
    height: 60px;
    min-width: 60px;
  }
  .size-input--size {
    font-size: 18px;
  }
  .size-input--unit {
    font-size: 12px;
  }
}

.size-input--label-bg-0 {
  background-color: #444;
}
.size-input--label-bg-1 {
  background-color: #555;
}
.size-input--label-bg-2 {
  background-color: #666;
}
.size-input--label-bg-3 {
  background-color: #777;
}
</style>
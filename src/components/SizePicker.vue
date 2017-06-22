<template>
  <fieldset class="sizes">
    <legend>Select a size: (was {{ versions[0].originalKB }}kb)</legend>
    <div class="sizes--inputs">
      <size-input
        v-for="(version, index) in versions"
        :key="version.size"
        :version="version"
        :idx="index"
        :selected="selected"
        :resultId="resultId"
        @changed="onchanged"
      ></size-input>
    </div>
  </fieldset>
</template>
<script>
import SizeInput from './SizeInput.vue';
export default {
  name: 'size-picker',
  props: ['versions', 'selected', 'resultId'],
  components: { SizeInput },
  mounted(){ console.log(this.selected); },
  methods: {
    onchanged(version){ this.$emit("sizeChanged", version); }
  }
}
</script>
<style>
.sizes {
  border: none;
  margin: 0;
  padding: 0;
}
.sizes > legend {
  height: 24px;
}
.sizes--inputs {
  display: flex;
}
</style>
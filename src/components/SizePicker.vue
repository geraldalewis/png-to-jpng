<template>
  <fieldset class="sizes">
    <legend>Select a size: (was {{ Math.round(record.size/1024) }}kb)</legend>
    <div class="sizes--inputs">
      <size-input
        v-if="versions.length > 0"
        v-for="(version, index) in versions"
        :key="version.size"
        :version="version"
        :idx="index"
        :record="record"
        :selected="selected"
        @changed="onchanged"
      ></size-input>
    </div>
  </fieldset>
</template>
<script>
import SizeInput from './SizeInput.vue';
export default {
  name: 'size-picker',
  props: ['record', 'selected'],
  components: { SizeInput },
  computed: {
    versions(){ return this.record.versions; },
  },
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
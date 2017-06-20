<template>
  <main id="app">
    <drop-zone @appendJPNGResults="onappend"></drop-zone>
    <jpng-results 
      :results="nonRemovedResults"
      v-show="nonRemovedResults.length > 0"
    ></jpng-results>
    <about-jpng></about-jpng>
    <jpng-usage></jpng-usage>
    <footer>
      Icons courtesy of the open source <a href="http://colebemis.com/feather/">Feather</a> icon set <a href="https://github.com/colebemis/feather/blob/gh-pages/LICENSE">[LICENSE]</a>.
      Rooster image from <a href="https://pixabay.com/en/hahn-isolated-bird-gockel-attack-2408738/">Pixabay</a>.
    </footer>
  </main>
</template>

<script>
import jpng from 'jpng';
import AboutJpng from './sections/AboutJpng.vue';
import DropZone from './sections/DropZone.vue';
import JpngUsage from './sections/JpngUsage.vue';
import JpngResults from './sections/JpngResults.vue';

function preventImageDropRedirect(e){
  e.preventDefault();
  return false;
}

export default {
  name: 'app',
  components: { DropZone, 
                'jpng-usage': JpngUsage, 
                'jpng-results': JpngResults,
                AboutJpng },
  data: function(){
    return {
      results: []
    }
  },
  mounted(){
    document.addEventListener('dragover', preventImageDropRedirect);
    document.addEventListener('drop', preventImageDropRedirect);
  },
  methods: {
    onappend(records){
      this.results = this.results.concat(records);
    }
  },
  computed: {
    nonRemovedResults(){
      return this.results.filter((record) => !record.removed).sort( (a, b) => {
        return b.id - a.id;
      });
    }
  }
}
</script>
<style>

* {
  box-sizing: border-box;
}
html {
  background-color: #fff;
  margin: 0;
  padding: 0;
}
body {
  background-color: #fff;
  font-family:-apple-system, BlinkMacSystemFont, "Segoe UI", Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol";
  font-size: 14px;
  line-height: 24px;
  margin: 0;
  padding: 0;
  min-width: 320px;
}
h1,h2,h3 {
  font-weight: 500;
  font-size: 20px;
  line-height: 32px;
  margin: 0 0 10px 0;
}
h3 {
  color: #333;
  font-size: 15px;
  line-height: 18px;
  font-weight: 700;
  margin: 0 0 5px 0;
}
h4 {
  color: #333;
  font-size: 14px;
  line-height: 17px;
  font-weight: 400;
  margin: 0 0 5px 0;
}
p,pre,figure {
  margin: 0 0 10px 0;
}
article, section {
  padding: 10px 20px;
  margin: 0 auto 20px auto;
  max-width: 800px;
}
article > article {
  padding: 0px;
  margin: 0 0 30px 0;
  max-width: 780px;
}
article > article:first-of-type {
  margin-top: 36px;
}
figcaption {
  font-style: italic;
}

button {
  cursor: pointer;
  -webkit-tap-highlight-color: rgba(0,0,0,0);
  color: inherit;
  margin: 0;
  padding: 0;
  outline: none;
  border: none;
  background: none;
  font-size: inherit;
}

.mono {
  font-family: "SFMono-Regular", Consolas, "Liberation Mono", Menlo, Courier, monospace;
}
.visually-hidden {
  border: 0 !important;
  height: 1px !important;
  overflow: hidden !important;
  padding: 0 !important;
  position: absolute !important;
  width: 1px !important;
  white-space: nowrap !important;
}

.code-inline {
  white-space: pre;
  padding: 2px 4px;
  background-color: #f6f8fa;
}

.btn {
  padding: 8px 10px;
  font-size: 16px;
  line-height: 20px;
  text-align: center;
  height: 36px;
  text-decoration: none;
  color: #fff;
  box-shadow: 0px 2px 4px 0px rgba(0, 128, 192, 0.2);
  text-shadow: 0px 1px 1px rgba(0,32,0,.3);
  white-space: pre;
}
</style>
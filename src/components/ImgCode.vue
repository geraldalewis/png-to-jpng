<template>
  <div class="img-code">
    <pre 
        contenteditable="true"
        spellcheck="false"
        @click.once="focus"
        class="code"
    ><code class="language-html" v-html="code"></code></pre>
  </div>
</template>
<script>
//import CodeBlock from './CodeBlock.vue';
import Prism from 'prismjs';
export default {
  name: 'img-code',
  props: ['record'],
  //components: { CodeBlock },
  computed: {
    jpngFilename(){
      return this.record.name + '-jpng.jpg';
    },
    width(){ return this.record.w; },
    height(){ return this.record.h; },
    code(){
      const html = Prism.highlight(`<img onload="XXX"
     src="${ this.jpngFilename }"
     width="${ this.width }"
     height="${ this.height }"
     data-jpng="auto">`, Prism.languages.html);
      const onload = Prism.highlight(`window.jpng && jpng.replace(this, ${ this.width }, ${ this.height })`, Prism.languages.javascript);
      return html.replace('XXX', onload);
    }
  },
  methods: {
    focus(){
      this.$el.focus();
      document.execCommand('selectAll', false, null);
    }
  }
}
</script>
<style>
.img-code > pre {
  padding: 10px 20px;
  margin-bottom: 0px;
}
.code {
  text-align: left;
  white-space: pre;
  padding: 10px;
  background-color: #f6f8fa;
  border-top: 1px solid #e6f8fa;
  overflow-x: auto;
}
.code:focus {
  outline: none;
}
.code::-webkit-scrollbar {
  height: 8px;
  background-color: rgba(0,0,0,.07);
}
.code::-webkit-scrollbar-thumb {
  border-radius: 4px;
  background: rgba(0,0,0,.13); 
}

span.token.tag {
  color: #445B7E;
}
span.token.attr-name {
  color: #447B9E;
}
span.token.attr-value {
  color: #032f62;
}
</style>
<template>
  <pre class="mono code" 
      contenteditable="true"
      spellcheck="false"
      @click.once="focus"
    ><slot></slot></pre>
</template>

<script>
export default {
  name: 'app',
  methods: {
    focus(){
      this.$el.focus();
      document.execCommand('selectAll', false, null);
    }
  }
}
</script>
<style>
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

.code__tag {
  color: #445B7E;
}
.code__prop {
  color: #445B7E;
}
.code__assign {
  color: #7799aa;
}
.code__value {
  color: #032f62;
}
.code__operator {
  color: #d73a49;
}
.code__method {
  color: #6f42c1;
}
.code__string {
  color: #d73a49;
}
.code__this {
  color: #005cc5;
}
</style>
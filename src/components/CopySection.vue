<template>
  <div class="jpng-result_copy-container">
    <code-block>&lt;<span class="code__tag">img</span> <span class="code__prop">onload</span><span class="code__assign">=</span><span class="code__value">"<span class="code__operator">typeof</span> jpng === <span class="code__string">'function'</span> && jpng.<span class="code__method">processIMG</span>(<span class="code__this">this</span>)"</span>
  &nbsp;<span class="code__prop">src</span><span class="code__assign">=</span><span class="code__value">"{{ jpngFilename }}"</span>
  &nbsp;<span class="code__prop">width</span><span class="code__assign">=</span><span class="code__value">"{{ record.input.w }}"</span>
  &nbsp;<span class="code__prop">height</span><span class="code__assign">=</span><span class="code__value">"{{ record.input.h }}"</span>
  &nbsp;<span class="code__prop">data-jpng</span><span class="code__assign">=</span><span class="code__value">"loading"</span>
  &nbsp;<span class="code__prop">data-jpg-vertical</span><span class="code__assign">=</span><span class="code__value">"{{ vertical }}"</span>&gt;</code-block>
    <button class="btn jpng-result_copy-button" 
      @click="copyIMGTag"
    >Copy &lt;img&gt; tag</button>
  </div>
</template>
<script>
export default {
  methods: {
    copyIMGTag(){
      const code = `<img onload="typeof jpng === 'function' && jpng.processIMG(this)"
     src="${ this.jpngFilename }"
     width="${ this.width }"
     height="${ this.height }"
     data-jpng="loading"
     data-jpg-vertical="${ this.vertical }">`;

      const input = document.createElement('textarea');

      input.value = code.replace(/\\n/gim, '\n');

      input.classList.add('visually-hidden');
      document.body.appendChild(input);
      input.select();
      document.execCommand("copy");
      document.body.removeChild(input);
    },
  }
}
</script>
<style>
.jpng-result_copy-container {
  position: relative;
}
.jpng-result_copy-button {
  background-color: #00ccff;
  text-shadow: 0px 1px 1px rgba(0,18,64,.23);
  margin-right: 5px;
  position: absolute;
  right: -12px;
  bottom: -18px;
}
</style>
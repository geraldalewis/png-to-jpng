<template>
  <article>
    <header><h2>Usage</h2></header>
    <pre 
        contenteditable="true"
        spellcheck="false"
        class="code"
    ><code class="language-clike" v-html="npmCode"></code></pre>
    <pre 
        contenteditable="true"
        spellcheck="false"
        class="code"
    ><code class="language-javascript" v-html="importCode"></code></pre>

    Then, to automatically convert any &lt;img&gt; elements with a data-jpng attribute of "auto", call:
<pre 
        contenteditable="true"
        spellcheck="false"
        class="code"
    ><code class="language-javascript" v-html="initCode"></code></pre>
    <!--
    <p>You'll need to include the jpng library to transform the compressed JPG files back into PNGs. jpng can be installed via npm or yarn, and imported as an ES6 module if you're using a modern bundler. There's also an <span class="mono code-inline">iife</span> version that can be downloaded from a CDN.</p><p>Once included, any <span class="mono code-inline">img</span> tags with a <span class="mono code-inline">data-jpng</span> attribute set to <span class="mono code-inline">"loading"</span> will be automatically converted.</p>
    <article>
      <header><h3>CDN</h3></header>
      <p>You can drop in the minified jpng library with a simple <span class="mono code-inline">&lt;script&gt;</span> tag. You can safely use the <span class="mono code-inline">async</span> attribute, since load order doesn't matter.</p>
      <code-block>&lt;<span class="code__tag">script</span> <span class="code__prop">async</span> <span class="code__prop">src</span><span class="code__assign">=</span>"https://unpkg.com/jpng@latest/dist/jpng.js"&gt;&lt;/<span class="code__tag">script</span>&gt;</code-block>
    </article>
    <article>
      <header><h3>NPM</h3></header>
      <p>jpng can be installed with npm or yarn.</p>
      <code-block>npm install jpng</code-block>
      <p>jpng is written as an ES6 module, so it can be bundled into your project with webpack 2 or rollup.</p>
      <code-block><span class="code__operator">import</span> jpng from <span class="code__string">'jpng'</span></code-block>
    </article>
    <article>
      <header><h3>CSS</h3></header>
      <p>You may see the unprocessed image flash briefly just after it loads, so it's a good idea to add some CSS to hide it until it's ready.</p>
      <code-block><span class="code__tag">img</span>[<span class="code__prop">data-jpng</span><span class="code__assign">=</span><span class="code__value">"loading"</span>], <span class="code__tag">img</span>[<span class="code__prop">data-jpng</span><span class="code__assign">=</span><span class="code__value">"processing"</span>] {
    visibility: <span class="code__string">hidden</span>;
  }</code-block>
    </article>
    -->
  </article>
</template>
<script>

export default {
  name: 'jpng-usage',
  computed: {
    npmCode(){
      return Prism.highlight(`npm install jpng`, Prism.languages.clike);
    },
    importCode(){
      return Prism.highlight(`import jpng from 'jpng';`, Prism.languages.javascript);
    },
    initCode(){
      return Prism.highlight(`jpng.auto();`, Prism.languages.javascript);
    }
  }
}
</script>
<style>
</style>
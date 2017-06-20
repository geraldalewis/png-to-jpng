<template>
  <section>
    <header><h1><span class="code-inline">JPNG</span></h1><p>the <strong>transparency</strong> of PNGs with the <strong>lossy compression</strong> of JPGs.</p></header>
    <p>PNGs are great for certain images, but lossless compression is not always warranted; transparency in </p>
    <p>Drop in a PNG, get a (strange-looking) JPG. Transparency data (from the PNG's alpha channel) is extracted and converted to a greyscale image (the "matte"). Then the color data is extracted, demultiplied, and drawn next to the matte. The new image is saved as a JPG.</p>
    <figure class="diagram-figure">
      <div class="diagram">
        <div class="diagram-content">
          <div class="diagram-frame">
            <img 
              src="../assets/rooster-150px.png"
              alt="Original, large PNG file"
              class="diagram-original"
            >
          </div>
          <svg 
            alt="is transformed"
            xmlns="http://www.w3.org/2000/svg" 
            width="24" 
            height="24" 
            viewBox="0 0 24 24" 
            fill="none" 
            stroke="#000" 
            stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <line x1="4" y1="12" x2="20" y2="12"/>
            <polyline points="14 6 20 12 14 18"/>
          </svg>
          <div class="diagram-frame">
            <img 
              alt="A JPG with the color data and a greyscale representation of the transparency data drawn side by side"
              src="../assets/rooster-150px-jpng.jpg"
              class="diagram-jpng"
            >
          </div>
        </div>
      </div>
      <figcaption>Color and transparency data are drawn side by side into an opaque JPG.</figcaption>
    </figure>
    <p>When the JPG is loaded client-side, the color and matte are combined back into a PNG via JavaScript and &lt;canvas&gt;.</p>
    <article>
      <header><h2>What's a JPNG?</h2></header>
      <p></p>
    </article>
    <article>
      <header><h2>How it works.</h2></header>
      <p>Transparency data (from the PNG's alpha channel) is extracted and converted to a greyscale image (the "matte"). Then the color data is extracted, demultiplied, and drawn next to the matte. The new image is saved as a JPG.</p>
      
      <p>When the JPG is loaded client-side, the color and matte are combined back into a PNG via JavaScript and &lt;canvas&gt;.</p>
      <p>converted into a JPG with </p>
      <p>First, the color data is extracted into a new opaque image, and the transparency data is converted to a separate greyscale image (the matte). The color and matte are placed side by side and saved as a single JPG.</p>
      <p>It works by separating the color and transparency data into two distinct opaque images, then saving them into a single JPG. When client-side, the color and matte images are transformed back into a PNG with JavaScript and &lt;canvas&gt;.</p>

      <aside>
      If your image doesn't have much fine detail and has a limited color palette (e.g., the Twitter logo), then a vanilla PNG file is probably your best choice (<a href="http://tinypng.com">TinyPNG</a> is a good choice for optimizing these types of images).
      </aside>

      JPNG fills the niche when you need the transparency support of PNG but want the lossy compression of JPG. 

      Transparency data from the alpha channel is extracted and converted into an opaque greyscale image (the matte). The color and matte are composited together and served as a single compressed JPG. 


      It works by separating the color and alpha channels of a PNG, . Later, the color and matte are extracted and recombined using JavaScript and a &lt;canvas&gt; element.
      It works by extracting the color and alpha channels into two new <em>opaque</em> 
      JPNG fills that . 
      The color data (without transparency) is extracted into a new opaque image, and the alpha channel is converted into a new greyscale image.
      Two new images are created from the original PNG: one for the color data, and the other for alpha (transparency). The alpha channel is converted to a separate greyscale image. 
      Two new images are created from the original PNG. The first contains the opaque color data The color data is extracted and demultiplied and 
    </article>
  </section>
</template>
<script>
export default {
  name: 'about-jpng',
}
</script>
<style>
.diagram-figure {
  display: flex;
  flex-flow: column;
}
.diagram-figure > figcaption {
  padding: 5px 10px;
  border: 1px solid #eee;
}
.diagram-content {
  display: flex;
  flex-flow: row wrap;
  align-items: center;
}
.diagram {
  display: flex;
  justify-content: center;
  align-items: center;
}
.diagram-frame {
  line-height: 1px;
  border: 5px solid #fff;
  box-shadow: 0px 0px 4px 2px rgba(0, 64, 128, 0.1);
  margin-bottom: 10px;
}
.diagram-frame > img {
  border: 1px solid #eee;
  background-color: #fff;
  background-size: 20px 20px;
  background-position: 0 0, 10px 10px;
  background-image: 
    linear-gradient(45deg, #f0f0f0 25%, transparent 25%, transparent 75%, #f0f0f0 75%, #f0f0f0), 
    linear-gradient(45deg, #f0f0f0 25%, transparent 25%, transparent 75%, #f0f0f0 75%, #f0f0f0);
}


.diagram-frame > img.diagram-original {
  width: 70px;
  height: 73px;
}
.diagram-frame > img.diagram-jpng {
  width: 140px;
  height: 73px;
}
@media (min-width: 425px) {
  .diagram-frame > img.diagram-original {
    width: 100px;
    height: 104px;
  }
  .diagram-frame > img.diagram-jpng {
    width: 200px;
    height: 104px;
  }
}
@media (min-width: 600px) {
  .diagram-frame > img.diagram-original {
    width: 150px;
    height: 156px;
  }
  .diagram-frame > img.diagram-jpng {
    width: 300px;
    height: 156px;
  }
}
.diagram-content > svg {
  margin: 0 10px;
  flex: none;
    width: 24px;
    height: 24px;
}
@media (min-width: 425px) {
  .diagram-content > svg {
    width: 36px;
    height: 36px;
  }
}
@media (min-width: 600px) {
  .diagram-content > svg {
  width: 48px;
  height: 48px;
  }
}
</style>
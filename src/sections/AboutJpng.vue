<template>
  <article class="about-jpng">
    <h2 class="visually-hidden">JPNG</h2>
    <p><strong>JPNG makes your PNGs up to 80% smaller.</strong> 
    It works by turning your PNG's transparency data into a greyscale "matte". The color image and matte are bundled into a single JPG, and when it's time to render, JavaScript and &lt;canvas&gt; combine them back into a PNG.</p>
    <figure class="diagram">
      <div class="diagram--content">
        <div class="diagram--frame">
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
        <div class="diagram--frame">
          <img 
            alt="A JPG with the color data and a greyscale representation of the transparency data drawn side by side"
            src="../assets/rooster-150px-jpng.jpg"
            class="diagram-jpng"
          >
        </div>
      </div>
      <figcaption>Color and transparency data are extracted from the PNG and drawn side by side into an opaque JPG.</figcaption>
    </figure>
    <aside class="about--aside">
      <svg 
        aria-hidden="true"
        xmlns="http://www.w3.org/2000/svg" 
        width="24" 
        height="24" 
        viewBox="0 0 24 24" 
        fill="none" 
        stroke="#000" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <circle cx="12" cy="12" r="10"/>
        <line x1="12" y1="8" x2="12" y2="12"/>
        <line x1="12" y1="16" x2="12" y2="16"/>
      </svg>
      <p>If your PNG doesn't have much fine detail and has a limited color palette (e.g., the Twitter logo), then a vanilla PNG file is probably your best choice (<a href="http://tinypng.com">TinyPNG</a> is good for optimizing these types of images).</p>
    </aside>
  </article>
</template>
<script>
export default {
  name: 'about-jpng',
}
</script>
<style>
.about-jpng {
  font-size: 18px;
  line-height: 30px;
}
.diagram {
}
.diagram--content {
  display: flex;
  justify-content: center;
  align-items: center;
}
.diagram--frame {
  flex: 0 1 auto;
  min-width: 0;
  line-height: 1px;
  border: 5px solid #fff;
  box-shadow: 0px 0px 4px 2px rgba(0, 16, 64, 0.2);
  margin-bottom: 10px;
}
.diagram--frame > img {
  max-width: 100%;
  object-fit: contain;
  border: 1px solid #eee;
  background-color: #fff;
  background-size: 20px 20px;
  background-position: 0 0, 10px 10px;
  background-image: 
    linear-gradient(45deg, #ddd 25%, transparent 25%, transparent 75%, #ddd 75%, #ddd), 
    linear-gradient(45deg, #ddd 25%, transparent 25%, transparent 75%, #ddd 75%, #ddd);
}
.diagram--content > svg {
  width: 100%;
  height: 100%;
  max-width: 40px;
  margin: 0 10px;
}
.diagram > figcaption {
  font-size: 14px;
  padding: 5px 10px;
}
.about--aside {
  display: flex;
  margin: 5px 20px;
  font-size: 14px;
}
.about--aside > svg {
  flex: none;
  margin: 10px 15px 0 0;
}
</style>
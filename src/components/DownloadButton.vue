<template>
  <a 
    :href="downloadURL"
    :download="jpngFilename"
    class="download"
  ><div class="download--content">
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" 
      fill="none" 
      stroke="#fff" 
      stroke-width="3" 
      stroke-linecap="round" 
      stroke-linejoin="round">
<line x1="12" y1="4" x2="12" y2="20"/>
<polyline points="18 14 12 20 6 14"/>
</svg><span>DOWNLOAD</span>
    </div>
  </a>
</template>
<script>
export default {
  name: 'download-button',
  props: ['record'],
  data: function(){
    console.log("Creating data object", this.record);
    return {
      downloadURL: URL.createObjectURL(this.record.output.blob)
    };
  },
  disposed(){ URL.revokeObjectURL(this.record.output.blob); },
  computed: {
    jpngFilename(){
      return this.record.name + '-jpng.jpg';
    }
  }
}
</script>
<style>

.download {
  text-decoration: none;
  font-weight: 500;
  letter-spacing: 1px;
  color: #fff;
  margin: 23px 0 0 0;
  padding: 0;
}
.download:hover > .download--content > svg {
  margin: 2px 4px 0 0;
}
.download:hover > .download--content {
  background-color: #00d0ff;
}
.download:active > .download--content {
  background-color: #00ddff;
}
.download--content {
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 14px;
  height: 40px;
  padding: 0 18px 0 10px;
  background-color: #00ccff;
}
.download--content > svg {
  margin: 0 4px 0 0;
}
@media (min-width: 375px) {
  .download--content {
    font-size: 16px;
    height: 50px;
  }
}
@media (min-width: 425px) {
  .download--content {
    font-size: 18px;
    height: 60px;
  }
}
</style>
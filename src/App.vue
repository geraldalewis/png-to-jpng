<template>
  <main id="app">
    <drop-zone></drop-zone>
  </main>
</template>

<script>
import DropZone from './components/DropZone.vue';


function copyIMGTag(button){
  const code = button.getAttribute('data-tag'),
        input = document.createElement('textarea');

  input.value = code.replace(/\\n/gim, '\n');

  input.classList.add('visually-hidden');
  document.body.appendChild(input);
  input.select();
  document.execCommand("copy");
  document.body.removeChild(input);
}

function preventImageDropRedirect(e){
  e.preventDefault();
  return false;
}

function initializeDnD(){
  document.addEventListener('dragover', preventImageDropRedirect);
  document.addEventListener('drop', preventImageDropRedirect);
}

export default {
  name: 'app',
  components: { DropZone },
  mounted(){
    initializeDnD();
  }
}
</script>
<style>
</style>
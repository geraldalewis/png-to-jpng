<template>
  <section class="jpng-results" id="jpng-results">
    <header class="visually-hidden">
      <h2>Results</h2>
    </header>
    <ul class="jpng-results_ul">
      <jpng-result
          v-for="record in results" 
          :key="record.id" 
          :record="record"
      ></jpng-result>
    </ul>
  </section>
</template>
<script>
import JpngResult from '../components/JpngResult.vue';
export default {
  name: 'jpng-results',
  components: { JpngResult },
  props: ['results']
}
</script>
<style>
.jpng-results {
  padding: 0;
}
.jpng-results_ul {
  list-style: none;
  margin: 0;
  padding: 20px;
  background-color: #eee;/*#dbdfe8;*/
}
.jpng-results > ul > li {
  margin: 0 0 20px 0;
  padding: 0 0 20px 0;
  background-color: #fdfdfd;
  border-bottom: 1px solid #ddd;
  box-shadow: 0px 1px 4px 0px rgba(0, 128, 192, 0.1);
}
.jpng-result_header {
  font-size: 16px;
  padding: 20px;
  background-color: #f6f8fa;
  display: flex;
  align-items: flex-start;
}
.jpng-result_header-close {
  flex: none;
  margin-left: auto;
  font-size: 12px;
  padding-top: 4px;
}

</style>
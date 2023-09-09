<script setup>
  import TableIvao from '../components/TableIvao.vue';
  import InSessionNow from '../components/InSessionNow.vue';
</script>

<template>
  <main class="section">
    <InSessionNow v-if="!$isMobile()" />
    <TableIvao />
  </main>
</template> 
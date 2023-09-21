<script setup lang="ts">
import ApiHelper from '../../components/settings/ApiHelper.vue';
import ApiForm from '../../components/settings/ApiForm.vue';
</script>

<template>
  <section class="p-3">
    <ApiForm></ApiForm>
    <ApiHelper v-once></ApiHelper>
  </section>
</template>

<style scoped lang="scss">

</style>

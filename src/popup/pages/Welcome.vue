<script setup lang="ts">
import ApiForm from '../components/settings/ApiForm.vue';
import ApiHelper from '../components/settings/ApiHelper.vue';
import {useRouter} from 'vue-router';

const router = useRouter();

function onSaved(): void {
  router.push('/');
}
</script>

<template>
  <section class="p-3">
    <h1 class="text-center font-medium text-3xl mt-4">Welcome <br> to Chrome Companion</h1>
    <ApiForm @saved="onSaved()"></ApiForm>
    <ApiHelper></ApiHelper>
  </section>
</template>

<style scoped lang="scss">

</style>

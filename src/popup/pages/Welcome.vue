<script setup lang="ts">
import ApiForm from '../components/settings/ApiForm.vue';
import ApiHelper from '../components/settings/ApiHelper.vue';
import {useRouter} from 'vue-router';
import {useI18n} from 'vue-i18n';

useI18n();
const router = useRouter();

function onSaved(): void {
  router.push('/');
}
</script>

<template>
  <section class="p-3">
    <i18n-t keypath="welcome"
            tag="h1"
            class="text-center font-medium text-3xl mt-4"><br></i18n-t>
    <ApiForm @saved="onSaved()"></ApiForm>
    <ApiHelper></ApiHelper>
  </section>
</template>

<i18n>
{
  "en": {
    "welcome": "Welcome {0} to Chrome Companion"
  }
}
</i18n>

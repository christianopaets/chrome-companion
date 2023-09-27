<script setup lang="ts">
import {PrimeIcons} from 'primevue/api';
import {useI18n} from 'vue-i18n';

const emit = defineEmits(['create']);
const {t} = useI18n();
</script>

<template>
  <section class="p-3 h-full flex flex-column align-items-center justify-content-center">
    <h1 class="text-3xl">{{ t('title') }}</h1>
    <h2 class="mt-6 text-xl w-25rem text-center">{{ t('description') }}</h2>
    <Button class="mt-6"
            :label="t('button')"
            :icon="PrimeIcons.PLUS"
            @click="emit('create')"></Button>
  </section>
</template>

<i18n>
{
  "en": {
    "title": "You have no conversations yet.",
    "description": "Click the button below, to create your first conversation",
    "button": "Create conversation"
  }
}
</i18n>

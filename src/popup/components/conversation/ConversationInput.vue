<script setup lang="ts">
import {ref} from 'vue';
import {useI18n} from 'vue-i18n';
import {PrimeIcons} from 'primevue/api';

const message = ref('');
const {t} = useI18n();
const {disabled} = defineProps<{ disabled: boolean; }>();
const emit = defineEmits<{ submit: [message: string] }>();

function submit(): void {
  if (!message.value || disabled) {
    return;
  }
  emit('submit', message.value);
  message.value = '';
}
</script>

<template>
  <section v-focustrap
           class="flex gap-3 align-items-center p-3 surface-0 shadow-1 sticky bottom-0">
  <Textarea class="w-full"
            autofocus
            rows="1"
            auto-resize
            :placeholder="t('input.placeholder')"
            v-model="message"
            @keydown.enter.prevent="submit()"></Textarea>
    <Button class="flex-shrink-0"
            :disabled="!message || disabled"
            :icon="PrimeIcons.SEND"
            @click="submit()"></Button>
  </section>
</template>

<i18n>
{
  "en": {
    "input": {
      "placeholder": "Type your question"
    }
  }
}
</i18n>

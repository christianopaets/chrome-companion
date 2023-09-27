<script setup lang="ts">
import {useI18n} from 'vue-i18n';

const {t} = useI18n();
</script>

<template>
  <Fieldset legend="How to?"
            class="p-3">
    <i18n-t keypath="step-1.description"
            tag="p">
      <a href="https://platform.openai.com/account/api-keys"
         class="hover:underline text-primary"
         target="_blank">{{ t('step-1.link') }}</a>
    </i18n-t>
    <Divider></Divider>
    <i18n-t keypath="step-2.description"
            tag="p">
      <i class="bg-primary-100 text-primary-900 font-semibold border-round-sm text-xs py-1 px-2">{{
          t('step-2.key')
        }}</i>
    </i18n-t>
    <Divider></Divider>
    <i18n-t keypath="step-3.description">
      <i class="bg-primary-100 text-primary-900 font-semibold border-round-sm text-xs py-1 px-2">{{
          t('step-3.test')
        }}</i>
      <i class="bg-primary-100 text-primary-900 font-semibold border-round-sm text-xs py-1 px-2">{{
          t('step-3.save')
        }}</i>
    </i18n-t>
  </Fieldset>
</template>

<i18n>
{
  "en": {
    "step-1": {
      "description": "Go to {0}",
      "link": "API Keys Settings Page"
    },
    "step-2": {
      "description": "Generate a new {0} and paste it into input",
      "key": "API Key"
    },
    "step-3": {
      "description": "{0} and {1} it",
      "test": "Test Connection",
      "save": "Save"
    }
  }
}
</i18n>

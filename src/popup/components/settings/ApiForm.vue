<script setup lang="ts">
import {useApiConfigStore} from '@store/api-config.store';
import {computed, ref, watch} from 'vue';
import {PrimeIcons} from 'primevue/api';
import type {TooltipOptions} from 'primevue/tooltip';
import {useI18n} from 'vue-i18n';

type TestState = 'untested' | 'loading' | 'tested' | 'error';
const apiConfigStore = useApiConfigStore();
const key = ref(apiConfigStore.key);
const tested = ref<TestState>('untested');
const locked = ref(!!apiConfigStore.key);
const {t} = useI18n();
const emit = defineEmits(['saved']);

const testedSeverity = computed(() => {
  switch (tested.value) {
    case 'untested':
    case 'loading':
      return 'warning';
    case 'tested':
      return 'success';
    case 'error':
      return 'danger';
  }
});

const icon = computed(() => {
  switch (tested.value) {
    case 'untested':
      return PrimeIcons.EXCLAMATION_TRIANGLE;
    case 'tested':
      return PrimeIcons.CHECK;
    case 'error':
      return PrimeIcons.TIMES;
    default:
      return undefined;
  }
});

const tooltip = computed<TooltipOptions>(() => ({
  value: t('input.key.tooltip'),
  disabled: !locked.value
}));

watch(key, () => {
  tested.value = 'untested';
});

async function testConnection(): Promise<void> {
  tested.value = 'loading';
  tested.value = await apiConfigStore.test(key.value) ? 'tested' : 'error';
}

function save(): void {
  apiConfigStore.save(key.value);
  locked.value = true;
  emit('saved');
}

function unlock(): void {
  locked.value = false;
}
</script>

<template>
  <div class="flex flex-column gap-3">
    <label for="api-key"
           class="font-bold text-sm block">{{ t('input.key.label') }}</label>
    <div class="p-input-icon-right">
      <InputText v-model="key"
                 class="w-full"
                 id="api-key"
                 type="text"
                 :readonly="locked"
                 :placeholder="t('input.key.placeholder')"></InputText>
      <i :class="locked ? 'pi-lock' : PrimeIcons.LOCK_OPEN"
         class="cursor-pointer pi"
         v-tooltip.left="tooltip"
         @click="unlock()"></i>
    </div>
  </div>
  <div class="flex justify-content-end gap-3 mt-3">
    <Button :label="t('button.test')"
            :severity="testedSeverity"
            :loading="tested === 'loading'"
            :icon="icon"
            :disabled="!key || locked"
            @click="testConnection()"></Button>
    <Button :label="t('button.save')"
            :disabled="tested !== 'tested' || locked"
            @click="save()"></Button>
  </div>
</template>

<i18n>
{
  "en": {
    "button": {
      "test": "Test connection",
      "save": "Save"
    },
    "input": {
      "key": {
        "label": "API Key",
        "placeholder": "Enter API key",
        "tooltip": "Click to Edit"
      }
    }
  }
}
</i18n>

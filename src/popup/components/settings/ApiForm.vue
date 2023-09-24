<script setup lang="ts">
import {useApiConfigStore} from '../../stores/api-config.store';
import {computed, inject, ref, watch} from 'vue';
import {HttpService} from '../../services/http.service';
import {PrimeIcons} from 'primevue/api';
import type {TooltipOptions} from 'primevue/tooltip';

type TestState = 'untested' | 'loading' | 'tested' | 'error';
const apiConfigStore = useApiConfigStore();
const httpService = inject<HttpService>(HttpService.INJECTOR)!;
const key = ref(apiConfigStore.key);
const tested = ref<TestState>('untested');
const locked = ref(!!apiConfigStore.key);
const emit = defineEmits(['saved']);

const testedSeverity = computed(() => {
  switch (tested.value) {
    case "untested":
    case "loading":
      return 'warning';
    case "tested":
      return 'success';
    case "error":
      return 'danger';
  }
});

const icon = computed(() => {
  switch (tested.value) {
    case "untested":
      return PrimeIcons.EXCLAMATION_TRIANGLE;
    case "tested":
      return PrimeIcons.CHECK;
    case "error":
      return PrimeIcons.TIMES;
    default:
      return undefined;
  }
});

const tooltip = computed<TooltipOptions>(() => ({
  value: 'Click to Edit',
  disabled: !locked.value
}));

watch(key, () => {
  tested.value = 'untested';
});

async function testConnection(): Promise<void> {
  tested.value = 'loading';
  const response = await httpService.get('https://api.openai.com/v1/models', {
    headers: {
      'Authorization': `Bearer ${key.value}`
    }
  });
  tested.value = response.ok ? 'tested' : 'error';

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
           class="font-bold text-sm block">API Key</label>
    <div class="p-input-icon-right">
      <InputText v-model="key"
                 class="w-full"
                 id="api-key"
                 type="text"
                 :readonly="locked"
                 placeholder="Enter API key"></InputText>
      <i :class="locked ? 'pi-lock' : PrimeIcons.LOCK_OPEN"
         class="cursor-pointer pi"
         v-tooltip.left="tooltip"
         @click="unlock()"></i>
    </div>
  </div>
  <div class="flex justify-content-end gap-3 mt-3">
    <Button label="Test connection"
            :severity="testedSeverity"
            :loading="tested === 'loading'"
            :icon="icon"
            :disabled="!key || locked"
            @click="testConnection()"></Button>
    <Button label="Save"
            :disabled="tested !== 'tested' || locked"
            @click="save()"></Button>
  </div>
</template>

<style scoped lang="scss">

</style>

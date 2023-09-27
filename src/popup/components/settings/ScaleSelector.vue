<script setup lang="ts">
import {computed} from 'vue';

interface Props {
  modelValue: number;
}

type Emits = {
  'update:modelValue': [scale: number];
  'change': [scale: number];
}

const props = defineProps<Props>();
const emit = defineEmits<Emits>();
const options = [10, 12, 14, 16, 18];
const scale = computed({
  get() {
    return props.modelValue;
  },
  set(value: number) {
    emit('update:modelValue', value);
    emit('change', value);
  }
});

const disableSubtractScale = computed(() => {
  return scale.value === options[0];
});

const disableAddScale = computed(() => {
  return scale.value === options[options.length - 1];
});

function onScaleChange(subtract: boolean = false): void {
  const index = options.indexOf(scale.value);
  const newScale = index + (subtract ? -1 : 1);
  scale.value = options[newScale] || 14;
}
</script>

<template>
  <section class="flex align-items-center gap-2">
    <Button class="w-2rem h-2rem"
            rounded
            text
            icon="pi pi-minus"
            :disabled="disableSubtractScale"
            @click="onScaleChange(true)"></Button>
    <i v-for="option of options"
       :key="'scale_' + option"
       class="pi pi-circle-fill text-sm text-600"
       :class="{ 'text-lg text-primary' : option === scale }"></i>
    <Button class="w-2rem h-2rem"
            rounded
            text
            icon="pi pi-plus"
            :disabled="disableAddScale"
            @click="onScaleChange()"></Button>
  </section>
</template>

<style scoped lang="scss">

</style>

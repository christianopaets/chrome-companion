<script setup lang="ts">
import {computed} from 'vue';

interface Props {
  direction?: 'left' | 'right' | unknown;
}

const props = defineProps<Props>();

const name = computed(() => {
  switch (props.direction) {
    case 'left':
      return 'slide-left';
    case 'right':
      return 'slide-right';
  }
});
</script>

<template>
  <transition :name="name">
    <slot></slot>
  </transition>
</template>

<style scoped lang="scss">
.slide-right-leave-active,
.slide-left-leave-active,
.slide-right-enter-active,
.slide-left-enter-active {
  transition: transform .7s cubic-bezier(0.2, 0.0, 0, 1.0);;
  position: absolute;
}

.slide-right-leave-to,
.slide-left-enter-from {
  transform: translateX(100%);
}


.slide-left-leave-to,
.slide-right-enter-from {
  transform: translateX(-100%);
}
</style>

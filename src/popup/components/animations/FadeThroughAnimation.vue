<script setup lang="ts">

</script>

<template>
  <Transition name="fade-through"
              mode="out-in">
    <slot></slot>
  </Transition>
</template>

<style scoped lang="scss">
.fade-through-enter-from {
  opacity: .3;
  transform: scale(.92);
}

.fade-through-enter-active {
  transition: all 200ms cubic-bezier(0.2, 0.0, 0, 1.0);
}

.fade-through-enter-to {
  opacity: 1;
  transform: scale(1);
}

.fade-through-leave-active {
  transition: all 100ms cubic-bezier(0.2, 0.0, 0, 1.0);
}

.fade-through-leave-from {
  opacity: 1;
}

.fade-through-leave-to {
  opacity: 0.35;
}
</style>

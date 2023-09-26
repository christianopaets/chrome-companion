<script setup lang="ts">

</script>

<template>
  <TransitionGroup name="list"
                   tag="ul">
    <slot></slot>
  </TransitionGroup>
</template>

<style lang="scss">
.list-move,
.list-enter-active,
.list-leave-active {
  transition: all 0.5s cubic-bezier(0.2, 0.0, 0, 1.0);
}

.list-enter-from,
.list-leave-to {
  opacity: 0;
  transform: scaleY(0.01) translate(30px, 0);
}

.list-leave-active {
  position: absolute !important;
}
</style>

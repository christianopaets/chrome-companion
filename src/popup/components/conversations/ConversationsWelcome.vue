<script setup lang="ts">
import {PrimeIcons} from 'primevue/api';

const emit = defineEmits(['create']);
</script>

<template>
  <section class="p-3 h-full flex flex-column align-items-center justify-content-center">
    <h1 class="text-3xl">You have no conversations yet.</h1>
    <h2 class="mt-6 text-xl w-25rem text-center">Click the button below, to create your first conversation</h2>
    <Button class="mt-6"
            label="Create conversation"
            :icon="PrimeIcons.PLUS"
            @click="emit('create')"></Button>
  </section>
</template>

<style scoped lang="scss">

</style>

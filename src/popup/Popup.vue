<script setup lang="ts">
import {inject} from "vue";
import {ThemeService} from './services/theme.service';
import PopupToolbar from './components/base/PopupToolbar.vue';

const themeService = inject<ThemeService>(ThemeService.INJECTOR)!;
themeService.init();
</script>

<template>
  <PopupToolbar></PopupToolbar>
  <section class="main">
    <router-view></router-view>
  </section>
</template>

<style scoped lang="scss">

</style>

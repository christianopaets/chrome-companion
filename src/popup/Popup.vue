<script setup lang="ts">
import {inject} from "vue";
import {ThemeService} from './services/theme.service';
import PopupToolbar from './components/base/PopupToolbar.vue';
import {useSettingsStore} from '@store/settings.store';
import FadeThroughAnimation from './components/animations/FadeThroughAnimation.vue';

const themeService = inject<ThemeService>(ThemeService.INJECTOR)!;
const settingsStore = useSettingsStore();
themeService.init(settingsStore);
</script>

<template>
  <section class="flex flex-column h-full">
    <PopupToolbar class="sticky top-0 z-1"></PopupToolbar>
    <section class="main h-full">
      <router-view v-slot="{Component}">
        <FadeThroughAnimation>
          <component :is="Component"></component>
        </FadeThroughAnimation>
      </router-view>
    </section>
  </section>
  <Toast></Toast>
  <ConfirmDialog></ConfirmDialog>
</template>

<style scoped lang="scss">

</style>

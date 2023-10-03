<script setup lang="ts">
import {inject} from 'vue';
import {ThemeService} from './services/theme.service';
import PopupToolbar from './components/base/PopupToolbar.vue';
import {useSettingsStore} from '@store/settings.store';
import FadeThroughAnimation from './components/animations/FadeThroughAnimation.vue';
import {setLocale} from './i18n';

const themeService = inject<ThemeService>(ThemeService.INJECTOR)!;
const settingsStore = useSettingsStore();
themeService.init(settingsStore);
setLocale(settingsStore.language);
</script>

<template>
  <section class="flex flex-column h-full overflow-hidden">
    <PopupToolbar class="fixed w-full top-0 z-1"></PopupToolbar>
    <section id="global-scroll"
             class="main h-full overflow-custom">
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
.main {
  padding-top: 58px;
}
</style>

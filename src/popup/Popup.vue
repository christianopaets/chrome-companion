<script setup lang="ts">
import {inject, onMounted} from 'vue';
import {ThemeService} from './services/theme.service';
import PopupToolbar from './components/base/PopupToolbar.vue';
import {useSettingsStore} from '@store/settings.store';
import FadeThroughAnimation from './components/animations/FadeThroughAnimation.vue';
import {setLocale} from './i18n';
import {ChatOpenError, HttpService} from "./services/http.service";
import {useI18n} from "vue-i18n";
import {useToast} from "primevue/usetoast";

const themeService = inject<ThemeService>(ThemeService.INJECTOR)!;
const httpService = inject<HttpService>(HttpService.INJECTOR)!;
const settingsStore = useSettingsStore();
const {t} = useI18n();
const toastService = useToast();
themeService.init(settingsStore);
setLocale(settingsStore.language);

onMounted(() => {
  httpService.addErrorListener(e => {
    if (e instanceof ChatOpenError) {
      const availableErrorsStatusCodes = [400, 429];
      if (availableErrorsStatusCodes.includes(e.response.status)) {
        toastService.add({
          severity: 'error',
          summary: t(`http-error.${e.response.status}.summary`),
          detail: t(`http-error.${e.response.status}.detail`),
          life: 2000
        });
      }
    }
  });
});
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

<i18n>
{
  "en": {
    "http-error": {
      "400": {
        "summary": "Oops...",
        "detail": "There was a problem with your question. Try again"
      },
      "429": {
        "summary": "Oops...",
        "detail": "You gave me too many requests"
      }
    }
  }
}
</i18n>

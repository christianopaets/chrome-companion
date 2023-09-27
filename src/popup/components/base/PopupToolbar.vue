<script setup lang="ts">
import {ref} from 'vue';
import type {MenuItem} from 'primevue/menuitem';
import Menu from 'primevue/menu';
import {PrimeIcons} from 'primevue/api';
import {useRouter} from 'vue-router';
import {useI18n} from 'vue-i18n';
import MenuDynamicItem from './MenuDynamicItem.vue';
import {ACCEPTED_LANGUAGES} from '../../i18n';
import {useSettingsStore} from '@store/settings.store';
import {useApiConfigStore} from '@store/api-config.store';

const {t} = useI18n();
const router = useRouter();
const settingsMenu = ref<Menu>();
const languageMenu = ref<Menu>();
const settingsStore = useSettingsStore();
const apiConfigStore = useApiConfigStore();

const settings = ref<MenuItem[]>([
  {
    label: () => t('settings.title'),
    items: [
      {
        label: () => t('settings.theming'),
        icon: PrimeIcons.PALETTE,
        route: '/settings/theming'
      },
      {
        label: () => t('settings.api'),
        icon: PrimeIcons.CLOUD,
        route: '/settings/api'
      }
    ]
  }
]);

const languages = ref<MenuItem[]>([
  {
    label: () => t('language.title'),
    items: ACCEPTED_LANGUAGES.map(code => ({
      label: () => t(`language.${code}`),
      command: () => settingsStore.setLocale(code)
    }))
  }
]);
</script>

<template>
  <Toolbar class="border-noround p-3">
    <template v-slot:start>
      <h1 class="text-2xl"
          @click="router.push('/')">{{ t('title') }}</h1>
    </template>
    <template v-slot:end>
      <template v-if="ACCEPTED_LANGUAGES.length > 1">
        <Button :icon="PrimeIcons.LANGUAGE"
                class="w-2rem h-2rem mr-2"
                aria-haspopup="true"
                aria-controls="overlay_menu"
                severity="info"
                @click="languageMenu?.toggle($event)"></Button>
        <Menu ref="languageMenu"
              :popup="true"
              :model="languages">
          <template v-slot:item="{ label, item, props }">
            <MenuDynamicItem :item="item"
                             :parent-props="props"
                             :label="label"></MenuDynamicItem>
          </template>
        </Menu>
      </template>
      <template v-if="apiConfigStore.key">
        <Button :icon="PrimeIcons.COG"
                class="w-2rem h-2rem"
                aria-haspopup="true"
                aria-controls="overlay_menu"
                severity="info"
                @click="settingsMenu?.toggle($event)"></Button>
        <Menu ref="settingsMenu"
              :popup="true"
              :model="settings">
          <template v-slot:item="{ label, item, props }">
            <MenuDynamicItem :item="item"
                             :parent-props="props"
                             :label="label"></MenuDynamicItem>
          </template>
        </Menu>
      </template>
    </template>
  </Toolbar>
</template>

<i18n>
{
  "en": {
    "title": "Chrome Companion",
    "settings": {
      "title": "Settings",
      "theming": "Theming",
      "api": "API"
    },
    "language": {
      "title": "Language",
      "en": "English",
      "uk": "Українська"
    }
  },
  "uk": {
    "title": "Chrome Companion",
    "settings": {
      "title": "Налаштування",
      "theming": "Тема",
      "api": "API"
    },
    "language": {
      "title": "Мова",
      "en": "English",
      "uk": "Українська"
    }
  }
}
</i18n>

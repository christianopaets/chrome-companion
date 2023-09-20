<script setup lang="ts">
import {inject, ref} from 'vue';
import {ThemeService} from '../../services/theme.service';
import {capitalize} from '../../../common/utils/capitalize';
import {DropdownChangeEvent} from 'primevue/dropdown';

const themeService = inject<ThemeService>(ThemeService.INJECTOR);
const themes = ref(
    themeService?.themes.map(theme => ({
      label: theme.split('-').map(word => capitalize(word)).join(' '),
      value: theme
    }))
);
const currentTheme = ref();

function onThemeChange(event: DropdownChangeEvent): void {
  const theme = themeService?.themes.find(item => item === event.value);
  if (!theme) {
    console.warn('Theme not existing!');
    return;
  }
  themeService?.changeTheme(theme);
}
</script>

<template>
  <section class="p-4">
    <div class="flex align-items-center justify-content-between">
      <p class="text-base font-medium">Theme</p>
      <Dropdown v-model="currentTheme"
                :options="themes"
                class="w-14rem"
                placeholder="Select the theme"
                option-label="label"
                option-value="value"
                @change="onThemeChange($event)"></Dropdown>
    </div>
    <Divider></Divider>
  </section>
</template>

<style scoped lang="scss">

</style>

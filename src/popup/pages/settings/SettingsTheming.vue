<script setup lang="ts">
import {inject, ref} from 'vue';
import {ThemeService} from '../../services/theme.service';
import type {DropdownChangeEvent} from 'primevue/dropdown';
import {useSettingsStore} from '../../stores/settings.store';
import ScaleSelector from '../../components/settings/ScaleSelector.vue';
import {onBeforeRouteLeave} from 'vue-router';
import {useConfirm} from 'primevue/useconfirm';
import {useToast} from 'primevue/usetoast';

const settingsStore = useSettingsStore();
const themeService = inject<ThemeService>(ThemeService.INJECTOR)!;
const theme = ref(settingsStore.theme);
const scale = ref(settingsStore.scale);
const ripple = ref(settingsStore.ripple);
const inputStyle = ref(settingsStore.inputStyle);
const dirty = ref(false);
const confirm = useConfirm();
const toast = useToast();

onBeforeRouteLeave(async () => {
  if (!dirty.value) {
    return true;
  }
  return await new Promise<boolean>(resolve => {
    confirm.require({
      message: 'Are you sure you want to discard changes?',
      header: 'You have unsaved changes.',
      icon: 'pi pi-info-circle',
      acceptClass: 'p-button-danger',
      accept: () => {
        reset();
        resolve(true);
      },
      reject: () => {
        resolve(false);
      }
    });
  });
});

function onThemeChange(event: DropdownChangeEvent): void {
  dirty.value = true;
  themeService.changeTheme(event.value);
}

function onScaleChange(scale: number): void {
  dirty.value = true;
  themeService.changeScale(scale);
}

function onRippleChange(ripple: boolean): void {
  dirty.value = true;
  themeService.changeRipple(ripple);
}

function onInputStyleChange(event: DropdownChangeEvent): void {
  dirty.value = true;
  themeService.changeInputStyle(event.value);
}

function reset(): void {
  themeService.changeTheme(settingsStore.theme);
  themeService.changeScale(settingsStore.scale);
  themeService.changeRipple(settingsStore.ripple);
  themeService.changeInputStyle(settingsStore.inputStyle);
  theme.value = settingsStore.theme;
  scale.value = settingsStore.scale;
  ripple.value = settingsStore.ripple;
  inputStyle.value = settingsStore.inputStyle;
  dirty.value = false;
}

function save(): void {
  settingsStore.save({
    theme: theme.value,
    ripple: ripple.value,
    scale: scale.value,
    inputStyle: inputStyle.value
  });
  dirty.value = false;
  toast.add({severity: 'success', summary: 'Hooray!', detail: 'UI changed successfully', life: 3000});
}
</script>

<template>
  <section class="p-3 mt-1">
    <div class="flex align-items-center justify-content-between">
      <p class="text-base font-medium">Theme</p>
      <Dropdown v-model="theme"
                :options="themeService.selectThemes"
                class="w-14rem"
                placeholder="Select the theme"
                option-label="label"
                option-value="value"
                @change="onThemeChange($event)"></Dropdown>
    </div>
    <Divider></Divider>
    <div class="flex align-items-center justify-content-between">
      <p class="text-base font-medium">Scaling</p>
      <ScaleSelector v-model="scale"
                     @change="onScaleChange($event)"></ScaleSelector>
    </div>
    <Divider></Divider>
    <div class="flex align-items-center justify-content-between">
      <p class="text-base font-medium">Ripple</p>
      <InputSwitch v-model="ripple"
                   @input="onRippleChange($event)"></InputSwitch>
    </div>
    <Divider></Divider>
    <div class="flex align-items-center justify-content-between">
      <p class="text-base font-medium">Input Style</p>
      <Dropdown v-model="inputStyle"
                :options="themeService.inputStyles"
                class="w-14rem"
                placeholder="Select input style"
                option-label="label"
                option-value="value"
                @change="onInputStyleChange($event)"></Dropdown>
    </div>
    <Divider></Divider>
    <div class="flex gap-3">
      <Button label="Reset to previous"
              :disabled="!dirty"
              severity="danger"
              class="ml-auto"
              @click="reset()"></Button>
      <Button label="Save"
              class="mt-auto"
              :disabled="!dirty"
              @click="save()"></Button>
    </div>
  </section>
</template>

<style scoped lang="scss">

</style>

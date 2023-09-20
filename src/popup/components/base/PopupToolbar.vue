<script setup lang="ts">
import {ref} from 'vue';
import type {MenuItem} from 'primevue/menuitem';
import {useRouter} from 'vue-router';
import Menu from 'primevue/menu';
import {PrimeIcons} from 'primevue/api';

const router = useRouter();
const menu = ref<Menu>();
const settings = ref<MenuItem[]>([
  {
    label: 'Settings',
    items: [
      {
        label: 'Theming',
        icon: PrimeIcons.PALETTE,
        command: () => {
          router.push('/settings/theming');
        }
      },
      {
        label: 'API',
        icon: PrimeIcons.CLOUD,
        command: () => {
          router.push('/settings/api');
        }
      }
    ]
  }
]);

function toggle(event: MouseEvent): void {
  menu.value?.toggle(event);
}
</script>

<template>
  <Toolbar class="border-noround">
    <template v-slot:start>
      <h1 class="text-2xl">Chrome Companion</h1>
    </template>
    <template v-slot:end>
      <Button icon="pi pi-cog"
              class="w-2rem h-2rem"
              aria-haspopup="true"
              aria-controls="overlay_menu"
              @click="toggle"></Button>
      <Menu ref="menu"
            :popup="true"
            :model="settings"></Menu>
    </template>
  </Toolbar>
</template>

<style scoped lang="scss">
</style>

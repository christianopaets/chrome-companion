<script setup lang="ts">
import {ref} from 'vue';
import type {MenuItem} from 'primevue/menuitem';
import Menu from 'primevue/menu';
import {PrimeIcons} from 'primevue/api';
import {useRouter} from 'vue-router';

const router = useRouter();
const menu = ref<Menu>();
const settings = ref<MenuItem[]>([
  {
    label: 'Settings',
    items: [
      {
        label: 'Theming',
        icon: PrimeIcons.PALETTE,
        route: '/settings/theming'
      },
      {
        label: 'API',
        icon: PrimeIcons.CLOUD,
        route: '/settings/api'
      }
    ]
  }
]);

function toggle(event: MouseEvent): void {
  menu.value?.toggle(event);
}
</script>

<template>
  <Toolbar class="border-noround p-3">
    <template v-slot:start>
      <h1 class="text-2xl"
          @click="router.push('/')">Chrome Companion</h1>
    </template>
    <template v-slot:end>
      <Button icon="pi pi-cog"
              class="w-2rem h-2rem"
              aria-haspopup="true"
              aria-controls="overlay_menu"
              severity="info"
              @click="toggle"></Button>
      <Menu ref="menu"
            :popup="true"
            :model="settings">
        <template v-slot:item="{ label, item, props }">
          <router-link v-if="item.route"
                       v-slot="routerProps"
                       :to="item.route"
                       custom>
            <a :href="routerProps.href"
               v-bind="props.action"
               @click="routerProps.navigate($event)">
              <span v-bind="props.icon"/>
              <span v-bind="props.label">{{ label }}</span>
            </a>
          </router-link>
        </template>
      </Menu>
    </template>
  </Toolbar>
</template>

<style scoped lang="scss">
</style>

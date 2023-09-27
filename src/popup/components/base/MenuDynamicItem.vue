<script setup lang="ts">
import {computed} from 'vue';
import type {MenuItem} from 'primevue/menuitem';
import type {MenuRouterBindProps} from 'primevue/menu';

interface Props {
  parentProps: MenuRouterBindProps;
  label: string | ((...args: unknown[]) => string) | undefined;
  item: MenuItem;
}

const props = defineProps<Props>();
const label = computed<string>(() => {
  if (!props.label) {
    return '';
  }
  if (typeof props.label === 'string') {
    return props.label;
  }
  return props.label();
});
</script>

<template>
  <router-link v-if="item.route"
               v-slot="routerProps"
               :to="item.route"
               custom>
    <a :href="routerProps.href"
       v-bind="parentProps.action"
       @click="routerProps.navigate($event)">
      <span v-if="item.icon"
            v-bind="parentProps.icon"/>
      <span v-bind="parentProps.label">{{ label }}</span>
    </a>
  </router-link>
  <div v-else
       v-bind="parentProps.action">
    <span v-if="item.icon"
          v-bind="parentProps.icon"/>
    <span v-bind="parentProps.label">{{ label }}</span>
  </div>
</template>

<style scoped lang="scss">

</style>

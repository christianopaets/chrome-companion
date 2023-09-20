<script setup lang="ts">
import {useRoute, useRouter} from 'vue-router';
import {onMounted, ref, watch} from 'vue';
import {PrimeIcons} from 'primevue/api';

const router = useRouter();
const route = useRoute();

const active = ref(0);
const items = ref([
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
]);

onMounted(() => setActive());

watch(route, () => setActive(), {immediate: true});

function setActive(): void {
  active.value = items.value.findIndex((item) => route.path === router.resolve(item.route).path);
}
</script>

<template>
  <TabMenu v-model:activeIndex="active"
           :model="items"
           class="mt-1">
    <template #item="{ label, item, props }">
      <router-link v-if="item.route"
                   v-slot="routerProps"
                   :to="item.route"
                   custom>
        <a :href="routerProps.href"
           v-bind="props.action"
           class="bg-transparent"
           @click="routerProps.navigate($event)"
           @keydown.enter.space="routerProps.navigate($event)">
          <span v-bind="props.icon"/>
          <span v-bind="props.label">{{ label }}</span>
        </a>
      </router-link>
    </template>
  </TabMenu>
  <router-view></router-view>
</template>

<style scoped lang="scss">

</style>

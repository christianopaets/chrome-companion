<script setup lang="ts">
import {useRoute, useRouter} from 'vue-router';
import {onMounted, ref, watch} from 'vue';
import {PrimeIcons} from 'primevue/api';
import SlideTransition from '../../components/animations/SlideTransition.vue';

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

onMounted(() => {
  setActive();
});

watch(route, () => setActive(), {immediate: true});

function setActive(): void {
  active.value = items.value.findIndex(item => route.path === router.resolve(item.route).path);
}

function onTabChange(): void {
  if (items.value[active.value]!.route !== route.path) {
    setTimeout(() => {
      setActive();
    }, 10);
  }
}
</script>

<template>
  <section>
    <TabMenu v-model:activeIndex="active"
             :exact="true"
             :model="items"
             class="mt-1 px-3"
             @tab-change="onTabChange()" :pt="{menu: {class: 'bg-transparent'}}">
      <template v-slot:item="{ label, item, props }">
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
    <router-view v-slot="{Component, route}">
      <SlideTransition :direction="route.meta.direction">
        <component :is="Component"
                   :key="route.path"></component>
      </SlideTransition>
    </router-view>
  </section>
</template>

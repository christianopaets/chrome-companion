<script setup lang="ts">
import {useRoute, useRouter} from 'vue-router';
import {onMounted, ref, watch} from 'vue';
import {PrimeIcons} from 'primevue/api';
import SlideTransition from '../../components/animations/SlideTransition.vue';
import MenuDynamicItem from '../../components/base/MenuDynamicItem.vue';
import type {MenuItem} from 'primevue/menuitem';
import type {PassThrough} from 'primevue/ts-helpers';
import type {TabMenuPassThroughOptions} from 'primevue/tabmenu';
import {useI18n} from 'vue-i18n';

const router = useRouter();
const route = useRoute();
const {t} = useI18n();

const pt: PassThrough<TabMenuPassThroughOptions> = {
  action: {
    class: 'bg-transparent'
  },
  menu: {
    class: 'bg-transparent'
  }
};
const active = ref(0);
const items = ref<MenuItem[]>([
  {
    label: () => t('menu.theming'),
    icon: PrimeIcons.PALETTE,
    route: '/settings/theming'
  },
  {
    label: () => t('menu.api'),
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
             :pt="pt"
             @tab-change="onTabChange()">
      <template v-slot:item="{ label, item, props }">
        <MenuDynamicItem :item="item"
                         :parent-props="props"
                         :label="label"></MenuDynamicItem>
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

<i18n>
{
  "en": {
    "menu": {
      "theming": "Theming",
      "api": "API"
    }
  }
}
</i18n>

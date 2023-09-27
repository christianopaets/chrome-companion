<script setup lang="ts">
import {PrimeIcons} from 'primevue/api';
import type {ConversationListItem} from '@store/interfaces/conversation-list-item.interface';
import Menu from 'primevue/menu';
import type {MenuItem} from 'primevue/menuitem';
import {ref} from 'vue';
import MenuDynamicItem from '../base/MenuDynamicItem.vue';
import {useI18n} from 'vue-i18n';

interface Props {
  conversation: ConversationListItem;
  archived?: boolean;
}

const {conversation} = defineProps<Props>();
const emit = defineEmits(['edit', 'archive', 'delete']);
const {t} = useI18n();
const {d} = useI18n({useScope: 'global'});
const menu = ref<Menu>();
const items = ref<MenuItem[]>([{
  label: () => t('menu.title'),
  items: [
    {
      label: () => t('menu.edit'),
      icon: PrimeIcons.PENCIL,
      command() {
        emit('edit');
      },
    },
    {
      label: () => t('menu.archive'),
      icon: PrimeIcons.UPLOAD,
      command() {
        emit('archive');
      },
    },
    {
      label: () => t('menu.delete'),
      icon: PrimeIcons.TRASH,
      command() {
        emit('delete');
      },
    }
  ]
}]);
</script>

<template>
  <li v-ripple
      class="flex align-items-center justify-content-between p-3 border-bottom-1 surface-border cursor-pointer hover:surface-hover w-full p-ripple">
    <p class="text-lg select-none">{{ conversation.name }}</p>
    <div class="flex gap-3 align-items-center">
      <span class="text-base text-color-secondary font-medium select-none">{{
          d(conversation.last, 'conversation')
        }}</span>
      <Button v-if="!archived"
              :icon="PrimeIcons.ELLIPSIS_V"
              rounded
              text
              class="w-2rem h-2rem"
              @click.prevent.stop="menu?.toggle($event)"></Button>
      <Button v-else
              :icon="PrimeIcons.TRASH"
              rounded
              text
              class="w-2rem h-2rem"
              @click.prevent.stop="emit('delete')"></Button>
    </div>
    <Menu v-if="!archived"
          ref="menu"
          :model="items"
          :popup="true">
      <template v-slot:item="{item, label, props}">
        <MenuDynamicItem :item="item"
                         :parent-props="props"
                         :label="label"></MenuDynamicItem>
      </template>
    </Menu>
  </li>
</template>

<i18n>
{
  "en": {
    "menu": {
      "title": "Options",
      "edit": "Edit",
      "archive": "Archive",
      "delete": "Delete"
    }
  }
}
</i18n>

<script setup lang="ts">
import {PrimeIcons} from 'primevue/api';
import type {ConversationListItem} from '@store/interfaces/conversation-list-item.interface';
import Menu from 'primevue/menu';
import type {MenuItem} from 'primevue/menuitem';
import {ref} from 'vue';

interface Props {
  conversation: ConversationListItem;
  archived?: boolean;
}

const {conversation} = defineProps<Props>();
const emit = defineEmits(['edit', 'archive', 'delete']);
const menu = ref<Menu>();
const items = ref<MenuItem[]>([{
  label: 'Options',
  items: [
    {
      label: 'Edit',
      icon: PrimeIcons.PENCIL,
      command() {
        emit('edit');
      },
    },
    {
      label: 'Archive',
      icon: PrimeIcons.UPLOAD,
      command() {
        emit('archive');
      },
    },
    {
      label: 'Delete',
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
      <span class="text-base text-color-secondary font-medium select-none">{{ conversation.last }}</span>
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
          :popup="true"></Menu>
  </li>
</template>

<style scoped lang="scss">

</style>

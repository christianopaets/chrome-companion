<script setup lang="ts">
import {useConversationsStore} from '@store/conversations.store';
import {PrimeIcons} from 'primevue/api';
import {ref} from 'vue';
import CreateConversation from '../components/conversations/CreateConversation.vue';
import ConversationListItem from '../components/conversations/ConversationListItem.vue';
import ListAnimation from '../components/animations/ListAnimation.vue';
import ConversationsWelcome from '../components/conversations/ConversationsWelcome.vue';
import FadeThroughAnimation from '../components/animations/FadeThroughAnimation.vue';
import {useI18n} from 'vue-i18n';

const dialog = ref<InstanceType<typeof CreateConversation> | null>(null);
const conversationsStore = useConversationsStore();
const {t} = useI18n();
</script>

<template>
  <section class="h-full flex flex-column">
    <FadeThroughAnimation>
      <ListAnimation v-if="conversationsStore.length"
                     class="p-0 relative">
        <li class="flex align-items-center justify-content-between p-3 border-bottom-1 surface-border w-full"
            :key="'conversation-title'">
          <h2 v-if="conversationsStore.conversations.length"
              class="text-2xl">{{ t('conversations') }}</h2>
          <Button :icon="PrimeIcons.PLUS"
                  :disabled="!conversationsStore.createPermission"
                  label="Create conversation"
                  size="small"
                  class="ml-auto"
                  @click="dialog?.create()"></Button>
        </li>
        <ConversationListItem v-for="item in conversationsStore.list"
                              :key="item.id"
                              :conversation="item"
                              @archive="conversationsStore.archive(item.id)"
                              @edit="dialog?.edit(item)"
                              @delete="conversationsStore.delete(item.id)"
                              @click="console.log(`/conversations/${item.id}`)">
        </ConversationListItem>
        <li v-if="conversationsStore.archived.length"
            class="block p-3 text-2xl border-bottom-1 surface-border w-full mt-3"
            key="archived-title">{{ t('archived') }}
        </li>
        <ConversationListItem v-for="item in conversationsStore.archivedList"
                              :key="item.id"
                              :conversation="item"
                              :archived="true"
                              @delete="conversationsStore.deleteArchived(item.id)"
                              @click="console.log(`/conversations/${item.id}?archive`)">
        </ConversationListItem>
      </ListAnimation>
      <ConversationsWelcome v-else
                            @create="dialog?.create()"></ConversationsWelcome>
    </FadeThroughAnimation>
    <CreateConversation ref="dialog"
                        @create="conversationsStore.create($event)"
                        @edit="conversationsStore.edit($event.id, $event.name)"></CreateConversation>
  </section>
</template>

<i18n>
{
  "en": {
    "conversations": "Conversations",
    "archived": "Archived"
  }
}
</i18n>

<script setup lang="ts">
import ConversationInput from '../components/conversation/ConversationInput.vue';
import {useConversationStore} from '@store/conversation.store';
import {inject, onBeforeMount, onMounted, onUnmounted, ref} from 'vue';
import ConversationMessage from '../components/conversation/ConversationMessage.vue';
import {ScrollService} from '../services/scroll.service';
import {watchDebounced} from '@vueuse/core';
import ListAnimation from '../components/animations/ListAnimation.vue';
import {useRoute} from 'vue-router';
import {useI18n} from 'vue-i18n';
import {PrimeIcons} from 'primevue/api';
import {useConversationsStore} from '@store/conversations.store';

const {id} = defineProps<{ id: string; }>();
const conversationStore = useConversationStore();
const conversationsStore = useConversationsStore();
const scrollService = inject<ScrollService>(ScrollService.INJECTOR)!;
const conversation = conversationStore.conversation(id);
const conversationElement = ref<HTMLDivElement>();
const route = useRoute();
const archived = ref('archive' in route.query);
const {t} = useI18n();
const scrollAttached = ref(true);

watchDebounced(conversation, (_, oldValue) => {
  if (!oldValue) {
    return;
  }
  if (!scrollAttached.value) {
    return;
  }
  scrollService.scrollToBottom('smooth', conversationElement.value);
}, {deep: true, immediate: true, flush: 'post', debounce: 100, maxWait: 150});

onBeforeMount(() => {
  scrollService.disableGlobalScroll();
});

onMounted(async () => {
  if (archived.value) {
    return;
  }
  scrollService.scrollToBottom('instant', conversationElement.value);
  conversationElement.value?.addEventListener('scroll', onScroll);
});

onUnmounted(() => {
  scrollService.enableGlobalScroll();
  conversationElement.value?.removeEventListener('scroll', onScroll);
});

function submit(text: string): void {
  scrollAttached.value = true;
  conversationStore.send(id, text);
  conversationsStore.updateLast(id);
}

function onScroll(event: Event): void {
  if (!event.target || !(event.target instanceof HTMLElement)) {
    return;
  }
  const {scrollTop, scrollHeight, offsetHeight} = event.target;
  const error = 150;
  scrollAttached.value = scrollHeight - scrollTop < offsetHeight + error;
}
</script>

<template>
  <section class="w-full h-full flex flex-column justify-content-between overflow-custom"
           ref="conversationElement">
    <div class="h-fit relative">
      <template v-if="conversation">
        <ListAnimation>
          <ConversationMessage v-for="message in conversation.messages"
                               :key="message.id"
                               :message="message"></ConversationMessage>
        </ListAnimation>
        <p v-if="archived"
           class="text-sm text-color-secondary my-3 flex justify-content-center align-items-center gap-1">
          <i :class="PrimeIcons.INFO_CIRCLE"></i>
          {{ t('end') }}
        </p>
      </template>
    </div>
    <ConversationInput v-if="!archived"
                       :disabled="conversation.loading"
                       @submit="submit($event)"></ConversationInput>
  </section>
</template>

<i18n>
{
  "en": {
    "end": "This is the end of conversation"
  }
}
</i18n>

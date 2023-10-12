<script setup lang="ts">
import type {ConversationMessage} from '@interfaces/conversation/conversation-message.interface';
import {PrimeIcons} from 'primevue/api';
import {computed} from 'vue';
import {MarkedService} from '../../services/marked.service';
import {useI18n} from 'vue-i18n';

interface Props {
  message?: ConversationMessage;
  skeleton?: boolean;
}

const {message} = withDefaults(defineProps<Props>(), {
  skeleton: false
});

const parsedMessage = computed(() => {
  if (!message) {
    return '';
  }
  return MarkedService.parse(message.content);
});

const {t} = useI18n();
</script>

<template>
  <section class="p-3 flex align-items-center conversation-message text-color"
           :class="message?.role === 'user' ? 'conversation-message_user' : 'conversation-message_ai'">
    <Avatar v-if="message && !skeleton"
            :label="message.role === 'user' ? 'U' : undefined"
            :icon="message.role === 'assistant' ? PrimeIcons.PRIME : undefined"
            class="mr-2 bg-primary flex-shrink-0 mb-auto"
            shape="circle"/>
    <Skeleton v-else
              size="2rem"
              shape="circle"
              class="mr-2 flex-shrink-0 mb-auto"></Skeleton>
    <div v-if="message && !skeleton"
         class="flex flex-column gap-2 align-items-start">
      <div class="w-full text-base"
           v-html="parsedMessage">
      </div>
      <InlineMessage v-if="message.failed">{{ t('error.message') }}</InlineMessage>
    </div>
  </section>
</template>

<style lang="scss">
.conversation-message_user {
  background-color: var(--highlight-bg) !important;
  color: var(--highlight-text-color) !important;
}

.conversation-message {

  ol {
    display: flex;
    list-style: decimal;
    flex-direction: column;
    gap: 1rem;
    padding: 1rem;
  }
}
</style>

<i18n>
{
  "en": {
    "error": {
      "message": "There was an error with this message. Please try again."
    }
  }
}
</i18n>

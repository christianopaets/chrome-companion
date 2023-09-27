<script setup lang="ts">
import {computed, ref} from 'vue';
import type {ConversationListItem} from '@store/interfaces/conversation-list-item.interface';
import {useI18n} from 'vue-i18n';

type Emits = {
  create: [name: string];
  edit: [conversation: { id: string; name: string }];
}

const show = ref(false);
const name = ref('');
const state = ref<'edit' | 'create'>('create');
const emit = defineEmits<Emits>();
const conversation = ref<ConversationListItem>();
const {t} = useI18n();

const label = computed(() => {
  switch (state.value) {
    case 'edit':
      return 'button.edit';
    case 'create':
      return 'button.create';
  }
});

function create(): void {
  name.value = '';
  state.value = 'create';
  show.value = true;
}

function edit(item: ConversationListItem): void {
  name.value = item.name;
  conversation.value = item;
  state.value = 'edit';
  show.value = true;
}

function submit(): void {
  show.value = false;
  switch (state.value) {
    case 'create':
      return emit('create', name.value);
    case 'edit':
      return emit('edit', {
        id: conversation.value!.id,
        name: name.value
      });
  }
}

defineExpose({create, edit});

</script>

<template>
  <Dialog v-model:visible="show"
          modal
          :header="t('header')"
          :dismissable-mask="true"
          :style="{width: '60vw'}"
          :draggable="false">
    <template v-slot:default>
      <InputText id="conversation-name"
                 v-model="name"
                 class="w-full mt-1"
                 :placeholder="t('input.placeholder')"
                 required
                 autofocus
                 @keydown.enter="submit()"></InputText>
    </template>
    <template v-slot:footer>
      <Button :label="t(label)"
              class="w-full"
              :disabled="!name"
              @click="submit()"></Button>
    </template>
  </Dialog>
</template>

<i18n>
{
  "en": {
    "header": "Conversation name",
    "input": {
      "placeholder": "Enter conversation name"
    },
    "button": {
      "edit": "Edit",
      "create": "Create"
    }
  }
}
</i18n>

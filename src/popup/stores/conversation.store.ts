import {defineStore} from 'pinia';
import ConversationTable from '@storage/tables/conversation.table';
import {id as createId} from '@utils/id';
import type {ConversationState} from '@storage/conversation';
import type {OpenAI} from 'openai';
import type {Conversation} from '@interfaces/conversation/conversation.interface';
import {ChatOpenError} from '../services/http.service';

export const useConversationStore = defineStore(ConversationTable.name, {
    chrome: ConversationTable.type,
    inject: ['http'],
    state: (): ConversationState => ({
        conversations: {}
    }),
    getters: {
        conversation(): (id: string) => Conversation {
            return id => {
                if (!this.conversations[id]) {
                    throw new Error(`Conversation with such id: ${id} doesn't exists`);
                }
                return this.conversations[id]!;
            };
        },
        messagesBody(): (id: string) => OpenAI.Chat.ChatCompletionMessageParam[] {
            return id => this.conversation(id).messages
                .filter(message => !message.failed && !message.pending)
                .map(message => ({
                    content: message.content,
                    role: message.role
                }));
        }
    },
    actions: {
        create(id: string): void {
            if (this.$state.conversations.hasOwnProperty(id)) {
                return;
            }
            this.conversations[id] = {messages: [], loading: false};
        },
        delete(id: string): void {
            if (id in this.$state.conversations) {
                delete this.$state.conversations[id];
            }
        },
        setLoading(id: string, loading: boolean): void {
            if (id in this.$state.conversations) {
                this.$state.conversations[id]!.loading = loading;
            }
        },
        checkAndDeleteLastPending(id: string): void {
            if (id in this.conversations) {
                const messages = this.conversations[id]!.messages;
                const last = messages[messages.length - 1];
                if (last?.pending) {
                    this.conversations[id]!.messages.splice(messages.length - 1, 1);
                }
            }
        },
        setErrorToLastMessage(id: string): void {
            if (id in this.conversations) {
                const messages = this.conversations[id]!.messages;
                const last = messages[messages.length - 1];
                if (last?.pending) {
                    this.conversations[id]!.messages[messages.length - 1]!.failed = true;
                    delete this.conversations[id]!.messages[messages.length - 1]!.pending;
                }
            }
        },
        addMessage(id: string, content: string, role: 'assistant' | 'user' = 'user'): void {
            this.conversations[id]!.messages.push({role, content, id: createId(), failed: false});
        },
        updateMessage(id: string, message: OpenAI.Chat.Completions.ChatCompletionChunk): void {
            if (!this.conversations[id]) {
                throw new Error(`Conversation with such id: ${id} doesn't exists`);
            }
            const index = this.conversations[id]!.messages.findIndex(item => item.id === message.id);
            if (index === -1 && message.choices[0]!.delta.role) {
                this.checkAndDeleteLastPending(id);
                this.conversations[id]!.messages.push({
                    id: message.id,
                    role: message.choices[0]!.delta.role,
                    content: '',
                    pending: true,
                    failed: false
                });
                return;
            }
            if (index === -1) {
                console.error('Somehow message was not created');
                return;
            }
            if (message.choices[0]!.finish_reason) {
                console.debug('Message finished');
                delete this.conversations[id]!.messages[index]!.pending;
                this.setLoading(id, false);
                return;
            }
            this.conversations[id]!.messages[index]!.content += message.choices[0]!.delta.content;
        },
        async send(id: string, message: string): Promise<void> {
            this.checkAndDeleteLastPending(id);
            this.addMessage(id, message);
            this.setLoading(id, true);
            await this.http?.chat(this.messagesBody(id), response => {
                this.updateMessage(id, response);
            }, error => {
                if (error instanceof ChatOpenError) {
                    this.setErrorToLastMessage(id);
                }
            });
        }
    }
});

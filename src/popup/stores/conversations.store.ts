import {defineStore} from 'pinia';
import type {ConversationsState} from '@state/conversations';
import type {Conversation} from '../../common/interfaces/conversation.interface';
import {id} from '../../common/utils/id';
import conversationsTable from '../../background/storage/tables/conversations.table';
import type {ConversationListItem} from '@store/interfaces/conversation-list-item.interface';

export const useConversationsStore = defineStore(conversationsTable.name, {
    chrome: conversationsTable.type,
    state: (): ConversationsState => ({
        conversations: [],
        limit: 20,
        archived: []
    }),
    getters: {
        createPermission(): boolean {
            return this.conversations.length < this.limit;
        },
        length(): number {
            return this.conversations.length + this.archived.length;
        },
        list(state): ConversationListItem[] {
            const formatter: Intl.DateTimeFormatOptions = {
                day: '2-digit',
                month: 'short',
                hour: '2-digit',
                minute: '2-digit',
                hour12: false
            };
            return state.conversations
                .sort((a, b) => b.last - a.last)
                .map(conversation => ({
                    id: conversation.id,
                    name: conversation.name,
                    last: new Date(conversation.last).toLocaleDateString('en', formatter)
                }));
        },
        archivedList(state): ConversationListItem[] {
            const formatter: Intl.DateTimeFormatOptions = {
                day: '2-digit',
                month: 'short',
                hour: '2-digit',
                minute: '2-digit',
                hour12: false
            };
            return state.archived
                .sort((a, b) => b.last - a.last)
                .map(conversation => ({
                    id: conversation.id,
                    name: conversation.name,
                    last: new Date(conversation.last).toLocaleDateString('en', formatter)
                }));
        }
    },
    actions: {
        create(name: string): void {
            if (this.conversations.length >= this.limit) {
                console.warn('Reached maximum limit of conversations');
                return;
            }
            const conversation: Conversation = {
                id: id(),
                name,
                last: Date.now(),
                started: Date.now(),
                eof: new Date().setDate(new Date().getDate() + 14)
            };
            this.conversations.push(conversation);
        },
        edit(id: string, name: string): void {
            const conversation = this.conversations.find(item => item.id === id);
            if (!conversation) {
                console.warn(`Conversation width id ${id} was not found`);
                return;
            }
            this.$patch(state => {
                const index = state.conversations.findIndex(item => item.id === conversation.id);
                state.conversations.splice(index, 1);
                state.conversations.push({
                    ...conversation,
                    name
                });
                return state;
            });
        },
        delete(id: string): void {
            const conversationIndex = this.conversations.findIndex(item => item.id === id);
            if (conversationIndex === -1) {
                console.warn(`Conversation width id ${id} was not found`);
                return;
            }
            this.confirm.require({
                message: 'Do you want to delete this conversation?',
                header: 'Delete Confirmation',
                icon: 'pi pi-info-circle',
                acceptClass: 'p-button-danger',
                accept: () => {
                    this.conversations.splice(conversationIndex, 1);
                    this.toast.add({
                        severity: 'success',
                        summary: 'Confirmed',
                        detail: 'Conversation deleted',
                        life: 3000
                    });
                }
            });
        },
        deleteArchived(id: string): void {
            const conversationIndex = this.archived.findIndex(item => item.id === id);
            if (conversationIndex === -1) {
                console.warn(`Archived conversation width id ${id} was not found`);
                return;
            }
            this.confirm.require({
                message: 'Do you want to delete this conversation?',
                header: 'Delete Confirmation',
                icon: 'pi pi-info-circle',
                acceptClass: 'p-button-danger',
                accept: () => {
                    this.archived.splice(conversationIndex, 1);
                    this.toast.add({
                        severity: 'success',
                        summary: 'Confirmed',
                        detail: 'Conversation deleted',
                        life: 3000
                    });
                }
            });
        },
        archive(id: string): void {
            const conversationIndex = this.conversations.findIndex(item => item.id === id);
            if (conversationIndex === -1) {
                console.warn(`Conversation width id ${id} was not found`);
                return;
            }
            this.confirm.require({
                message: 'Do you want to archive this conversation?',
                header: 'Archive Confirmation',
                icon: 'pi pi-info-circle',
                acceptClass: 'p-button-warning',
                accept: () => {
                    const toArchive = this.conversations.splice(conversationIndex, 1);
                    this.archived.push(...toArchive);
                    this.toast.add({
                        severity: 'success',
                        summary: 'Confirmed',
                        detail: 'Conversation archived',
                        life: 3000
                    });
                }
            });
        }
    }
});

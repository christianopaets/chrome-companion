import {defineStore} from 'pinia';
import type {ConversationsState} from '@storage/conversations';
import type {ConversationDetails} from '@interfaces/conversation/conversation-details.interface';
import {id} from '@utils/id';
import ConversationsTable from '@storage/tables/conversations.table';
import type {ConversationListItem} from '@store/interfaces/conversation-list-item.interface';
import {useConversationStore} from '@store/conversation.store';

export const useConversationsStore = defineStore(ConversationsTable.name, {
    chrome: ConversationsTable.type,
    inject: ['confirm', 'toast', 'i18n'],
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
            return state.conversations.sort((a, b) => b.last - a.last);
        },
        archivedList(state): ConversationListItem[] {
            return state.archived.sort((a, b) => b.last - a.last);
        }
    },
    actions: {
        create(name: string): void {
            if (this.conversations.length >= this.limit) {
                console.warn('Reached maximum limit of conversations');
                return;
            }
            const conversation: ConversationDetails = {
                id: id(),
                name,
                last: Date.now(),
                started: Date.now(),
                eof: new Date().setDate(new Date().getDate() + 14)
            };
            this.conversations.push(conversation);
            const conversationStore = useConversationStore();
            conversationStore.create(conversation.id);
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
        updateLast(id: string): void {
            const conversationIndex = this.conversations.findIndex(item => item.id === id);
            if (conversationIndex === -1) {
                console.warn(`Conversation width id ${id} was not found`);
                return;
            }
            this.conversations[conversationIndex]!.last = Date.now();
        },
        delete(id: string): void {
            const conversationIndex = this.conversations.findIndex(item => item.id === id);
            if (conversationIndex === -1) {
                console.warn(`Conversation width id ${id} was not found`);
                return;
            }
            this.confirm?.require({
                header: this.i18n?.t('confirm-dialog.conversations.delete.header'),
                message: this.i18n?.t('confirm-dialog.conversations.delete.message'),
                rejectLabel: this.i18n?.t('confirm-dialog.conversations.delete.reject'),
                acceptLabel: this.i18n?.t('confirm-dialog.conversations.delete.accept'),
                icon: 'pi pi-info-circle',
                acceptClass: 'p-button-danger',
                accept: () => {
                    const conversationStore = useConversationStore();
                    this.conversations.splice(conversationIndex, 1);
                    conversationStore.delete(id);
                    this.toast?.add({
                        severity: 'success',
                        summary: this.i18n?.t('toast.conversations.delete.summary'),
                        detail: this.i18n?.t('toast.conversations.delete.detail'),
                        life: 2000
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
            this.confirm?.require({
                header: this.i18n?.t('confirm-dialog.conversations.delete-archived.header'),
                message: this.i18n?.t('confirm-dialog.conversations.delete-archived.message'),
                rejectLabel: this.i18n?.t('confirm-dialog.conversations.delete-archived.reject'),
                acceptLabel: this.i18n?.t('confirm-dialog.conversations.delete-archived.accept'),
                icon: 'pi pi-info-circle',
                acceptClass: 'p-button-danger',
                accept: () => {
                    const conversationStore = useConversationStore();
                    this.archived.splice(conversationIndex, 1);
                    conversationStore.delete(id);
                    this.toast?.add({
                        severity: 'success',
                        summary: this.i18n?.t('toast.conversations.delete-archived.summary'),
                        detail: this.i18n?.t('toast.conversations.delete-archived.detail'),
                        life: 2000
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
            this.confirm?.require({
                header: this.i18n?.t('confirm-dialog.conversations.archive.header'),
                message: this.i18n?.t('confirm-dialog.conversations.archive.message'),
                rejectLabel: this.i18n?.t('confirm-dialog.conversations.archive.reject'),
                acceptLabel: this.i18n?.t('confirm-dialog.conversations.archive.accept'),
                icon: 'pi pi-info-circle',
                acceptClass: 'p-button-warning',
                accept: () => {
                    const toArchive = this.conversations.splice(conversationIndex, 1);
                    this.archived.push(...toArchive);
                    this.toast?.add({
                        severity: 'success',
                        summary: this.i18n?.t('toast.conversations.archive.summary'),
                        detail: this.i18n?.t('toast.conversations.archive.detail'),
                        life: 2000
                    });
                }
            });
        }
    }
});

export class ScrollService {

    static readonly INJECTOR = Symbol('ScrollService');

    get globalScroll(): HTMLDivElement | null {
        return document.getElementById('global-scroll') as HTMLDivElement | null;
    }

    onGlobalScroll(callback: (event: Event<HTMLDivElement>) => void): void {
        if (!this.globalScroll) {
            console.warn('Scroll element does not exist');
            return;
        }
        this.globalScroll.addEventListener('scroll', callback);
    }

    scrollTo(options: ScrollToOptions, el?: HTMLElement): void {
        const scrollElement = el || this.globalScroll;
        if (!scrollElement) {
            console.warn('Scroll element does not exist');
            return;
        }
        scrollElement.scrollTo(options);
    }

    scrollToBottom(behavior: ScrollBehavior = 'smooth', el?: HTMLElement): void {
        const scrollElement = el || this.globalScroll;
        if (!scrollElement) {
            console.warn('Scroll element does not exist');
            return;
        }
        this.scrollTo({
            top: scrollElement.scrollHeight,
            left: 0,
            behavior
        }, scrollElement);
    }

    routerTransitionTimeout(): Promise<void> {
        return new Promise<void>(resolve => {
            setTimeout(() => {
                resolve();
            }, 300);
        });
    }

    disableGlobalScroll(): void {
        if (!this.globalScroll) {
            console.warn('Scroll element does not exist');
            return;
        }
        this.globalScroll.classList.add('overflow-hidden');
    }

    enableGlobalScroll(): void {
        if (!this.globalScroll) {
            console.warn('Scroll element does not exist');
            return;
        }
        this.globalScroll.classList.remove('overflow-hidden');
    }
}

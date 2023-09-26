export function id(seed: string = ''): string {
    if (!seed) {
        seed = Math.round(Date.now() * Math.random()).toString(16);
    }
    const date = Date.now().toString(16);
    const random = Math.round(Number.MAX_SAFE_INTEGER / Date.now()).toString(16);
    return `${random}-${date}-${seed}`;
}

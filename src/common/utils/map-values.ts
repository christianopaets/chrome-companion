export function mapValues<T extends object, U>(
    object: T,
    callback: (value: T[keyof T], key?: keyof T, object?: T) => U
): Record<keyof T, U> {
    const newObject: Partial<Record<keyof T, U>> = {};
    for (let key in object) {
        if (object.hasOwnProperty(key)) {
            newObject[key] = callback(object[key], key, object);
        }
    }
    return newObject as Record<keyof T, U>;
}

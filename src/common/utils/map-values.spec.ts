import {describe, expect, test} from 'bun:test';
import {mapValues} from '@utils/map-values';

describe('Map Values', () => {

    test('should map thru object and return new object values', () => {
        const obj = {
            'fred': {'user': 'fred', 'age': 40},
            'pebbles': {'user': 'pebbles', 'age': 1}
        };
        expect(mapValues(obj, item => item.age)).toEqual({'fred': 40, 'pebbles': 1});
    });
});

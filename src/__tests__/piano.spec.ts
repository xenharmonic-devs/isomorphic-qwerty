import {describe, it, expect} from 'vitest';
import {pianoMap} from '../piano';
import {CODES_LAYER_1} from '../coordinates';

describe('Piano-style index mapper', () => {
  it('maps a chromatic scale diatonically starting from KeyQ', () => {
    const {indexByCode, coordsByIndex} = pianoMap([
      1, // C
      0, // C#
      1, // D
      0, // D#
      1, // E
      1, // F
      0, // F#
      1, // G
      0, // G#
      1, // A
      0, // A#
      1, // B
      1, // c
      0, // c#
      1, // d
      0, // d#
      1, // e
      1, // f
      0, // f#
      1, // g
      0, // g#
      1, // a
      0, // a#
      1, // b
    ]);
    const digitRow = CODES_LAYER_1[0].map(code => indexByCode.get(code!));
    const qwertyRow = CODES_LAYER_1[1]
      .slice(1)
      .map(code => indexByCode.get(code!));
    expect(coordsByIndex).toEqual([
      [0, 1, 1],
      [1, 0, 1],
      [1, 1, 1],
      [2, 0, 1],
      [2, 1, 1],
      [3, 1, 1],
      [4, 0, 1],
      [4, 1, 1],
      [5, 0, 1],
      [5, 1, 1],
      [6, 0, 1],
      [6, 1, 1],
      [7, 1, 1],
      [8, 0, 1],
      [8, 1, 1],
      [9, 0, 1],
      [9, 1, 1],
      [10, 1, 1],
      [11, 0, 1],
      [11, 1, 1],
      undefined,
      undefined,
      undefined,
      undefined,
    ]);
    expect(qwertyRow).toEqual([0, 2, 4, 5, 7, 9, 11, 12, 14, 16, 17, 19]);
    expect(digitRow).toEqual([
      undefined,
      undefined,
      1,
      3,
      undefined,
      6,
      8,
      10,
      undefined,
      13,
      15,
      undefined,
      18,
    ]);
  });

  it('maps a chromatic scale diatonically starting from KeyA', () => {
    const {indexByCode, coordsByIndex} = pianoMap([
      2, // C
      1, // C#
      2, // D
      1, // D#
      2, // E
      2, // F
      1, // F#
      2, // G
      1, // G#
      2, // A
      1, // A#
      2, // B
      2, // c
      1, // c#
      2, // d
      1, // d#
      2, // e
      2, // f
      1, // f#
      2, // g
      1, // g#
      2, // a
      1, // a#
      2, // b
    ]);
    const asdfRow = CODES_LAYER_1[2]
      .slice(1)
      .map(code => indexByCode.get(code!));
    const qwertyRow = CODES_LAYER_1[1]
      .slice(1)
      .map(code => indexByCode.get(code!));
    expect(coordsByIndex).toEqual([
      [0, 2, 1],
      [1, 1, 1],
      [1, 2, 1],
      [2, 1, 1],
      [2, 2, 1],
      [3, 2, 1],
      [4, 1, 1],
      [4, 2, 1],
      [5, 1, 1],
      [5, 2, 1],
      [6, 1, 1],
      [6, 2, 1],
      [7, 2, 1],
      [8, 1, 1],
      [8, 2, 1],
      [9, 1, 1],
      [9, 2, 1],
      [10, 2, 1],
      [11, 1, 1],
      [11, 2, 1],
      undefined,
      undefined,
      undefined,
      undefined,
    ]);
    expect(asdfRow).toEqual([0, 2, 4, 5, 7, 9, 11, 12, 14, 16, 17, 19]);
    expect(qwertyRow).toEqual([
      undefined,
      1,
      3,
      undefined,
      6,
      8,
      10,
      undefined,
      13,
      15,
      undefined,
      18,
    ]);
  });

  it('maps a chromatic scale diatonically starting from IntlBackslash', () => {
    const {indexByCode, coordsByIndex} = pianoMap([
      3, // C
      2, // C#
      3, // D
      2, // D#
      3, // E
      3, // F
      2, // F#
      3, // G
      2, // G#
      3, // A
      2, // A#
      3, // B
      3, // c
      2, // c#
      3, // d
      2, // d#
      3, // e
      3, // f
      2, // f#
      3, // g
      2, // g#
      3, // a
      2, // a#
      3, // b
    ]);
    const zxcvRow = CODES_LAYER_1[3].map(code => indexByCode.get(code!));
    const asdfRow = CODES_LAYER_1[2]
      .slice(1)
      .map(code => indexByCode.get(code!));
    expect(coordsByIndex).toEqual([
      [-1, 3, 1],
      [0, 2, 1],
      [0, 3, 1],
      [1, 2, 1],
      [1, 3, 1],
      [2, 3, 1],
      [3, 2, 1],
      [3, 3, 1],
      [4, 2, 1],
      [4, 3, 1],
      [5, 2, 1],
      [5, 3, 1],
      [6, 3, 1],
      [7, 2, 1],
      [7, 3, 1],
      [8, 2, 1],
      [8, 3, 1],
      [9, 3, 1],
      [10, 2, 1],
      undefined,
      [11, 2, 1],
      undefined,
      undefined,
      undefined,
    ]);
    expect(zxcvRow).toEqual([0, 2, 4, 5, 7, 9, 11, 12, 14, 16, 17]);
    expect(asdfRow).toEqual([
      1,
      3,
      undefined,
      6,
      8,
      10,
      undefined,
      13,
      15,
      undefined,
      18,
      20,
    ]);
  });

  it('maps a chromatic scale diatonically starting from KeyQ (aeolian)', () => {
    const {indexByCode, coordsByIndex} = pianoMap([
      0, // G#`
      1, // A`
      0, // A#`
      1, // B`
      1, // C
      0, // C#
      1, // D
      0, // D#
      1, // E
      1, // F
      0, // F#
      1, // G
      0, // G#
      1, // A
      0, // A#
      1, // B
      1, // c
      0, // c#
      1, // d
      0, // d#
      1, // e
    ]);
    const digitRow = CODES_LAYER_1[0].map(code => indexByCode.get(code!));
    const qwertyRow = CODES_LAYER_1[1]
      .slice(1)
      .map(code => indexByCode.get(code!));
    expect(coordsByIndex).toEqual([
      [0, 0, 1],
      [0, 1, 1],
      [1, 0, 1],
      [1, 1, 1],
      [2, 1, 1],
      [3, 0, 1],
      [3, 1, 1],
      [4, 0, 1],
      [4, 1, 1],
      [5, 1, 1],
      [6, 0, 1],
      [6, 1, 1],
      [7, 0, 1],
      [7, 1, 1],
      [8, 0, 1],
      [8, 1, 1],
      [9, 1, 1],
      [10, 0, 1],
      [10, 1, 1],
      [11, 0, 1],
      [11, 1, 1],
    ]);
    expect(qwertyRow).toEqual([1, 3, 4, 6, 8, 9, 11, 13, 15, 16, 18, 20]);
    expect(digitRow).toEqual([
      undefined,
      0,
      2,
      undefined,
      5,
      7,
      undefined,
      10,
      12,
      14,
      undefined,
      17,
      19,
    ]);
  });

  it('maps a split-key chromatic scale diatonically starting from KeyA (19edo)', () => {
    const {indexByCode} = pianoMap(
      [
        2, // C
        1, // C#
        0, // Db
        2, // D
        1, // D#
        0, // Eb
        2, // E
        1, // E# / Fb
        2, // F
        1, // F#
        0, // Gb
        2, // G
        1, // G#
        0, // Ab
        2, // A
        1, // A#
        0, // Bb
        2, // B
        1, // B# / Cb
        2, // c
        1, // c#
        0, // db
        2, // d
        1, // d#
        0, // eb
        2, // e
        1, // e# / fb
        2, // f
        1, // f#
        0, // gb
        2, // g
        1, // g#
        0, // ab
        2, // a
        1, // a#
        0, // bb
        2, // b
      ],
      [1, 0]
    );
    const asdfRow = CODES_LAYER_1[2]
      .slice(1)
      .map(code => indexByCode.get(code!));
    const qwertyRow = CODES_LAYER_1[1]
      .slice(1)
      .map(code => indexByCode.get(code!));
    const digitRow = CODES_LAYER_1[0].map(code => indexByCode.get(code!));
    expect(asdfRow).toEqual([0, 3, 6, 8, 11, 14, 17, 19, 22, 25, 27, 30]);
    expect(qwertyRow).toEqual([
      undefined,
      1,
      4,
      7,
      9,
      12,
      15,
      18,
      20,
      23,
      26,
      28,
    ]);
    expect(digitRow).toEqual([
      undefined,
      undefined,
      2,
      5,
      undefined,
      10,
      13,
      16,
      undefined,
      21,
      24,
      undefined,
      29,
    ]);
  });

  it('maps a split-key chromatic scale diatonically starting from KeyA (17edo)', () => {
    const {indexByCode} = pianoMap([
      2, // C
      0, // Db
      1, // C#
      2, // D
      0, // Eb
      1, // D#
      2, // E
      2, // F
      0, // Gb
      1, // F#
      2, // G
      0, // Ab
      1, // G#
      2, // A
      0, // Bb
      1, // A#
      2, // B
      2, // c
      0, // db
      1, // c#
      2, // d
      0, // eb
      1, // d#
      2, // e
      2, // f
      0, // gb
      1, // f#
      2, // g
      0, // ab
      1, // g#
      2, // a
      0, // bb
      1, // a#
      2, // b
    ]);
    const asdfRow = CODES_LAYER_1[2]
      .slice(1)
      .map(code => indexByCode.get(code!));
    const qwertyRow = CODES_LAYER_1[1]
      .slice(1)
      .map(code => indexByCode.get(code!));
    const digitRow = CODES_LAYER_1[0].map(code => indexByCode.get(code!));
    expect(asdfRow).toEqual([0, 3, 6, 7, 10, 13, 16, 17, 20, 23, 24, 27]);
    expect(qwertyRow).toEqual([
      undefined,
      2,
      5,
      undefined,
      9,
      12,
      15,
      undefined,
      19,
      22,
      undefined,
      26,
    ]);
    expect(digitRow).toEqual([
      undefined,
      undefined,
      1,
      4,
      undefined,
      8,
      11,
      14,
      undefined,
      18,
      21,
      undefined,
      25,
    ]);
  });
});

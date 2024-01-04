/*
Split the keyboard into xy-planes along a z-coordinate for different contiguous regions of keys
*/

export type Coords3D = [number, number, number];

const ORIGIN_LAYER_0 = 0;
/**
 * Key codes for the row consisting of Esc and FN keys.
 */
export const CODES_LAYER_0 = [
  [
    'Escape',
    'F1',
    'F2',
    'F3',
    'F4',
    'F5',
    'F6',
    'F7',
    'F8',
    'F9',
    'F10',
    'F11',
    'F12',
  ],
];

const ORIGIN_LAYER_1 = -1;
/**
 * Key codes for the rows containing the digits, qwerty, asdf and zxcv.
 */
export const CODES_LAYER_1 = [
  [
    'Backquote',
    'Digit1',
    'Digit2',
    'Digit3',
    'Digit4',
    'Digit5',
    'Digit6',
    'Digit7',
    'Digit8',
    'Digit9',
    'Digit0',
    'Minus',
    'Equal',
  ],
  [
    null,
    'KeyQ',
    'KeyW',
    'KeyE',
    'KeyR',
    'KeyT',
    'KeyY',
    'KeyU',
    'KeyI',
    'KeyO',
    'KeyP',
    'BracketLeft',
    'BracketRight',
  ],
  [
    null,
    'KeyA',
    'KeyS',
    'KeyD',
    'KeyF',
    'KeyG',
    'KeyH',
    'KeyJ',
    'KeyK',
    'KeyL',
    'Semicolon',
    'Quote',
    'Backslash',
  ],
  [
    'IntlBackslash',
    'KeyZ',
    'KeyX',
    'KeyC',
    'KeyV',
    'KeyB',
    'KeyN',
    'KeyM',
    'Comma',
    'Period',
    'Slash',
  ],
];

const ORIGIN_LAYER_2 = 0;
/**
 * Key codes for the cluster of keys with Page Up/Down.
 */
export const CODES_LAYER_2 = [
  ['Insert', 'Home', 'PageUp'],
  ['Delete', 'End', 'PageDown'],
];

const ORIGIN_LAYER_3 = 0;
/**
 * Key codes for the numpad.
 */
export const CODES_LAYER_3 = [
  ['NumLock', 'NumpadDivide', 'NumpadMultiply', 'NumpadSubtract'],
  ['Numpad7', 'Numpad8', 'Numpad9', 'NumpadAdd'],
  ['Numpad4', 'Numpad5', 'Numpad6'],
  ['Numpad1', 'Numpad2', 'Numpad3', 'NumpadEnter'],
  ['Numpad0', null, 'NumpadDecimal'],
];

/**
 * Mapping from key codes to coordinates of input device geometry.
 */
export const COORDS_BY_CODE: Map<string, Coords3D> = new Map();
CODES_LAYER_0.forEach((row, y) =>
  row.forEach((code, x) => COORDS_BY_CODE.set(code, [ORIGIN_LAYER_0 + x, y, 0]))
);
CODES_LAYER_1.forEach((row, y) => {
  row.forEach((code, x) => {
    if (code !== null) {
      COORDS_BY_CODE.set(code, [ORIGIN_LAYER_1 + x, y, 1]);
    }
  });
});
CODES_LAYER_2.forEach((row, y) =>
  row.forEach((code, x) => COORDS_BY_CODE.set(code, [ORIGIN_LAYER_2 + x, y, 2]))
);
CODES_LAYER_3.forEach((row, y) => {
  row.forEach((code, x) => {
    if (code !== null) {
      COORDS_BY_CODE.set(code, [ORIGIN_LAYER_3 + x, y, 3]);
    }
  });
});

const CODE_BY_COORDS: Record<string, string> = {};

for (const [code, xyz] of COORDS_BY_CODE) {
  const key = xyz.join(',');
  CODE_BY_COORDS[key] = code;
}

/**
 * Map 3D coordinates to key codes.
 * @param xyz 3D coordinates of the physical key.
 * @returns Key code associated with the coordinates or `undefined` if there is no association.
 */
export function codeByCoords(xyz: Coords3D): string | undefined {
  const key = xyz.join(',');
  return CODE_BY_COORDS[key];
}

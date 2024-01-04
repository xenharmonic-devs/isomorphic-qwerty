# isomorphic-qwerty
Isomorphic coordinate-system for the QWERTY keyboard with sustain using the Shift key

## Installation ##
```bash
npm i
```

## Documentation ##
Documentation is hosted at the project [Github pages](https://xenharmonic-devs.github.io/isomorphic-qwerty).

To generate documentation locally run:
```bash
npm run doc
```

## Coordinate system
### Z = 0
Keys from *Escape* and *F1* through *F12* starting from x = 0 in increasing order. (all have y = 0)

### Z = 1
The main contiguous layer.

The row containing the digits is y = 0 with *Backquote* starting at x = -1.

The row containing Q, W, E, R, T, Y is y = 1 with Q starting at x = 0.

The row containing A, S, D, F is y = 2 with A starting at x = 0.

The row containing Z, X, C, V is y = 3 with *IntlBackslash* starting at x = -1. Many physical keyboards don't have this key so it's basically the same as Z starting at x = 0.

### Z = 2
Cluster of keys containing Page Up/Down.

### Z = 3
Numpad and associated keys.

## Example
This example sets up a typical control flow. Press down keys on your QWERTY keyboard to see their coordinates logged in the console.

Press keys down with 'Shift' to sustain them (nothing triggered on physical release of the key) and press 'backquote' (the key next to the digit '1') to trigger the pending keyup callbacks when you please.

```typescript
import {Keyboard, type CoordinateKeyboardEvent} from 'isomorphic-qwerty';

const typingKeyboard = new Keyboard();

function typingKeydown(event: CoordinateKeyboardEvent) {
  if (event.code === 'Backquote') {
    typingKeyboard.deactivate();
    function noKeyup() {}
    return noKeyup;
  }
  const triggeringEvent = event;
  console.log(`You pressed down ${event.code} which lies at coordinates ${event.coordinates}`);

  function keyup() {
    console.log(`You released ${triggeringEvent.code} which lies at coordinates ${triggeringEvent.coordinates}`);
  }
  return keyup;
}

typingKeyboard.addKeydownListener(typingKeydown);

window.addEventListener('keydown', typingKeyboard.keydown.bind(typingKeyboard));
window.addEventListener('keyup', typingKeyboard.keyup.bind(typingKeyboard));
```

### Piano-style layers
It's also possible to use a layout similar to a piano.

```typescript
import {Keyboard, type CoordinateKeyboardEvent, pianoMap} from 'isomorphic-qwerty';

// Autobind window keydown/keyup listeners.
const typingKeyboard = new Keyboard(true);

// Typical MIDI scale.
const names = ["C", "C#", "D", "D#", "E", "F", "F#", "G", "G#", "A", "A#", "B", "c"];

// Put sharp keys on the QWERTY row and plain keys on ASDF.
const {indexByCode} = pianoMap(names.map(name => name.includes("#") ? 1 : 2));

function noKeyup() {}

function typingKeydown(event: CoordinateKeyboardEvent) {
  if (event.code === 'Backquote') {
    typingKeyboard.deactivate();
    return noKeyup;
  }
  const index = indexByCode.get(event.code);
  if (index === undefined) {
    return noKeyup;
  }
  const name = names[index];
  console.log(`You pressed down ${name}`);

  function keyup() {
    console.log(`You released ${name}`);
  }
  return keyup;
}

typingKeyboard.addKeydownListener(typingKeydown);
```

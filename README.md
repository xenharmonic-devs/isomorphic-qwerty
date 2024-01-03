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

## Example
This example sets up a typical control flow. Press down keys on your QWERTY keyboard to see their coordinates logged in the console.

Press keys down with 'Shift' to sustain them (nothing triggered on physical release of the key) and press 'backquote' (the key next to the digit '1') to trigger the pending keyup callbacks when you please.

```typescript
import {Keyboard, type CoordinateKeyboardEvent} from 'isomorphic-qwerty'

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

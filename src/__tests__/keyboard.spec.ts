import {describe, it, expect, vi} from 'vitest';
import {CoordinateKeyboardEvent, Keyboard} from '../keyboard';

describe('Isomoprhic QWERTY keyboard', () => {
  it('only triggers once on multiple repeats of an event', () => {
    const keyboard = new Keyboard();
    const keydownSpy = vi.fn();
    const onKeyup = vi.fn();
    function onKeydown(event: CoordinateKeyboardEvent) {
      keydownSpy(event);
      return onKeyup;
    }
    keyboard.addKeydownListener(onKeydown);

    keyboard.keydown({code: 'KeyA'} as KeyboardEvent); // Normal keypress
    keyboard.keydown({code: 'KeyA', repeat: true} as KeyboardEvent); // Synthetic keypress from holding down the key
    keyboard.keydown({code: 'KeyA'} as KeyboardEvent); // The browser misbehaving

    keyboard.keyup({code: 'KeyA'} as KeyboardEvent); // Normal release
    keyboard.keyup({code: 'KeyA'} as KeyboardEvent); // The browser misbehaving

    expect(keydownSpy).toBeCalledWith({code: 'KeyA', coordinates: [0, 2, 1]});
    expect(keydownSpy).toBeCalledTimes(1);
    expect(onKeyup).toBeCalledTimes(1);
  });

  it('has sustain control', () => {
    const keyboard = new Keyboard();
    const keydownSpy = vi.fn();
    const onKeyupQ = vi.fn();
    const onKeyupW = vi.fn();
    let numCalls = 0;
    function onKeydown(event: CoordinateKeyboardEvent) {
      keydownSpy(event);
      if (numCalls++) {
        return onKeyupW;
      }
      return onKeyupQ;
    }
    keyboard.addKeydownListener(onKeydown);

    keyboard.keydown({code: 'KeyQ'} as KeyboardEvent);
    keyboard.keydown({key: 'Shift', code: 'ShiftRight'} as KeyboardEvent);
    keyboard.keydown({code: 'KeyW', shiftKey: true} as KeyboardEvent);

    keyboard.keyup({key: 'Shift', code: 'ShiftRight'} as KeyboardEvent);
    keyboard.keyup({code: 'KeyW'} as KeyboardEvent);
    keyboard.keyup({code: 'KeyQ'} as KeyboardEvent);

    expect(keydownSpy).toBeCalledTimes(2);
    expect(onKeyupQ).toBeCalledTimes(0);
    expect(onKeyupW).toBeCalledTimes(0);

    keyboard.keydown({code: 'KeyW'} as KeyboardEvent);

    expect(onKeyupQ).toBeCalledTimes(0);
    expect(onKeyupW).toBeCalledTimes(1);

    keyboard.deactivate();
    expect(onKeyupQ).toBeCalledTimes(1);
    expect(onKeyupW).toBeCalledTimes(1);
  });

  it('does not remove a different listener when removing an unknown listener', () => {
    const keyboard = new Keyboard();
    const knownListener = vi.fn(() => vi.fn());
    const unknownListener = vi.fn(() => vi.fn());

    keyboard.addKeydownListener(knownListener);
    keyboard.removeEventListener(unknownListener);

    keyboard.keydown({code: 'KeyA'} as KeyboardEvent);

    expect(knownListener).toBeCalledTimes(1);
    expect(unknownListener).toBeCalledTimes(0);
  });

  it('handles non-extensible keyboard event objects', () => {
    const keyboard = new Keyboard();
    const keydownSpy = vi.fn(() => vi.fn());
    keyboard.addKeydownListener(keydownSpy);

    const frozenEvent = Object.freeze({code: 'KeyA'}) as KeyboardEvent;
    expect(() => keyboard.keydown(frozenEvent)).not.toThrow();
    expect(keydownSpy).toBeCalledWith({code: 'KeyA', coordinates: [0, 2, 1]});
  });

  it('can be constructed with autobind in non-browser environments', () => {
    expect(() => new Keyboard(true)).not.toThrow();
  });

  it('throws when listeners return non-function keyup handlers', () => {
    const keyboard = new Keyboard();
    const badListener = vi.fn(() => undefined) as unknown as (
      event: CoordinateKeyboardEvent,
    ) => () => void;
    keyboard.addKeydownListener(badListener);

    expect(() => keyboard.keydown({code: 'KeyA'} as KeyboardEvent)).toThrow(
      TypeError,
    );
  });
});

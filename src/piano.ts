import {Coords3D, codeByCoords} from './coordinates';

/**
 * Convert a linear sequence of note types into a piano-style layout
 * @param ys Desired vertical coordinates for the notes/keys
 * @param shifts Adjustments to the first three rows. A shift difference of 1 puts a row behind the next row. Defaults to `[0, 0, 0]` so that the all rows are ahead of the rows below.
 * @returns `indexByCode`: a `Map` instance from keycodes to note indices. `coordsByIndex`: location of each note on layer 1 (the one with QWERTY/ASDF keys).
 */
export function pianoMap(ys: number[], shifts?: number[]) {
  // We skip Backquote because it's not connected to KeyQ.
  const nextXs = [0, 0, 0, -1];
  shifts ??= [0, 0, 0];
  shifts[0] ??= 0;
  shifts[1] ??= 0;
  shifts[2] ??= 0;
  const coordss: Coords3D[] = [];
  for (const y of ys) {
    const x = nextXs[y];
    coordss.push([x, y, 1]);
    nextXs[y]++;

    // == Sync everything vertically
    // A is before Z. S is after Z.
    nextXs[2] = Math.max(nextXs[2], nextXs[3] - shifts[2]);
    // Q before A. W is after A.
    nextXs[1] = Math.max(nextXs[1], nextXs[2] - shifts[1]);
    // 1 is befor Q. 2 is after Q.
    nextXs[0] = Math.max(nextXs[0], nextXs[1] - shifts[0]);
    // Sync the other way too but with less "force".
    nextXs[1] = Math.max(nextXs[1], nextXs[0] + shifts[0] - 1);
    nextXs[2] = Math.max(nextXs[2], nextXs[1] + shifts[1] - 1);
    nextXs[3] = Math.max(nextXs[3], nextXs[2] + shifts[1] - 1);
  }

  const indexByCode = new Map<string, number>();
  const coordsByIndex: (Coords3D | undefined)[] = [];
  let i = 0;
  for (const xyz of coordss) {
    const code = codeByCoords(xyz);
    if (code === undefined) {
      coordsByIndex.push(undefined);
    } else {
      indexByCode.set(code, i);
      coordsByIndex.push(xyz);
    }
    i++;
  }
  return {
    coordsByIndex,
    indexByCode,
  };
}

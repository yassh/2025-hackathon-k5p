import * as migration_20250710_221953 from './20250710_221953';
import * as migration_20250710_224542 from './20250710_224542';
import * as migration_20250710_234745 from './20250710_234745';

export const migrations = [
  {
    up: migration_20250710_221953.up,
    down: migration_20250710_221953.down,
    name: '20250710_221953',
  },
  {
    up: migration_20250710_224542.up,
    down: migration_20250710_224542.down,
    name: '20250710_224542',
  },
  {
    up: migration_20250710_234745.up,
    down: migration_20250710_234745.down,
    name: '20250710_234745'
  },
];

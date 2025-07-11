import * as migration_20250711_005012 from './20250711_005012';

export const migrations = [
  {
    up: migration_20250711_005012.up,
    down: migration_20250711_005012.down,
    name: '20250711_005012'
  },
];

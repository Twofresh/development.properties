import * as migration_20260904_162305_initial from './20260904_162305_initial';

export const migrations = [
  {
    up: migration_20260904_162305_initial.up,
    down: migration_20260904_162305_initial.down,
    name: '20260904_162305_initial'
  },
];

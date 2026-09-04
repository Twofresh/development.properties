import * as migration_20260904_154422_initial from './20260904_154422_initial';

export const migrations = [
  {
    up: migration_20260904_154422_initial.up,
    down: migration_20260904_154422_initial.down,
    name: '20260904_154422_initial'
  },
];

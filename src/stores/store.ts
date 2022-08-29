import { useLogStore } from '@/stores/logStore';
import { useGameStore } from '@/stores/gameStore';
import { useActionStore } from '@/stores/actionStore';
import { useResourceStore } from '@/stores/resourceStore';
import { useDropTableStore } from '@/stores/dropTableStore';
import { useProgressionStore } from '@/stores/flagStore';

export const LogStore = useLogStore;
export const GameStore = useGameStore;
export const FlagStore = useProgressionStore;
export const ActionStore = useActionStore;
export const ResourceStore = useResourceStore;
export const DropTableStore = useDropTableStore;

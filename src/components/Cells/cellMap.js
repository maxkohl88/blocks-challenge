import { Player } from './Player/Player'
import { Exit } from './Exit/Exit'
import { BasicTile } from './BasicTile/BasicTile'
import { Wall } from './Wall/Wall'
import { Film } from './Film/Film'
import { Chip } from './Chip/Chip'

export const cellMap = {
  player: Player,
  exit: Exit,
  wall: Wall,
  'basic-tile': BasicTile,
  film: Film,
  chip: Chip
}

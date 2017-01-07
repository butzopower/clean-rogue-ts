import { Direction } from "../entities/direction";
import { Player } from "../entities/player";
import { Room } from "../entities/room";
import { Observable } from "@reactivex/rxjs";

export interface MovePlayerFail {
  succeeded: false;
}

export interface MovePlayerSuccess {
  succeeded: true;
  player: Player;
}

export type MovePlayerResult = MovePlayerSuccess | MovePlayerFail;

export function movePlayer(direction: Direction, player: Player, room: Room): Observable<MovePlayerResult> {
  if (room.width > 1) {
    let newPlayer = translatePlayerPosition(direction, player);
    return Observable.of<MovePlayerResult>({succeeded: true, player: newPlayer});
  } else {
    return Observable.of<MovePlayerResult>({succeeded: false});
  }
}

function translatePlayerPosition(direction: Direction, player: Player): Player {
  return addPosition(player, directionToPositionDeltas(direction));
}

function addPosition(original: Player, delta: Player): Player {
  return {x: original.x + delta.x, y: original.y + delta.y};
}

function directionToPositionDeltas(direction: Direction): Player {
  switch (direction) {
    case Direction.N: return {x: 0, y: -1};
    case Direction.E: return {x: 1, y: 0};
    case Direction.S: return {x: 0, y: 1};
    case Direction.W: return {x: -1, y: 0};
  }
}

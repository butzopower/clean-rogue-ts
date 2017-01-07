import { Direction } from "../entities/direction";
import { Player } from "../entities/player";
import { Room } from "../entities/room";
import { Observable } from "@reactivex/rxjs";

export function movePlayer(direction: Direction, player: Player, room: Room): Observable<MovePlayerResult> {
  if (room.width > 1) {
    return Observable.of<MovePlayerResult>({succeeded: true, player: {x: 1, y: 0}});
  } else {
    return Observable.of<MovePlayerResult>({succeeded: false});
  }
}

export interface MovePlayerFail {
  succeeded: false;
}

export interface MovePlayerSuccess {
  succeeded: true;
  player: Player;
}

export type MovePlayerResult = MovePlayerSuccess | MovePlayerFail;

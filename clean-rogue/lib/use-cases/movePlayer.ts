import { Direction } from "../entities/direction";
import { Player } from "../entities/player";
import { Room } from "../entities/room";
import { Observable } from "@reactivex/rxjs";

export function movePlayer(direction: Direction, player: Player, room: Room): Observable<MovePlayerResult> {
  if (room.width > 1) {
    let action: MovePlayerSuccess = {succeeded: true, player: {x: 1, y: 0}};
    return Observable.of(action);
  } else {
    return Observable.of({succeeded: false});
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

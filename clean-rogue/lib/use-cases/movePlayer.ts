import { Direction } from "../entities/direction";
import { Player } from "../entities/player";
import { Room } from "../entities/room";
import { Observable } from "@reactivex/rxjs";

export function movePlayer(direction: Direction, player: Player, room: Room): Observable<MovePlayerResult> {
  return Observable.of({succeeded: false});
}

export type MovePlayerResult = MovePlayerFailed;

export interface MovePlayerFailed {
  succeeded: false;
}
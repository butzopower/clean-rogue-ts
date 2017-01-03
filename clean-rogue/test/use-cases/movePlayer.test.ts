import { expect } from "chai";
import { Direction } from "../../lib/entities/direction";
import { Player } from "../../lib/entities/player";
import { Room } from "../../lib/entities/room";
import { movePlayer, MovePlayerResult } from "../../lib/use-cases/movePlayer";

describe("moving a player", () => {
  it("should not allow a player to move in a 1x1 room", (done) => {
    let player: Player = { x: 0, y: 0 };
    let room: Room = { width: 1, height: 1 };

    movePlayer(Direction.N, player, room).subscribe((result: MovePlayerResult) => {
      expect(result.succeeded).to.equal(false);
      done();
    });
  });

  it("should move a player east in a 1x3 room", (done) => {
    let player: Player = { x: 0, y: 0 };
    let room: Room = { width: 3, height: 1 };

    movePlayer(Direction.E, player, room).subscribe((result: MovePlayerResult) => {
      if (result.succeeded) {
        expect(result.player.x).to.equal(1);
        expect(result.player.y).to.equal(0);
        done();
      } else {
        done("expected move player to succeed but did not");
      }
    });
  });
});

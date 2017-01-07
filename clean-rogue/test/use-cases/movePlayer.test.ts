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

  it("should move a player east in a 1x2 room", (done) => {
    let player: Player = { x: 0, y: 0 };
    let room: Room = { width: 2, height: 1 };

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

  [
    {direction: Direction.N, expectedPosition: {x: 1, y: 0}},
    {direction: Direction.E, expectedPosition: {x: 2, y: 1}},
    {direction: Direction.S, expectedPosition: {x: 1, y: 2}},
    {direction: Direction.W, expectedPosition: {x: 0, y: 1}},
  ].forEach((directionTest) => {
    let directionName = Direction[directionTest.direction];
    it(`should let a centered player move in direction ${directionName} in a 3x3 room`, (done) => {
      let player = { x: 1, y: 1 };
      let room = { width: 3, height: 3 };

      movePlayer(directionTest.direction, player, room).subscribe((result: MovePlayerResult) => {
        if (result.succeeded) {
          expect(result.player).to.eql(directionTest.expectedPosition);
          done();
        } else {
          done("expected move player to succeed but did not");
        }
      });
    });
  });
});

/**
 * Created by JFL on 12/11/2014.
 */
var assert = require("assert");
var GameOfLifeComputerPerspectiveNamespace = require("../lib/GameOfLifeComputerPerspective.js");

describe('GameOfLifeComputerPerspective', function() {
    describe('Play the game of life focusing on the cell in the center.', function () {
        it('a cell surrounded by less than two living cells dies.', function () {
            var universe = [[0, 0, 0]
                , [0, 1, 0]
                , [0, 0, 0]];
            GameOfLifeComputerPerspectiveNamespace.playTheGameOfLife(universe);
            assert.equal(universe[1][1], 0);
        });

        it('a cell surrounded by more than four living cells dies.', function () {
            var universe = [[1, 1, 1]
                , [0, 1, 1]
                , [0, 0, 0]];
            GameOfLifeComputerPerspectiveNamespace.playTheGameOfLife(universe);
            assert.equal(universe[1][1], 0);
        });

        it('a cell surrounded by exactly three cells continues to live', function () {
            var universe = [[1, 1, 1]
                , [0, 1, 0]
                , [0, 0, 0]];
            GameOfLifeComputerPerspectiveNamespace.playTheGameOfLife(universe);
            assert.equal(universe[1][1], 1);
        });

        it('a dead cell surrounded by exactly three cells starts a new life', function () {
            var universe = [[1, 1, 1]
                , [0, 0, 0]
                , [0, 0, 0]];
            GameOfLifeComputerPerspectiveNamespace.playTheGameOfLife(universe);
            assert.equal(universe[1][1], 1);
        });

        it('a cell surrounded by exactly two cells continues to live', function () {
            var universe = [[1, 1, 0]
                , [0, 1, 0]
                , [0, 0, 0]];
            GameOfLifeComputerPerspectiveNamespace.playTheGameOfLife(universe);
            assert.equal(universe[1][1], 1);
        });
    });
});
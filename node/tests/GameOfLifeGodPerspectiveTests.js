/**
 * Created by JFL on 12/11/2014.
 */

var assert = require("assert");
var GOLGP = require("../lib/GameOfLifeGodPerspective.js");

describe('GameOfLifeGodPerspective', function() {
    it('God exists.', function () {
        var god = new GOLGP.God();
        assert.notEqual(god, null);
    });

    it('It can create a universe.', function () {
        var god = new GOLGP.God();
        assert.notEqual(god.createUniverse(), null);
    });

    it('It can create a universe with 2 dimension of size 3 X 3.', function () {
        var god = new GOLGP.God();
        var universe = god.createUniverse();
        assert.equal(universe.firstDimensionSize(), 3);
        assert.equal(universe.secondDimensionSize(), 3);
    });

    it('The universe is observable but empty at the beginning.', function () {
        var god = new GOLGP.God();
        var universe = god.createUniverse();
        for (var firstDimensionIndex = 0;
             firstDimensionIndex < universe.firstDimensionSize();
             firstDimensionIndex++) {
            for (var secondDimensionIndex = 0;
                 secondDimensionIndex < universe.secondDimensionSize();
                 secondDimensionIndex++) {
                assert.equal(universe.tellsWhatIsInPoint(firstDimensionIndex, secondDimensionIndex), null);
            }
        }
    });

    it('The universe is modifiable and can host cells', function () {
        var god = new GOLGP.God();
        var universe = god.createUniverse();
        universe.hostsAtPoint(0, 0, new Cell());
        assert.notEqual(universe.tellsWhatIsInPoint(0, 0), null);
    });


    it('The universe is modifiable and can host cells anywhere', function () {
        var god = new GOLGP.God();
        var universe = god.createUniverse();
        var randomFirstDimensionIndex = Math.floor(Math.random() * universe.firstDimensionSize());
        var randomSecondDimensionIndex = Math.floor(Math.random() * universe.secondDimensionSize());
        universe.hostsAtPoint(randomFirstDimensionIndex,
            randomSecondDimensionIndex,
            new Cell());
        assert.notEqual(universe.tellsWhatIsInPoint(randomFirstDimensionIndex, randomSecondDimensionIndex), null);
        for (var firstDimensionIndex = 0;
             firstDimensionIndex < universe.firstDimensionSize();
             firstDimensionIndex++) {
            for (var secondDimensionIndex = 0;
                 secondDimensionIndex < universe.secondDimensionSize();
                 secondDimensionIndex++) {
                var isThePointHostingTheCell = firstDimensionIndex == randomFirstDimensionIndex
                    && secondDimensionIndex == randomSecondDimensionIndex;
                if (!isThePointHostingTheCell)
                    assert.equal(universe.tellsWhatIsInPoint(firstDimensionIndex, secondDimensionIndex), null);
            }
        }
    });

    describe("The universe plays the game of life focusing on the cell in the middle.", function () {
        it('Rule 1 : the cell in the center die when there is less than 2 cells around.', function () {
            var god = new GOLGP.God();
            var universe = god.createUniverse();
            var centerOfFirstDimension = 1;
            var centerOfSecondDimension = 1;
            universe.hostsAtPoint(centerOfFirstDimension,
                centerOfSecondDimension,
                new GOLGP.Cell());
            var randomFirstDimensionIndex = Math.floor(Math.random() * universe.firstDimensionSize());
            var randomSecondDimensionIndex = Math.floor(Math.random() * universe.secondDimensionSize());
            universe.hostsAtPoint(randomFirstDimensionIndex,
                randomSecondDimensionIndex,
                new GOLGP.Cell());
            universe.playTheGameOfLifeAtPoint(centerOfFirstDimension, centerOfSecondDimension);
            assert.equal(universe.tellsWhatIsInPoint(centerOfFirstDimension, centerOfSecondDimension), null);
        });

        it('Rule 2 : the cell in the center lives when there exactly three cells around.', function () {
            var god = new GOLGP.God();
            var universe = god.createUniverse();
            var centerOfFirstDimension = 1;
            var centerOfSecondDimension = 1;
            universe.hostsAtPoint(centerOfFirstDimension,
                centerOfSecondDimension,
                new GOLGP.Cell());

            var beginningOfFirstDimension = 0;
            var beginningOfSecondDimension = 0;
            var endOfSecondDimension = 2;
            universe.hostsAtPoint(beginningOfFirstDimension, beginningOfSecondDimension, new GOLGP.Cell());
            universe.hostsAtPoint(beginningOfFirstDimension, centerOfSecondDimension, new GOLGP.Cell());
            universe.hostsAtPoint(beginningOfFirstDimension, endOfSecondDimension, new GOLGP.Cell());

            universe.playTheGameOfLifeAtPoint(centerOfFirstDimension, centerOfSecondDimension);
            assert.notEqual(universe.tellsWhatIsInPoint(centerOfFirstDimension,
                centerOfSecondDimension), null);
        });

        it('Rule 3 : the cell in the center dies when there are more than three cells around.', function () {
            var god = new GOLGP.God();
            var universe = god.createUniverse();
            var centerOfFirstDimension = 1;
            var centerOfSecondDimension = 1;
            universe.hostsAtPoint(centerOfFirstDimension,
                centerOfSecondDimension,
                new Cell());

            var beginningOfFirstDimension = 0;
            var beginningOfSecondDimension = 0;
            var endOfSecondDimension = 2;
            universe.hostsAtPoint(beginningOfFirstDimension, beginningOfSecondDimension, new GOLGP.Cell());
            universe.hostsAtPoint(beginningOfFirstDimension, centerOfSecondDimension, new GOLGP.Cell());
            universe.hostsAtPoint(beginningOfFirstDimension, endOfSecondDimension, new GOLGP.Cell());
            universe.hostsAtPoint(centerOfFirstDimension, beginningOfSecondDimension, new GOLGP.Cell());

            universe.playTheGameOfLifeAtPoint(centerOfFirstDimension, centerOfSecondDimension);
            assert.equal(universe.tellsWhatIsInPoint(centerOfFirstDimension,
                centerOfSecondDimension), null);
        });

        it('Rule 4 : a new cell appears in the center when there are exactly three cells around.', function () {
            var god = new GOLGP.God();
            var universe = god.createUniverse();
            var centerOfFirstDimension = 1;
            var centerOfSecondDimension = 1;

            var beginningOfFirstDimension = 0;
            var beginningOfSecondDimension = 0;
            var endOfSecondDimension = 2;
            universe.hostsAtPoint(beginningOfFirstDimension, beginningOfSecondDimension, new GOLGP.Cell());
            universe.hostsAtPoint(beginningOfFirstDimension, centerOfSecondDimension, new GOLGP.Cell());
            universe.hostsAtPoint(beginningOfFirstDimension, endOfSecondDimension, new GOLGP.Cell());

            universe.playTheGameOfLifeAtPoint(centerOfFirstDimension, centerOfSecondDimension);
            assert.notEqual(universe.tellsWhatIsInPoint(centerOfFirstDimension, centerOfSecondDimension), null);
        });

        it('Modified Rule 2 : the cell in the center stays the same when there are 3 cells around.', function () {
            var god = new GOLGP.God();
            var universe = god.createUniverse();
            var centerOfFirstDimension = 1;
            var centerOfSecondDimension = 1;
            var cell = new Cell();
            universe.hostsAtPoint(centerOfFirstDimension,
                centerOfSecondDimension,
                cell);

            var beginningOfFirstDimension = 0;
            var beginningOfSecondDimension = 0;
            var endOfSecondDimension = 2;
            universe.hostsAtPoint(beginningOfFirstDimension, beginningOfSecondDimension, new GOLGP.Cell());
            universe.hostsAtPoint(beginningOfFirstDimension, centerOfSecondDimension, new GOLGP.Cell());
            universe.hostsAtPoint(beginningOfFirstDimension, endOfSecondDimension, new GOLGP.Cell());

            universe.playTheGameOfLifeAtPoint(centerOfFirstDimension, centerOfSecondDimension);
            assert.equal(universe.tellsWhatIsInPoint(centerOfFirstDimension, centerOfSecondDimension), cell);
        });

        it('Rule 2 modified: the cell in the center lives when there exactly two cells around.', function () {
            var god = new GOLGP.God();
            var universe = god.createUniverse();
            var centerOfFirstDimension = 1;
            var centerOfSecondDimension = 1;
            universe.hostsAtPoint(centerOfFirstDimension,
                centerOfSecondDimension,
                new GOLGP.Cell());

            var beginningOfFirstDimension = 0;
            var beginningOfSecondDimension = 0;
            universe.hostsAtPoint(beginningOfFirstDimension, beginningOfSecondDimension, new GOLGP.Cell());
            universe.hostsAtPoint(beginningOfFirstDimension, centerOfSecondDimension, new GOLGP.Cell());

            universe.playTheGameOfLifeAtPoint(centerOfFirstDimension, centerOfSecondDimension);
            assert.notEqual(universe.tellsWhatIsInPoint(centerOfFirstDimension,
                centerOfSecondDimension), null);
        });
    });
});
/**
 * Created by JFL on 12/11/2014.
 */

var assert = require("assert");
var GOLSCCP = require("../lib/GameOfLifeSelfConsciousCellPerspective.js");

describe('GameOfLifeSelfConsciousCellPerspective', function(){
    it('Cells are created living by default', function() {
        var cell = new GOLSCCP.Cell();
        assert.notEqual(cell, null);
        assert.equal(cell.isLiving, true);
    });

    it('Cells could be created dead', function() {
        var living = false;
        var cell = new GOLSCCP.Cell(living);
        assert.notEqual(cell,null);
        assert.equal(cell.isLiving,false);
    });

    it('Cells can discover their direct environment.', function() {
        var cell = new GOLSCCP.Cell();
        var topLeft = new GOLSCCP.Cell(true);
        var topCenter = new GOLSCCP.Cell(false);
        var topRight = new GOLSCCP.Cell(false);
        var centerLeft = new GOLSCCP.Cell(false);
        var centerRight = new GOLSCCP.Cell(false);
        var bottomLeft = new GOLSCCP.Cell(false);
        var bottomCenter = new GOLSCCP.Cell(false);
        var bottomRight = new GOLSCCP.Cell(false);

        cell.discoversDirectEnvironment(topLeft, topCenter, topRight,
            centerLeft, centerRight,
            bottomLeft, bottomCenter, bottomRight);
    });

    it('A living Cell can live for while but then die when there is less than 2 '
    + 'cells in its direct environment.', function() {
        var cell = new GOLSCCP.Cell();
        var topLeft = new GOLSCCP.Cell(true);
        var topCenter = new GOLSCCP.Cell(false);
        var topRight = new GOLSCCP.Cell(false);
        var centerLeft = new GOLSCCP.Cell(false);
        var centerRight = new GOLSCCP.Cell(false);
        var bottomLeft = new GOLSCCP.Cell(false);
        var bottomCenter = new GOLSCCP.Cell(false);
        var bottomRight = new GOLSCCP.Cell(false);

        cell.discoversDirectEnvironment(topLeft, topCenter, topRight,
            centerLeft, centerRight,
            bottomLeft, bottomCenter, bottomRight);

        cell.livesForAWhile();
        assert.equal(cell.isLiving, false);
    });

    it('A living Cell can live for while but then die when there is more than 3 '
    + 'cells in its direct environment.', function() {
        var cell = new GOLSCCP.Cell();
        var topLeft = new GOLSCCP.Cell(true);
        var topCenter = new GOLSCCP.Cell(true);
        var topRight = new GOLSCCP.Cell(true);
        var centerLeft = new GOLSCCP.Cell(true);
        var centerRight = new GOLSCCP.Cell(false);
        var bottomLeft = new GOLSCCP.Cell(false);
        var bottomCenter = new GOLSCCP.Cell(false);
        var bottomRight = new GOLSCCP.Cell(false);

        cell.discoversDirectEnvironment(topLeft, topCenter, topRight,
            centerLeft, centerRight,
            bottomLeft, bottomCenter, bottomRight);

        cell.livesForAWhile();
        assert.equal(cell.isLiving, false);
    });

    it('A living Cell can live for while and continue to live when surrounded by 3 living cells '
    + 'cells in its direct environment.', function() {
        var cell = new GOLSCCP.Cell();
        var topLeft = new GOLSCCP.Cell(true);
        var topCenter = new GOLSCCP.Cell(true);
        var topRight = new GOLSCCP.Cell(true);
        var centerLeft = new GOLSCCP.Cell(false);
        var centerRight = new GOLSCCP.Cell(false);
        var bottomLeft = new GOLSCCP.Cell(false);
        var bottomCenter = new GOLSCCP.Cell(false);
        var bottomRight = new GOLSCCP.Cell(false);

        cell.discoversDirectEnvironment(topLeft, topCenter, topRight,
            centerLeft, centerRight,
            bottomLeft, bottomCenter, bottomRight);

        cell.livesForAWhile();
        assert.equal(cell.isLiving, true);
    });

    it('A dead Cell can live as zombie for while and live for real when surrounded by 3 living cells '
    + 'cells in its direct environment.', function() {
        var cell = new GOLSCCP.Cell(false);
        var topLeft = new GOLSCCP.Cell(true);
        var topCenter = new GOLSCCP.Cell(true);
        var topRight = new GOLSCCP.Cell(true);
        var centerLeft = new GOLSCCP.Cell(false);
        var centerRight = new GOLSCCP.Cell(false);
        var bottomLeft = new GOLSCCP.Cell(false);
        var bottomCenter = new GOLSCCP.Cell(false);
        var bottomRight = new GOLSCCP.Cell(false);

        cell.discoversDirectEnvironment(topLeft, topCenter, topRight,
            centerLeft, centerRight,
            bottomLeft, bottomCenter, bottomRight);

        cell.livesForAWhile();
        assert.equal(cell.isLiving,true);
    });
});

/**
 * Created by JFL on 12/11/2014.
 */
God = function(){
    this.createUniverse = function() {
        return new Universe();
    }
}

Universe= function() {
    var structureOfTheUniverse = [[null, null, null], [null, null, null], [null, null, null]];

    this.firstDimensionSize = function () {
        return 3;
    }

    this.secondDimensionSize = function () {
        return 3;
    }

    this.tellsWhatIsInPoint = function (firstDimensionIndex, secondDimensionIndex) {
        return structureOfTheUniverse[firstDimensionIndex][secondDimensionIndex];
    }

    this.hostsAtPoint = function (firstDimensionIndex, secondDimensionIndex, cellFromGod) {
        structureOfTheUniverse[firstDimensionIndex][secondDimensionIndex] = cellFromGod;
    }

    this.playTheGameOfLifeAtPoint = function (firstDimensionIndex, secondDimensionIndex) {
        var beginningOfFirstDimension = 0;
        var centerOfFirstDimension = 1;
        var endOfFirstDimension = 2;
        var beginningOfSecondDimension = 0;
        var centerOfSecondDimension = 1;
        var endOfSecondDimension = 2;
        var numberOfLivingCellsAround =
            (structureOfTheUniverse[beginningOfFirstDimension][beginningOfSecondDimension] !== null)
            + (structureOfTheUniverse[beginningOfFirstDimension][centerOfSecondDimension] !== null)
            + (structureOfTheUniverse[beginningOfFirstDimension][endOfSecondDimension] !== null)
            + (structureOfTheUniverse[centerOfFirstDimension][beginningOfSecondDimension] !== null)
            + (structureOfTheUniverse[centerOfFirstDimension][endOfSecondDimension] !== null)
            + (structureOfTheUniverse[endOfFirstDimension][beginningOfSecondDimension] !== null)
            + (structureOfTheUniverse[endOfFirstDimension][centerOfSecondDimension] !== null)
            + (structureOfTheUniverse[endOfFirstDimension][endOfSecondDimension] !== null);
        if (numberOfLivingCellsAround < 2 || numberOfLivingCellsAround > 3)
            structureOfTheUniverse[firstDimensionIndex][secondDimensionIndex] = null;
        else if (numberOfLivingCellsAround === 3
            && structureOfTheUniverse[firstDimensionIndex][secondDimensionIndex] === null)
            structureOfTheUniverse[firstDimensionIndex][secondDimensionIndex] = new Cell();
    }
}

Cell = function()
{
}

exports.Cell = Cell;
exports.God = God;
/**
 * Created by JFL on 12/9/2014.
 */

// The tests.
it('God exists.', function() {
    var god = new God();
    expect(god).not.toBeNull();
});

it('It can create a universe.', function() {
    var god = new God();
    expect(god.createUniverse()).not.toBeNull();
});

it('It can create a universe with 2 dimension of size 3 X 3.', function() {
    var god = new God();
    var universe = god.createUniverse();
    expect(universe.firstDimensionSize()).toBe(3);
    expect(universe.secondDimensionSize()).toBe(3);
});

it('The universe is observable but empty at the beginning.', function() {
    var god = new God();
    var universe = god.createUniverse();
    for(var firstDimensionIndex = 0;
        firstDimensionIndex<universe.firstDimensionSize();
        firstDimensionIndex++)
    {
        for(var secondDimensionIndex = 0;
            secondDimensionIndex<universe.secondDimensionSize();
            secondDimensionIndex++)
        {
            expect(universe.tellsWhatIsInPoint(firstDimensionIndex, secondDimensionIndex)).toBeNull();
        }
    }
});

it('The universe is modifiable and can host cells', function() {
    var god = new God();
    var universe = god.createUniverse();
    universe.hostsAtPoint(0, 0, new Cell());
    expect(universe.tellsWhatIsInPoint(0, 0)).not.toBeNull();
});


it('The universe is modifiable and can host cells anywhere', function() {
    var god = new God();
    var universe = god.createUniverse();
    var randomFirstDimensionIndex = Math.floor(Math.random() * universe.firstDimensionSize());
    var randomSecondDimensionIndex = Math.floor(Math.random() * universe.secondDimensionSize());
    universe.hostsAtPoint(randomFirstDimensionIndex,
        randomSecondDimensionIndex,
        new Cell());
    expect(universe.tellsWhatIsInPoint(randomFirstDimensionIndex,
        randomSecondDimensionIndex)).not.toBeNull();
    for(var firstDimensionIndex = 0;
        firstDimensionIndex<universe.firstDimensionSize();
        firstDimensionIndex++)
    {
        for(var secondDimensionIndex = 0;
            secondDimensionIndex<universe.secondDimensionSize();
            secondDimensionIndex++)
        {
            var isThePointHostingTheCell = firstDimensionIndex == randomFirstDimensionIndex
                && secondDimensionIndex == randomSecondDimensionIndex;
            if(!isThePointHostingTheCell)
                expect(universe.tellsWhatIsInPoint(firstDimensionIndex, secondDimensionIndex)).toBeNull();
        }
    }
});

describe("The universe plays the game of life focusing on the cell in the middle.", function()
{
    it('Rule 1 : the cell in the center die when there is less than 2 cells around.', function() {
        var god = new God();
        var universe = god.createUniverse();
        var centerOfFirstDimension = 1;
        var centerOfSecondDimension = 1;
        universe.hostsAtPoint(centerOfFirstDimension,
            centerOfSecondDimension,
            new Cell());
        var randomFirstDimensionIndex = Math.floor(Math.random() * universe.firstDimensionSize());
        var randomSecondDimensionIndex = Math.floor(Math.random() * universe.secondDimensionSize());
        universe.hostsAtPoint(randomFirstDimensionIndex,
            randomSecondDimensionIndex,
            new Cell());
        universe.playTheGameOfLifeAtPoint(centerOfFirstDimension, centerOfSecondDimension);
        expect(universe.tellsWhatIsInPoint(centerOfFirstDimension,
            centerOfSecondDimension)).toBeNull();
    });

    it('Rule 2 : the cell in the center lives when there exactly three cells around.', function() {
        var god = new God();
        var universe = god.createUniverse();
        var centerOfFirstDimension = 1;
        var centerOfSecondDimension = 1;
        universe.hostsAtPoint(centerOfFirstDimension,
            centerOfSecondDimension,
            new Cell());

        var beginningOfFirstDimension = 0;
        var beginningOfSecondDimension = 0;
        var endOfSecondDimension = 2;
        universe.hostsAtPoint(beginningOfFirstDimension, beginningOfSecondDimension,new Cell());
        universe.hostsAtPoint(beginningOfFirstDimension, centerOfSecondDimension,new Cell());
        universe.hostsAtPoint(beginningOfFirstDimension, endOfSecondDimension,new Cell());

        universe.playTheGameOfLifeAtPoint(centerOfFirstDimension, centerOfSecondDimension);
        expect(universe.tellsWhatIsInPoint(centerOfFirstDimension,
            centerOfSecondDimension)).not.toBeNull();
    });

    it('Rule 3 : the cell in the center dies when there are more than three cells around.', function() {
        var god = new God();
        var universe = god.createUniverse();
        var centerOfFirstDimension = 1;
        var centerOfSecondDimension = 1;
        universe.hostsAtPoint(centerOfFirstDimension,
            centerOfSecondDimension,
            new Cell());

        var beginningOfFirstDimension = 0;
        var beginningOfSecondDimension = 0;
        var endOfSecondDimension = 2;
        universe.hostsAtPoint(beginningOfFirstDimension, beginningOfSecondDimension,new Cell());
        universe.hostsAtPoint(beginningOfFirstDimension, centerOfSecondDimension,new Cell());
        universe.hostsAtPoint(beginningOfFirstDimension, endOfSecondDimension,new Cell());
        universe.hostsAtPoint(centerOfFirstDimension, beginningOfSecondDimension,new Cell());

        universe.playTheGameOfLifeAtPoint(centerOfFirstDimension, centerOfSecondDimension);
        expect(universe.tellsWhatIsInPoint(centerOfFirstDimension,
            centerOfSecondDimension)).toBeNull();
    });

    it('Rule 4 : a new cell appears in the center when there are exactly three cells around.', function() {
        var god = new God();
        var universe = god.createUniverse();
        var centerOfFirstDimension = 1;
        var centerOfSecondDimension = 1;

        var beginningOfFirstDimension = 0;
        var beginningOfSecondDimension = 0;
        var endOfSecondDimension = 2;
        universe.hostsAtPoint(beginningOfFirstDimension, beginningOfSecondDimension,new Cell());
        universe.hostsAtPoint(beginningOfFirstDimension, centerOfSecondDimension,new Cell());
        universe.hostsAtPoint(beginningOfFirstDimension, endOfSecondDimension,new Cell());

        universe.playTheGameOfLifeAtPoint(centerOfFirstDimension, centerOfSecondDimension);
        expect(universe.tellsWhatIsInPoint(centerOfFirstDimension,
            centerOfSecondDimension)).not.toBeNull();
    });

    it('Modified Rule 2 : the cell in the center stays the same when there are 3 cells around.', function() {
        var god = new God();
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
        universe.hostsAtPoint(beginningOfFirstDimension, beginningOfSecondDimension,new Cell());
        universe.hostsAtPoint(beginningOfFirstDimension, centerOfSecondDimension,new Cell());
        universe.hostsAtPoint(beginningOfFirstDimension, endOfSecondDimension,new Cell());

        universe.playTheGameOfLifeAtPoint(centerOfFirstDimension, centerOfSecondDimension);
        expect(universe.tellsWhatIsInPoint(centerOfFirstDimension,
            centerOfSecondDimension) === cell).toBe(true);
    });

    it('Rule 2 modified: the cell in the center lives when there exactly two cells around.', function() {
        var god = new God();
        var universe = god.createUniverse();
        var centerOfFirstDimension = 1;
        var centerOfSecondDimension = 1;
        universe.hostsAtPoint(centerOfFirstDimension,
            centerOfSecondDimension,
            new Cell());

        var beginningOfFirstDimension = 0;
        var beginningOfSecondDimension = 0;
        universe.hostsAtPoint(beginningOfFirstDimension, beginningOfSecondDimension,new Cell());
        universe.hostsAtPoint(beginningOfFirstDimension, centerOfSecondDimension,new Cell());

        universe.playTheGameOfLifeAtPoint(centerOfFirstDimension, centerOfSecondDimension);
        expect(universe.tellsWhatIsInPoint(centerOfFirstDimension,
            centerOfSecondDimension)).not.toBeNull();
    });
});




// The production source code.
function God(){
    this.createUniverse = function(){
        return new Universe();
    }
}

function Universe(){
    var structureOfTheUniverse = [[null,null,null],[null,null,null],[null,null,null]];

    this.firstDimensionSize = function (){
        return 3;
    }

    this.secondDimensionSize = function (){
        return 3;
    }

    this.tellsWhatIsInPoint = function(firstDimensionIndex, secondDimensionIndex){
        return structureOfTheUniverse[firstDimensionIndex][secondDimensionIndex];
    }

    this.hostsAtPoint = function(firstDimensionIndex, secondDimensionIndex, cellFromGod){
        structureOfTheUniverse[firstDimensionIndex][secondDimensionIndex] = cellFromGod;
    }

    this.playTheGameOfLifeAtPoint = function(firstDimensionIndex, secondDimensionIndex)
    {
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
        if(numberOfLivingCellsAround < 2 || numberOfLivingCellsAround > 3)
            structureOfTheUniverse[firstDimensionIndex][secondDimensionIndex] = null;
        else if(numberOfLivingCellsAround === 3
            && structureOfTheUniverse[firstDimensionIndex][secondDimensionIndex] === null)
            structureOfTheUniverse[firstDimensionIndex][secondDimensionIndex] = new Cell();
    }
}

function Cell()
{

}


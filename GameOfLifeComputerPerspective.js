/**
 * Created by JFL on 12/9/2014.
 */

// The tests.
it('the universe is an array of bits', function() {
    var universe = [[0,0,0]
                   ,[0,1,0]
                   ,[0,0,0]];
});

describe ('Play the game of life focusing on the cell in the center.', function(){
    it('a cell surrounded by less than two living cells dies.', function() {
        var universe = [[0,0,0]
                       ,[0,1,0]
                       ,[0,0,0]];
        playTheGameOfLife(universe);
        expect(universe[1][1]).toBe(0);
    });

    it('a cell surrounded by more than four living cells dies.', function() {
        var universe = [[1,1,1]
                       ,[0,1,1]
                       ,[0,0,0]];
        playTheGameOfLife(universe);
        expect(universe[1][1]).toBe(0);
    });

    it('a cell surrounded by exactly three cells continues to live', function() {
        var universe = [[1,1,1]
                       ,[0,1,0]
                       ,[0,0,0]];
        playTheGameOfLife(universe);
        expect(universe[1][1]).toBe(1);
    });

    it('a dead cell surrounded by exactly three cells starts a new life', function() {
        var universe = [[1,1,1]
                       ,[0,0,0]
                       ,[0,0,0]];
        playTheGameOfLife(universe);
        expect(universe[1][1]).toBe(1);
    });

    it('a cell surrounded by exactly two cells continues to live', function() {
        var universe = [[1,1,0]
            ,[0,1,0]
            ,[0,0,0]];
        playTheGameOfLife(universe);
        expect(universe[1][1]).toBe(1);
    });
});


// The production source code.
function playTheGameOfLife(universe){
    var surroundedLivingCellsCount = universe[0][0] + universe[0][1] + universe[0][2]
        + universe[1][0]                  + universe[1][2]
        + universe[2][0] + universe[2][1] + universe[2][2];
    if(surroundedLivingCellsCount > 3 || surroundedLivingCellsCount < 2)
        universe[1][1] = 0;
    if(surroundedLivingCellsCount == 3)
        universe[1][1] = 1;
}


/**
 * Created by JFL on 12/9/2014.
 */


// The tests.
it('Cells are created living by default', function() {
    var cell = new Cell();
    expect(cell).not.toBeNull();
    expect(cell.isLiving).toBe(true);
});

it('Cells could be created dead', function() {
    var living = false;
    var cell = new Cell(living);
    expect(cell).not.toBeNull();
    expect(cell.isLiving).toBe(false);
});

it('Cells can discover their direct environment.', function() {
    var cell = new Cell();
    var topLeft = new Cell(true);
    var topCenter = new Cell(false);
    var topRight = new Cell(false);
    var centerLeft = new Cell(false);
    var centerRight = new Cell(false);
    var bottomLeft = new Cell(false);
    var bottomCenter = new Cell(false);
    var bottomRight = new Cell(false);

    cell.discoversDirectEnvironment(topLeft, topCenter, topRight,
        centerLeft, centerRight,
        bottomLeft, bottomCenter, bottomRight);
});

it('A living Cell can live for while but then die when there is less than 2 '
+ 'cells in its direct environment.', function() {
    var cell = new Cell();
    var topLeft = new Cell(true);
    var topCenter = new Cell(false);
    var topRight = new Cell(false);
    var centerLeft = new Cell(false);
    var centerRight = new Cell(false);
    var bottomLeft = new Cell(false);
    var bottomCenter = new Cell(false);
    var bottomRight = new Cell(false);

    cell.discoversDirectEnvironment(topLeft, topCenter, topRight,
        centerLeft, centerRight,
        bottomLeft, bottomCenter, bottomRight);

    cell.livesForAWhile();
    expect(cell.isLiving).toBe(false);
});

it('A living Cell can live for while but then die when there is more than 3 '
+ 'cells in its direct environment.', function() {
    var cell = new Cell();
    var topLeft = new Cell(true);
    var topCenter = new Cell(true);
    var topRight = new Cell(true);
    var centerLeft = new Cell(true);
    var centerRight = new Cell(false);
    var bottomLeft = new Cell(false);
    var bottomCenter = new Cell(false);
    var bottomRight = new Cell(false);

    cell.discoversDirectEnvironment(topLeft, topCenter, topRight,
        centerLeft, centerRight,
        bottomLeft, bottomCenter, bottomRight);

    cell.livesForAWhile();
    expect(cell.isLiving).toBe(false);
});

it('A living Cell can live for while and continue to live when surrounded by 3 living cells '
+ 'cells in its direct environment.', function() {
    var cell = new Cell();
    var topLeft = new Cell(true);
    var topCenter = new Cell(true);
    var topRight = new Cell(true);
    var centerLeft = new Cell(false);
    var centerRight = new Cell(false);
    var bottomLeft = new Cell(false);
    var bottomCenter = new Cell(false);
    var bottomRight = new Cell(false);

    cell.discoversDirectEnvironment(topLeft, topCenter, topRight,
        centerLeft, centerRight,
        bottomLeft, bottomCenter, bottomRight);

    cell.livesForAWhile();
    expect(cell.isLiving).toBe(true);
});

it('A dead Cell can live as zombie for while and live for real when surrounded by 3 living cells '
+ 'cells in its direct environment.', function() {
    var cell = new Cell(false);
    var topLeft = new Cell(true);
    var topCenter = new Cell(true);
    var topRight = new Cell(true);
    var centerLeft = new Cell(false);
    var centerRight = new Cell(false);
    var bottomLeft = new Cell(false);
    var bottomCenter = new Cell(false);
    var bottomRight = new Cell(false);

    cell.discoversDirectEnvironment(topLeft, topCenter, topRight,
        centerLeft, centerRight,
        bottomLeft, bottomCenter, bottomRight);

    cell.livesForAWhile();
    expect(cell.isLiving).toBe(true);
});


function Cell(living)
{
    this.isLiving = true;
    if(living !== undefined)
        this.isLiving = living;
    var self = this;
    var numberOfLivingCellsAround = 0;

    this.discoversDirectEnvironment = function(topLeft, topCenter, topRight,
                                               centerLeft, centerRight,
                                               bottomLeft, bottomCenter, bottomRight){
        numberOfLivingCellsAround = topLeft.isLiving + topCenter.isLiving + topRight.isLiving
        + centerLeft.isLiving + centerRight.isLiving
        + bottomLeft.isLiving + bottomCenter.isLiving + bottomRight.isLiving;
    }

    this.livesForAWhile = function(){
        if(numberOfLivingCellsAround < 2 || numberOfLivingCellsAround > 3)
            self.isLiving = false;
        if(numberOfLivingCellsAround == 3)
            self.isLiving = true;
    }
}

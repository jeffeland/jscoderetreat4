/**
 * Created by JFL on 12/11/2014.
 */

exports.Cell = function(living)
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
/**
 * Created by JFL on 12/11/2014.
 */

exports.playTheGameOfLife = function (universe){
    var surroundedLivingCellsCount = universe[0][0] + universe[0][1] + universe[0][2]
        + universe[1][0]                  + universe[1][2]
        + universe[2][0] + universe[2][1] + universe[2][2];
    if(surroundedLivingCellsCount > 3 || surroundedLivingCellsCount < 2)
        universe[1][1] = 0;
    if(surroundedLivingCellsCount == 3)
        universe[1][1] = 1;
}
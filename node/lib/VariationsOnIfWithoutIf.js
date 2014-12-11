/**
 * Created by JFL on 12/11/2014.
 */
exports.when = function(condition){
    var self = this;
    var _condition = condition;
    var functions = [,];
    functions[0] = doNothing;
    functions[1] = doNothing;

    function doNothing(){
    }

    this.then = function(functionToExecute){
        functions[1] = functionToExecute;
        functions[Number(_condition)]();

        var thenObj = {};
        thenObj.else = function(functionToExecute){
            functions[0] = functionToExecute;
            functions[Number(_condition)]();
        };

        return thenObj;
    };

    return this;
}

exports.whenThenElse = function(condition, thenFunction, elseFunction)
{
    var functions = [,];
    functions[0] = elseFunctionWrapperToManageFalseConditionWhenElseFunctionNotDefined;
    functions[1] = thenFunction;

    function elseFunctionWrapperToManageFalseConditionWhenElseFunctionNotDefined(){
        var functions = [,];
        functions[0] = function doNothing(){};
        functions[1] = elseFunction;

        functions[Number(elseFunction !== undefined && thenFunction !== undefined)]();
    }

    functions[Number(condition)]();
}

exports.Switch = function(condition){
    var self = this;
    this._condition = condition;

    this.Case = function(caseValue, functionToExecute) {
        function doNothing(){}
        var functions = [doNothing,
            doNothing,
            doNothing,
            doNothing,
            doNothing,
            doNothing,
            doNothing,
            doNothing,
            doNothing,
            doNothing,
            doNothing]; // caseValue is maximum 10.

        functions[caseValue] = functionToExecute;
        functions[self._condition]();

        return self;
    }

    return self;
}
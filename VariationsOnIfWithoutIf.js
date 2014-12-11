/**
 * Created by JFL on 12/9/2014.
 */

// #############################################################################
// VERSION 1
// #############################################################################
describe('if without if using return', function(){
    it('then function executed when condition is true', function() {
        var thenFunctionCalled = false;
        when(true).then(function thenFunction(){thenFunctionCalled = true;});
        expect(thenFunctionCalled).toBe(true);
    });

    it('then function not executed when condition is false', function() {
        var thenFunctionCalled = false;
        when(false).then(function thenFunction(){thenFunctionCalled = true;});
        expect(thenFunctionCalled).toBe(false);
    });

    it('else function not executed when condition is true', function() {
        var elseFunctionCalled = false;
        when(true)
            .then(function thenFunction(){})
            .else(function elseFunction(){elseFunctionCalled = true;});
        expect(elseFunctionCalled).toBe(false);
    });

    it('else function executed when condition is false', function() {
        var elseFunctionCalled = false;
        when(false)
            .then(function thenFunction(){})
            .else(function elseFunction(){elseFunctionCalled = true;});
        expect(elseFunctionCalled).toBe(true);
    });

    it('else cannot be called before then', function() {
        expect(when(false).else).toBe(undefined);
    });
});


function when(condition){
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

// #############################################################################
// VERSION 2
// #############################################################################
describe('if without if and without return', function(){
    it('then function executed when condition is true', function() {
        var thenFunctionCalled = false;
        whenThenElse(true, function thenFunction(){thenFunctionCalled = true;});
        expect(thenFunctionCalled).toBe(true);
    });

    it('then function not executed when condition is false', function() {
        var thenFunctionCalled = false;
        whenThenElse(false, function thenFunction(){thenFunctionCalled = true;});
        expect(thenFunctionCalled).toBe(false);
    })

    it('else function not executed when condition is true', function() {
        var elseFunctionCalled = false;
        whenThenElse(true, function thenFunction(){}, function elseFunction(){elseFunctionCalled = true;});
        expect(elseFunctionCalled).toBe(false);
    });

    it('else function executed when condition is false', function() {
        var elseFunctionCalled = false;
        whenThenElse(false, function thenFunction(){}, function elseFunction(){elseFunctionCalled = true;});
        expect(elseFunctionCalled).toBe(true);
    });

    it('else cannot be called when then undefined', function() {
        var elseFunctionCalled = false;
        whenThenElse(false, undefined, function elseFunction(){elseFunctionCalled = true;});
        expect(elseFunctionCalled).toBe(false);
    });
});

function whenThenElse(condition, thenFunction, elseFunction)
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

// #############################################################################
// VERSION 3 - Switch
// #############################################################################
describe('Switch without if or switch', function(){
    it('switch(0) then case(0) is called', function() {
        var case0FunctionCalled = false;
        Switch(0)
            .Case(0,
            function case0Function(){
                case0FunctionCalled = true;});
        expect(case0FunctionCalled).toBe(true);
    });

    it('switch(1) then case(1) is called but not case(0)', function() {
        var case0FunctionCalled = false;
        var case1FunctionCalled = false;
        Switch(1)
            .Case(0,
            function case0Function(){
                case0FunctionCalled = true;})
            .Case(1,
            function case1Function(){
                case1FunctionCalled = true;});
        expect(case0FunctionCalled).toBe(false);
        expect(case1FunctionCalled).toBe(true);
    });

    it('switch(5) then case(5)', function() {
        var case0FunctionCalled = false;
        var case5FunctionCalled = false;
        Switch(5)
            .Case(0,
            function case0Function(){
                case0FunctionCalled = true;})
            .Case(5,
            function case1Function(){
                case5FunctionCalled = true;});
        expect(case0FunctionCalled).toBe(false);
        expect(case5FunctionCalled).toBe(true);
    });
});

function Switch(condition){
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
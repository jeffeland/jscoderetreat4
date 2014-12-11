/**
 * Created by JFL on 12/11/2014.
 */

var assert = require("assert");
var VOIWI = require("../lib/VariationsOnIfWithoutIf.js");

describe('VariationsOnIfWithoutIf.', function() {
    describe('if without if using return', function(){
        it('then function executed when condition is true', function() {
            var thenFunctionCalled = false;
            VOIWI.when(true).then(function thenFunction(){thenFunctionCalled = true;});
            assert.equal(thenFunctionCalled,true);
        });

        it('then function not executed when condition is false', function() {
            var thenFunctionCalled = false;
            VOIWI.when(false).then(function thenFunction(){thenFunctionCalled = true;});
            assert.equal(thenFunctionCalled,false);
        });

        it('else function not executed when condition is true', function() {
            var elseFunctionCalled = false;
            VOIWI.when(true)
                .then(function thenFunction(){})
                .else(function elseFunction(){elseFunctionCalled = true;});
            assert.equal(elseFunctionCalled,false);
        });

        it('else function executed when condition is false', function() {
            var elseFunctionCalled = false;
            VOIWI.when(false)
                .then(function thenFunction(){})
                .else(function elseFunction(){elseFunctionCalled = true;});
            assert.equal(elseFunctionCalled,true);
        });

        it('else cannot be called before then', function() {
            assert.equal(VOIWI.when(false).else,undefined);
        });
    });

    describe('if without if and without return', function(){
        it('then function executed when condition is true', function() {
            var thenFunctionCalled = false;
            VOIWI.whenThenElse(true, function thenFunction(){thenFunctionCalled = true;});
            assert.equal(thenFunctionCalled,true);
        });

        it('then function not executed when condition is false', function() {
            var thenFunctionCalled = false;
            VOIWI.whenThenElse(false, function thenFunction(){thenFunctionCalled = true;});
            assert.equal(thenFunctionCalled,false);
        })

        it('else function not executed when condition is true', function() {
            var elseFunctionCalled = false;
            VOIWI.whenThenElse(true, function thenFunction(){}, function elseFunction(){elseFunctionCalled = true;});
            assert.equal(elseFunctionCalled,false);
        });

        it('else function executed when condition is false', function() {
            var elseFunctionCalled = false;
            VOIWI.whenThenElse(false, function thenFunction(){}, function elseFunction(){elseFunctionCalled = true;});
            assert.equal(elseFunctionCalled,true);
        });

        it('else cannot be called when then undefined', function() {
            var elseFunctionCalled = false;
            VOIWI.whenThenElse(false, undefined, function elseFunction(){elseFunctionCalled = true;});
            assert.equal(elseFunctionCalled,false);
        });
    });

    describe('Switch without if or switch', function () {
        it('switch(0) then case(0) is called', function () {
            var case0FunctionCalled = false;
            VOIWI.Switch(0)
                .Case(0,
                function case0Function() {
                    case0FunctionCalled = true;
                });
            assert.equal(case0FunctionCalled,true);
        });

        it('switch(1) then case(1) is called but not case(0)', function () {
            var case0FunctionCalled = false;
            var case1FunctionCalled = false;
            VOIWI.Switch(1)
                .Case(0,
                function case0Function() {
                    case0FunctionCalled = true;
                })
                .Case(1,
                function case1Function() {
                    case1FunctionCalled = true;
                });
            assert.equal(case0FunctionCalled,false);
            assert.equal(case1FunctionCalled,true);
        });

        it('switch(5) then case(5)', function () {
            var case0FunctionCalled = false;
            var case5FunctionCalled = false;
            VOIWI.Switch(5)
                .Case(0,
                function case0Function() {
                    case0FunctionCalled = true;
                })
                .Case(5,
                function case1Function() {
                    case5FunctionCalled = true;
                });
            assert.equal(case0FunctionCalled,false);
            assert.equal(case5FunctionCalled,true);
        });
    });
});
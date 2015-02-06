'use strict';

describe('Directive: fmqOrderField', function () {

    // load the directive's module
    beforeEach(module('foundersMapQuestApp'));

    var element,
        scope;

    beforeEach(inject(function ($rootScope, $compile) {
        scope = $rootScope.$new();
        scope.ctrl = {
            orderBy: {
                field: 'name',
                reverse: false
            }
        };

        element = angular.element(
            '<fmq-order-field ng-model="ctrl.orderBy" field="foo">Foo</fmq-order-field>'
        );
        element = $compile(element)(scope);
        scope.$digest();
    }));

    it('should transclude the text', inject(function () {
        expect(element.text()).toBe('Foo');
    }));

    it('should have isolatedScope.ctrl', inject(function () {
        expect(element.isolateScope()).toBeDefined();
        expect(element.isolateScope().ctrl).toBeDefined();
    }));

    it('should have orderBy object structure', inject(function () {
        var ctrl = element.isolateScope().ctrl;

        expect(ctrl.orderBy).toBeDefined();
        expect(ctrl.orderBy.field).toBe('name');
        expect(ctrl.orderBy.reverse).toBe(false);
    }));
});

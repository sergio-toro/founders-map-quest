'use strict';

describe('Directive: fmqFileInput', function () {

    // load the directive's module
    beforeEach(module('foundersMapQuestApp'));

    var element,
        scope;

    beforeEach(inject(function ($rootScope, $compile) {
        scope = $rootScope.$new();

        element = angular.element('<fmq-file-input ng-model="ctrl.file">Upload a file</fmq-file-input>');
        element = $compile(element)(scope);
        scope.$digest();
    }));

    it('should transclude the text', inject(function () {
        expect(element.text()).toBe('Upload a file');
    }));

    it('should have isolatedScope.ctrl', inject(function () {
        expect(element.isolateScope()).toBeDefined();
        expect(element.isolateScope().ctrl).toBeDefined();
    }));

    it('should change btnClass', inject(function ($compile) {
        element = angular.element('<fmq-file-input btn-class="\'test-new-class\'" ng-model="ctrl.file">Upload a file</fmq-file-input>');
        element = $compile(element)(scope);
        scope.$digest();

        expect(element.isolateScope()).toBeDefined();
        expect(element.isolateScope().ctrl.btnClass).toBe('test-new-class');
    }));
});

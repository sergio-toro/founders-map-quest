'use strict';

describe('Controller: LoadDataCtrl', function () {

    // load the controller's module
    beforeEach(module('foundersMapQuestApp'));

    var LoadDataCtrl,
        scope;

    // Initialize the controller and a mock scope
    beforeEach(inject(function ($controller, $rootScope) {
        scope = $rootScope.$new();
        LoadDataCtrl = $controller('LoadDataCtrl as ctrl', {
            $scope: scope
        });
    }));

    it('should attach a list of delimiter to the scope', function () {
        expect(scope.ctrl.delimiter).toBe(',');
    });

    it('should attach a list of fieldDelimiters to the scope', function () {
        expect(scope.ctrl.fieldDelimiters.length).toBe(3);
    });

    it('should attach a list of currentPage to the scope', function () {
        expect(scope.ctrl.currentPage).toBe(0);
    });

    it('should attach a list of perPage to the scope', function () {
        expect(scope.ctrl.perPage).toBe(10);
    });

    it('should attach a list of perPageOptions to the scope', function () {
        expect(scope.ctrl.perPageOptions.length).toBe(6);
    });
});

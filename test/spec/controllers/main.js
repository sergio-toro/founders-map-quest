'use strict';

describe('Controller: MainCtrl', function () {

    // load the controller's module
    beforeEach(module('foundersMapQuestApp'));

    var MainCtrl,
        scope;

    // Initialize the controller and a mock scope
    beforeEach(inject(function ($controller, $rootScope) {
        scope = $rootScope.$new();
        MainCtrl = $controller('MainCtrl as ctrl', {
            $scope: scope
        });
    }));

    it('should attach a tab variable to the scope', function () {
        expect(scope.ctrl.tab).toBe('map');
    });

    it('should attach a map variable to the scope', function () {
        expect(scope.ctrl.map).toBeDefined();
    });

    it('should attach a currentPage variable to the scope', function () {
        expect(scope.ctrl.currentPage).toBeDefined();
    });

    it('should attach a perPage variable to the scope', function () {
        expect(scope.ctrl.perPage).toBeDefined();
    });

    it('should attach a perPageOptions variable to the scope', function () {
        expect(scope.ctrl.perPageOptions).toBeDefined();
    });

    it('should attach a filteredData variable to the scope', function () {
        expect(scope.ctrl.filteredData).toBeDefined();
    });

    it('should attach a orderBy variable to the scope', function () {
        expect(scope.ctrl.orderBy).toBeDefined();
    });

    it('should attach a search variable to the scope', function () {
        expect(scope.ctrl.search).toBeDefined();
    });

    it('should attach a searchBy variable to the scope', function () {
        expect(scope.ctrl.searchBy).toBeDefined();
    });

    it('should attach a searchByFields variable to the scope', function () {
        expect(scope.ctrl.searchByFields).toBeDefined();
    });
});

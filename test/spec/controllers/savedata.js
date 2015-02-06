'use strict';

describe('Controller: SavedataCtrl', function () {

    // load the controller's module
    beforeEach(module('foundersMapQuestApp'));

    var SavedataCtrl,
        scope;

    // Initialize the controller and a mock scope
    beforeEach(inject(function ($controller, $rootScope) {
        scope = $rootScope.$new();
        SavedataCtrl = $controller('SavedataCtrl as ctrl', {
            $scope: scope
        });
    }));

    xit('should attach a variable csvCacheId to the scope', function () {
        expect(scope.ctrl.csvCacheId).toBeDefined();
    });

    it('should attach a variable data to the scope', function () {
        expect(scope.ctrl.data).toBeDefined();
        expect(typeof scope.ctrl.data).toBe('object');
    });

    it('should attach a variable data.name to the scope', function () {
        expect(scope.ctrl.data.name).toBeDefined();
    });

    xit('should attach a variable data.hideFieldIndex to the scope', function () {
        expect(scope.ctrl.data.hideFieldIndex).toBeDefined();
    });
});

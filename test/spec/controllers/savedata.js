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

    it('should attach a variable data.hideFieldIndex to the scope.ctrl', function () {
        expect(scope.ctrl.data.hideFieldIndex).toBe(null);
    });
});

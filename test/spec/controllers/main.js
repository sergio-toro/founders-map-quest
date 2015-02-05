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
});

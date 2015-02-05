'use strict';

describe('Controller: ReviewfieldsCtrl', function () {

    // load the controller's module
    beforeEach(module('foundersMapQuestApp'));

    var ReviewfieldsCtrl,
        scope;

    // Initialize the controller and a mock scope
    beforeEach(inject(function ($controller, $rootScope) {
        scope = $rootScope.$new();
        ReviewfieldsCtrl = $controller('ReviewfieldsCtrl as ctrl', {
            $scope: scope
        });
    }));

    it('should attach a variable question to the scope', function () {
        expect(scope.ctrl.question).toBe('is-there-latLng');
    });
});

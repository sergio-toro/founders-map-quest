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

    it('should attach a variable error to the scope', function () {
        expect(scope.ctrl.error).toBeDefined();
    });

    it('should attach a variable csvCacheId to the scope', function () {
        expect(scope.ctrl.csvCacheId).toBeDefined();
    });

    it('should attach a variable data to the scope', function () {
        expect(scope.ctrl.data).toBeDefined();
        expect(typeof scope.ctrl.data).toBe('object');
    });

    it('should attach a variable data.latFieldIndex to the scope', function () {
        expect(scope.ctrl.data.latFieldIndex).toBeDefined();
    });

    it('should attach a variable data.lngFieldIndex to the scope', function () {
        expect(scope.ctrl.data.lngFieldIndex).toBeDefined();
    });

    it('should attach a variable data.addressFieldsIndex to the scope', function () {
        expect(scope.ctrl.data.addressFieldsIndex).toBeDefined();
    });

    it('should attach a variable data.labelFieldIndex to the scope', function () {
        expect(scope.ctrl.data.labelFieldIndex).toBeDefined();
    });
});

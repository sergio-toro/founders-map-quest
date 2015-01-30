'use strict';

describe('Controller: ReviewfieldsCtrl', function () {

  // load the controller's module
  beforeEach(module('foundersMapQuestApp'));

  var ReviewfieldsCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    ReviewfieldsCtrl = $controller('ReviewfieldsCtrl', {
      $scope: scope
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(scope.awesomeThings.length).toBe(3);
  });
});

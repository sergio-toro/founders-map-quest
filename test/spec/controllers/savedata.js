'use strict';

describe('Controller: SavedataCtrl', function () {

  // load the controller's module
  beforeEach(module('foundersMapQuestApp'));

  var SavedataCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    SavedataCtrl = $controller('SavedataCtrl', {
      $scope: scope
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(scope.awesomeThings.length).toBe(3);
  });
});

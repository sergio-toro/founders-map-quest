'use strict';

describe('Directive: fmqFileInput', function () {

  // load the directive's module
  beforeEach(module('foundersMapQuestApp'));

  var element,
    scope;

  beforeEach(inject(function ($rootScope) {
    scope = $rootScope.$new();
  }));

  it('should make hidden element visible', inject(function ($compile) {
    element = angular.element('<fmq-file-input></fmq-file-input>');
    element = $compile(element)(scope);
    expect(element.text()).toBe('this is the fmqFileInput directive');
  }));
});

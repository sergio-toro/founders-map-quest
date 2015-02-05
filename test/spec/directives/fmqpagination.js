'use strict';

describe('Directive: fmqPagination', function () {

  // load the directive's module
  beforeEach(module('foundersMapQuestApp'));

  var element,
    scope;

  beforeEach(inject(function ($rootScope) {
    scope = $rootScope.$new();
  }));

  xit('should make hidden element visible', inject(function ($compile) {
    element = angular.element('<fmq-pagination></fmq-pagination>');
    element = $compile(element)(scope);
    expect(element.text()).toBe('this is the fmqPagination directive');
  }));
});

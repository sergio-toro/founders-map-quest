'use strict';

describe('Directive: fmqTableFooter', function () {

  // load the directive's module
  beforeEach(module('foundersMapQuestApp'));

  var element,
    scope;

  beforeEach(inject(function ($rootScope) {
    scope = $rootScope.$new();
  }));

  xit('should make hidden element visible', inject(function ($compile) {
    element = angular.element('<fmq-table-footer></fmq-table-footer>');
    element = $compile(element)(scope);
    expect(element.text()).toBe('this is the fmqTableFooter directive');
  }));
});

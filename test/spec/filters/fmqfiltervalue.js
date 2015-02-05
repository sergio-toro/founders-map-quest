'use strict';

describe('Filter: fmqFilterValue', function () {

  // load the filter's module
  beforeEach(module('foundersMapQuestApp'));

  // initialize a new instance of the filter before each test
  var fmqFilterValue;
  beforeEach(inject(function ($filter) {
    fmqFilterValue = $filter('fmqFilterValue');
  }));

  it('should return the input prefixed with "fmqFilterValue filter:"', function () {
    var text = 'angularjs';
    expect(fmqFilterValue(text)).toBe('fmqFilterValue filter: ' + text);
  });

});

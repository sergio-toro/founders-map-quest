'use strict';

describe('Service: CsvParser', function () {

  // load the service's module
  beforeEach(module('foundersMapQuestApp'));

  // instantiate service
  var CsvParser;
  beforeEach(inject(function (_CsvParser_) {
    CsvParser = _CsvParser_;
  }));

  it('should do something', function () {
    expect(!!CsvParser).toBe(true);
  });

});

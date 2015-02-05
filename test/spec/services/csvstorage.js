'use strict';

describe('Service: CsvStorage', function () {

  // load the service's module
  beforeEach(module('foundersMapQuestApp'));

  // instantiate service
  var CsvStorage;
  beforeEach(inject(function (_CsvStorage_) {
    CsvStorage = _CsvStorage_;
  }));

  it('should do something', function () {
    expect(!!CsvStorage).toBe(true);
  });

});

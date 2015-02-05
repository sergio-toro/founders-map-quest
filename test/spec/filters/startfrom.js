'use strict';

describe('Filter: startFrom', function () {

    // load the filter's module
    beforeEach(module('foundersMapQuestApp'));

    // initialize a new instance of the filter before each test
    var startFrom;
    beforeEach(inject(function ($filter) {
        startFrom = $filter('startFrom');
    }));

    it('should return the input prefixed with "startFrom filter:"', function () {
        var text = [ 1,2,3,4,5,6,7,8 ];
        expect(startFrom(text, 2).length).toBe(6);
    });

});

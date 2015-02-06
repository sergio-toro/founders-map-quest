'use strict';

describe('Filter: startFrom', function () {

    // load the filter's module
    beforeEach(module('foundersMapQuestApp'));

    // initialize a new instance of the filter before each test
    var startFrom;
    beforeEach(inject(function ($filter) {
        startFrom = $filter('startFrom');
    }));

    it('should return a subset (6 elements) of an array', function () {
        var text = [ 1,2,3,4,5,6,7,8 ];
        expect(startFrom(text, 2).length).toBe(6);
    });

    it('should return a subset (5 elements) of an array', function () {
        var text = [ 1,2,3,4,5,6,7,8 ];
        expect(startFrom(text, 3).length).toBe(5);
    });

    it('should return a empty array', function () {
        var text = [];
        expect(startFrom(text, 3).length).toBe(0);
    });

});

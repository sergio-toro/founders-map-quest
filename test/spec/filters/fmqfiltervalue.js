'use strict';

describe('Filter: fmqFilterValue', function () {

    // load the filter's module
    beforeEach(module('foundersMapQuestApp'));

    // initialize a new instance of the filter before each test
    var fmqFilterValue;
    beforeEach(inject(function ($filter) {
        fmqFilterValue = $filter('fmqFilterValue');
    }));

    it('should return the same input', function () {
        var text = 'angularjs';
        expect(fmqFilterValue(text)).toBe('angularjs');
    });

    it('should return the input as a link', function () {
        var text = 'http://google.com';
        expect(fmqFilterValue(text)).toBe('<a href="http://google.com" target="_blank">http://google.com</a>');
    });

    it('should return the input as image link', function () {
        var text = 'http://google.com/cat.jpg';
        expect(fmqFilterValue(text)).toBe(
            '<a href="http://google.com/cat.jpg" target="_blank"><img src="http://google.com/cat.jpg" title="http://google.com/cat.jpg"/></a>'
        );
    });

});

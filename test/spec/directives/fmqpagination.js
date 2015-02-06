'use strict';

describe('Directive: fmqPagination', function () {

    // load the directive's module
    beforeEach(module('foundersMapQuestApp'));
    beforeEach(module('appTemplates'));

    var element,
        scope;

    beforeEach(inject(function ($rootScope, $compile) {
        scope = $rootScope.$new();
        scope.ctrl = {
            currentPage: 0,
            perPage: 10,
            maxPages: 3,
            totalResults: 73
        };

        element = angular.element(
            '<fmq-pagination ng-model="ctrl.currentPage" per-page="ctrl.perPage" max-pages="ctrl.maxPages" total-results="ctrl.totalResults"></fmq-pagination>'
        );
        element = $compile(element)(scope);
        scope.$digest();
    }));

    it('should make pagination', inject(function () {
        expect(
            element.text()
            .replace(/\n/g, '')
            .replace(/ +/g, ' ')
            .trim()
        ).toBe('« < 1 2 3 ... > »');
    }));
});

'use strict';

describe('Directive: fmqTableFooter', function () {

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
            perPageOptions: [ 10, 20, 30, 50],
            maxPages: 3,
            totalResults: 73
        };

        element = angular.element(
            '<fmq-table-footer per-page="ctrl.perPage" per-page-options="ctrl.perPageOptions" current-page="ctrl.currentPage" max-pages="ctrl.maxPages" total-results="ctrl.filteredData.length"><fmq-table-footer>'
        );
        element = $compile(element)(scope);
        scope.$digest();
    }));

    it('should make full table footer', inject(function () {
        expect(
            element.text()
            .replace(/\n/g, '')
            .replace(/ +/g, ' ')
            .trim()
        ).toBe('Per page 10203050 Showing registers 1 to 10 of totals < 1 2 3 ... >');
    }));
});

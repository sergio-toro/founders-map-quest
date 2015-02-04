(function () {

    'use strict';

    /**
     * @ngdoc directive
     * @name foundersMapQuestApp.directive:fmqTableFooter
     * @description
     * # fmqTableFooter
     */
    angular.module('foundersMapQuestApp')
        .directive('fmqTableFooter', function(){

            function linkFunc(scope) {
                scope.ctrl = scope;

                scope.$watchGroup([ 'ctrl.totalResults', 'ctrl.currentPage', 'ctrl.perPage' ],function() {
                    scope.resultsStart = scope.currentPage*scope.perPage;
                    scope.resultsEnd   = scope.resultsStart + scope.perPage;
                    if (scope.resultsEnd>scope.totalResults){
                        scope.resultsEnd = scope.totalResults;
                    }
                });
            }

            var directive = {
                restrict: 'E',
                templateUrl: 'views/directives/fmqtablefooter.html',
                scope: {
                    currentPage:      '=',
                    maxPages:         '=',
                    perPage:          '=',
                    perPageOptions:   '=',
                    totalResults:     '=',
                    onPerPageChanged: '&',
                    disablePerPage:   '=',
                    disablePageInfo:  '=',
                },
                link: linkFunc,
            };

            return directive;
        });
})();

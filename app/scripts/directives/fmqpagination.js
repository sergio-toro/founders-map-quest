(function () {
    'use strict';

    /**
     * @ngdoc directive
     * @name foundersMapQuestApp.directive:fmqPagination
     * @description
     * # fmqPagination
     */
    angular.module('foundersMapQuestApp')
        .directive('fmqPagination', function () {
            return {
                restrict: 'E',
                templateUrl: 'views/directives/fmqpagination.html',
                require: 'ngModel',
                scope: {
                    perPage:     '=',
                    maxPages:    '=',
                    totalResults: '=',
                },
                link: function(scope, element, attrs, ngModel) {
                    scope.ctrl = scope;

                    scope.$watchGroup(['ctrl.currentPage', 'ctrl.perPage', 'ctrl.totalResults', 'ctrl.maxPages'], function() {
                        scope.init();
                    });

                    // Set render
                    ngModel.$render = function() {
                        if (typeof ngModel.$viewValue==='undefined') {
                            scope.setPage(0);
                        }
                        else {
                            scope.currentPage = ngModel.$viewValue;
                        }
                    };

                    scope.setPage = function(page, disabled) {
                        if (disabled) {
                            return;
                        }
                        else {
                            scope.currentPage = page;
                            ngModel.$setViewValue(page);
                        }
                    };

                    scope.init = function() {
                        scope.perPage      = scope.perPage  || 10;
                        scope.visiblePages = scope.maxPages || 5;
                        scope.totalPages   = Math.ceil(scope.totalResults/scope.perPage);

                        if (scope.visiblePages>scope.totalPages) {
                            scope.visiblePages = scope.totalPages;
                        }

                        scope.startPage = 0;
                        scope.endPage   = scope.currentPage+(Math.ceil(scope.visiblePages/2));

                        if ((scope.endPage*scope.perPage)>scope.totalResults){
                            scope.endPage   = scope.totalPages;
                            scope.startPage = scope.endPage-scope.visiblePages;
                            if (scope.startPage<0) {
                                scope.startPage = 0;
                            }
                        }
                        else {
                            scope.startPage = scope.currentPage-(Math.floor(scope.visiblePages/2));
                            if (scope.startPage<0) {
                                scope.endPage   = scope.endPage + (scope.startPage*-1);
                                scope.startPage = 0;
                            }
                        }

                        scope.pageNumbers = [];
                        for(var i=scope.startPage; i<scope.endPage; i++){
                            scope.pageNumbers.push(i);
                        }
                    };
                }
            };
        })
    ;
})();

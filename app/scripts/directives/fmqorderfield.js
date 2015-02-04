(function () {
    'use strict';

    /**
     * Model structure:
     *     ctrl.orderBy = { field: string, reverse: boolean }
     * Usage:
     *     <fmq-order-field ng-model="ctrl.orderBy" field="id">
     *         Field name
     *     </fmq-order-field>
     *
     * @ngdoc directive
     * @name foundersMapQuestApp.directive:fmqOrderField
     * @description
     * # fmqOrderField
     */
    angular.module('foundersMapQuestApp')
        .directive('fmqOrderField', function () {

            function linkFn (scope, element, attr, ngModel) {
                scope.ctrl    = scope;

                ngModel.$render = function() {
                    if (typeof ngModel.$viewValue==='object') {
                        // Sets view value
                        scope.orderBy = ngModel.$viewValue;
                    }
                };

                scope.orderByChanged = function() {
                    if (!scope.orderBy) {
                        scope.orderBy = {};
                    }

                    if (scope.orderBy.field!==scope.field) {
                        scope.orderBy.field   = scope.field;
                        scope.orderBy.reverse = false;
                    }
                    else {
                        scope.orderBy.reverse = !scope.orderBy.reverse;
                    }

                    // Notify to parent changes
                    ngModel.$setViewValue({
                        field: scope.orderBy.field,
                        reverse: scope.orderBy.reverse
                    });
                };
            }

            return {
                restrict: 'E',
                require: 'ngModel',
                template:   '<button class="btn btn-link" ng-click="ctrl.orderByChanged()">'+
                                '<span ng-transclude></span>'+
                                '<i  ng-show="ctrl.orderBy.field == ctrl.field" class="fa"'+
                                    'ng-class="{'+
                                        '\'fa-caret-up\':   !ctrl.orderBy.reverse,'+
                                        '\'fa-caret-down\': ctrl.orderBy.reverse'+
                                    '}"></i>'+
                            '</button>',
                scope: {
                    field: '@'
                },
                transclude: true,
                link: linkFn
            };
        })
    ;

})();

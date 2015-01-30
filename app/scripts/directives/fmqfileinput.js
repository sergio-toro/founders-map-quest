(function(){

'use strict';

/**
 * @ngdoc directive
 * @name foundersMapQuestApp.directive:fmqFileInput
 * @description
 * # fmqFileInput
 * <fmq-file-input
 *     ng-model="ctrl.file"
 *     btn-class="'btn btn-sm btn-default'"
 *     multiple-files="false"
 *     ng-change="ctrl.uploadImg(ctrl.file)">
 *     <i class="fa-plus-square-o"></i>
 * </fmq-file-input>
 */
angular.module('foundersMapQuestApp')
    .directive('fmqFileInput', function () {
        return {
            restrict: 'E',
            require: 'ngModel',
            template:   '<input type="file" ng-if="!ctrl.multipleFiles" style="display: none;" />'+
                        '<input type="file" ng-if="ctrl.multipleFiles"  style="display: none;" multiple />'+
                        '<button class="{{ctrl.btnClass}}" ng-click="ctrl.selectFile()" ng-transclude></button>',
            scope: {
                btnClass: '=',
                multipleFiles: '=',
            },
            transclude: true,
            link: function(scope, element, attr, ngModel) {
                scope.element = element;

                element.bind('change', function onFileSelected(evt) {
                    var files = evt.__files_ || evt.target.files;

                    if (scope.multipleFiles) {
                        ngModel.$setViewValue(files);
                    }
                    else {
                        ngModel.$setViewValue(files[0]);
                    }
                });
            },
            controllerAs: 'ctrl',
            controller: function($scope) {
                var self = this;

                self.btnClass      = $scope.btnClass      || 'btn btn-sm btn-default';
                self.multipleFiles = $scope.multipleFiles || false;

                self.selectFile = function() {
                    $scope.element.find('input[type="file"]').click();
                };
            }
        };
    });
})();

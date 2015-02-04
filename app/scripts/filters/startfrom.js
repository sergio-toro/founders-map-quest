(function () {
    'use strict';

    /**
     * @ngdoc filter
     * @name foundersMapQuestApp.filter:startFrom
     * @function
     * @description
     * # startFrom
     * Filter in the foundersMapQuestApp.
     */
    angular.module('foundersMapQuestApp')
        .filter('startFrom', function() {
            return function (input, start) {
                if (input) {
                    start = +start; //parse to int
                    return input.slice(start);
                }
            };
        })
    ;

})();

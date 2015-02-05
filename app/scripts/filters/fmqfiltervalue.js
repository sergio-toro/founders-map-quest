(function () {
    'use strict';

    /**
     * @ngdoc filter
     * @name foundersMapQuestApp.filter:fmqFilterValue
     * @function
     * @description
     * # fmqFilterValue
     * Filter in the foundersMapQuestApp.
     */
    angular.module('foundersMapQuestApp')
        .filter('fmqFilterValue', function () {

            function isImage(input) {
                return (input.match(/\.(jpeg|jpg|gif|png)$/)!==null);
            }

            // Source from http://stackoverflow.com/questions/5717093/check-if-a-javascript-string-is-an-url
            function isUrl(str) {
                var pattern = new RegExp(
                    '^(https?:\\/\\/)?'+ // protocol
                    '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|'+ // domain name
                    '((\\d{1,3}\\.){3}\\d{1,3}))'+ // OR ip (v4) address
                    '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*'+ // port and path
                    '(\\?[;&a-z\\d%_.~+=-]*)?'+ // query string
                    '(\\#[-a-z\\d_]*)?$',
                    'i'
                ); // fragment locater
                if (pattern.test(str)) {
                    return true;
                }
                else {
                    return false;
                }
            }

            function applyFilter(input) {
                if (angular.isNumber(input)) {
                    return input;
                }
                else if (isUrl(input)) {
                    var linkContent = input;

                    if (isImage(input)) {
                        linkContent = '<img src="'+input+'" title="'+input+'"/>';
                    }

                    return '<a href="'+input+'" target="_blank">'+linkContent+'</a>';
                }
                else {
                    return input;
                }
            }

            return applyFilter;
        })
    ;

})();

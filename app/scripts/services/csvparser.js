(function() {
    'use strict';

    /**
     * @ngdoc service
     * @name foundersMapQuestApp.CsvParser
     * @description
     * # CsvParser
     * Service in the foundersMapQuestApp.
     */
    angular.module('foundersMapQuestApp')
        .service('CsvParser', function () {
            this.parse = function(csvString, delimiter) {
                delimiter = delimiter || ''; // Default autodetect

                // Use Papa library to parse csv
                var
                    heading = [],
                    results = window.Papa.parse(csvString, {
                    delimiter: delimiter
                });

                if (!results.errors.length) {
                    heading = (results.data.splice(0, 1))[0];

                    for (var i = heading.length - 1; i >= 0; i--) {
                        heading[i] = heading[i].trim();
                    }
                }

                return {
                    heading: heading,
                    data: results.data
                };
            };
        });
})();

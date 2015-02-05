(function(){

    'use strict';

    var LoadDataCtrl = function($scope, $location, CsvParser, CsvStorage) {
        var self = this;

        self.$scope              = $scope;
        self.$location           = $location;
        self.CsvParser           = CsvParser;
        self.CsvStorage          = CsvStorage;

        self.delimiter           = ',';
        self.fieldDelimiters     = [
            { name: ',',   value: ',' },
            { name: ';',   value: ';' },
            { name: 'tab', value: '\t' },
        ];

        self.currentPage         = 0;
        self.perPage             = 10;
        self.perPageOptions      = [ 10, 25, 50, 75, 100, 500 ];

        self.filteredData        = [];
    };

    LoadDataCtrl.prototype.filterData = function() {
        var self = this;

        var filteredData = self.data.data;

        self.currentPage  = 0;
        self.filteredData = filteredData;
    };

    LoadDataCtrl.prototype.generateUniqId = function() {
        return (new Date().getTime()).toString(16);
    };

    LoadDataCtrl.prototype.goReviewFields = function(csvCacheId) {
        var self = this;

        if (csvCacheId) {
            self.$location.path('/review-fields/'+csvCacheId);
        }
    };

    LoadDataCtrl.prototype.parseCsv = function() {
        var self = this;

        self.data       = self.CsvParser.parse(self.csvData, self.delimiter);
        self.csvCacheId = self.generateUniqId();

        // Store in localStorage for next route
        self.CsvStorage.storeTempCsv(
            self.csvCacheId,
            self.data
        );

        self.filterData();
    };

    LoadDataCtrl.prototype.loadCSVFile = function(csvFile) {
        var self = this;

        // define reader
        var reader = new FileReader();

        // A handler for the load event (just defining it, not executing it right now)
        reader.onload = function() {
            self.$scope.$apply(function() {
                self.csvData = reader.result;

                self.parseCsv();
            });
        };

        // use reader to read the selected file
        // when read operation is successfully finished the load event is triggered
        // and handled by our reader.onload function
        reader.readAsText(csvFile);
    };

    /**
     * @ngdoc function
     * @name foundersMapQuestApp.controller:LoadDataCtrl
     * @description
     * # LoadDataCtrl
     * Controller of the foundersMapQuestApp
     */
    angular.module('foundersMapQuestApp')
        .controller('LoadDataCtrl', LoadDataCtrl);
})();

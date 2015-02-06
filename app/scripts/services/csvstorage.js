(function () {
    'use strict';

    var CsvStorageService = function (localStorageService) {
        var self = this;

        self.storedCsvListCacheId = 'stored-csv-list';
        self.data = {
            csvList: localStorageService.get(self.storedCsvListCacheId)
        };

        if (!self.data.csvList) {
            self.data.csvList = [];
        }

        self.localStorageService = localStorageService;
    };

    CsvStorageService.prototype.getCsv = function(csvCacheId) {
        var self = this;

        if (!csvCacheId) {
            return;
        }

        return self.localStorageService.get(csvCacheId);
    };

    CsvStorageService.prototype.storeCsv = function(csvCacheId, csvData) {
        var self = this;

        if (!csvCacheId) {
            return;
        }

        return self.localStorageService.set(csvCacheId, csvData);
    };

    CsvStorageService.prototype.removeCsv = function(csvCacheId) {
        var self = this;

        if (!csvCacheId) {
            return;
        }

        return self.localStorageService.remove(csvCacheId);
    };

    //////////////////////// CSV List //////////////////////////////////////////

    CsvStorageService.prototype.updateCsvList = function(csvCacheId, csvData) {
        var self = this;

        if (!csvCacheId || !csvData.name) {
            throw 'Csv data should have a name property';
        }

        // check if it's already saved
        var isNewInList = true;
        for (var i = self.data.csvList.length - 1; i >= 0; i--) {
            if (self.data.csvList[i].csvCacheId===csvCacheId) {
                self.data.csvList[i].name = csvData.name;
                isNewInList = false;
                break;
            }
        }

        // Check new saved item
        if (isNewInList) {
            self.data.csvList.push({
                name: csvData.name,
                csvCacheId: csvCacheId
            });
        }

        // update local storage list
        self.localStorageService.set(
            self.storedCsvListCacheId,
            self.data.csvList
        );
    };

    CsvStorageService.prototype.removeCsvFromList = function(csvCacheId) {
        var self = this;

        for (var i = self.data.csvList.length - 1; i >= 0; i--) {
            if (self.data.csvList[i].csvCacheId===csvCacheId) {
                self.data.csvList.splice(i, 1); // Remove item from
                break;
            }
        }

        // update local storage list
        self.localStorageService.set(
            self.storedCsvListCacheId,
            self.data.csvList
        );
    };

    /**
     * @ngdoc service
     * @name foundersMapQuestApp.CsvStorage
     * @description
     * # CsvStorage
     * Factory in the foundersMapQuestApp.
     */
    angular.module('foundersMapQuestApp')
        .factory('CsvStorage', function(localStorageService) {
            var CsvStorage = new CsvStorageService(localStorageService);

            return {
                data: CsvStorage.data,
                getCsv: function(csvCacheId) {
                    return CsvStorage.getCsv(csvCacheId);
                },
                storeCsv: function(csvCacheId, csvData) {
                    var result = CsvStorage.storeCsv(csvCacheId, csvData);
                    CsvStorage.updateCsvList(csvCacheId, csvData);
                    return result;
                },
                storeTempCsv: function(csvCacheId, csvData) {
                    return CsvStorage.storeCsv(csvCacheId, csvData);
                },
                removeCsv: function(csvCacheId){
                    var result = CsvStorage.removeCsv(csvCacheId);
                    CsvStorage.removeCsvFromList(csvCacheId);
                    return result;
                },
                clear: function() {
                    for (var i = CsvStorage.data.csvList.length - 1; i >= 0; i--) {
                        CsvStorage.removeCsv(CsvStorage.data.csvList[i].csvCacheId);
                        CsvStorage.removeCsvFromList(CsvStorage.data.csvList[i].csvCacheId);
                    }
                },
            };
        })
    ;

})();

'use strict';

describe('Service: CsvStorage', function () {

    // load the service's module
    beforeEach(module('foundersMapQuestApp'));

    // instantiate service
    var CsvStorage;
    beforeEach(inject(function (_CsvStorage_) {
        CsvStorage = _CsvStorage_;
        CsvStorage.clear();
    }));

    it('should have a CsvStorage.data.csvList property', function () {
        expect(CsvStorage.data).toBeDefined();
        expect(typeof CsvStorage.data).toBe('object');

        expect(CsvStorage.data.csvList).toBeDefined();
        expect(CsvStorage.data.csvList.length).toBe(0);
    });

    it('should have a getCsv function', function () {
        expect(CsvStorage.getCsv).toBeDefined();
        expect(typeof CsvStorage.getCsv).toBe('function');
    });

    it('should have a storeCsv function', function () {
        expect(CsvStorage.storeCsv).toBeDefined();
        expect(typeof CsvStorage.storeCsv).toBe('function');
    });

    it('should have a storeTempCsv function', function () {
        expect(CsvStorage.storeTempCsv).toBeDefined();
        expect(typeof CsvStorage.storeTempCsv).toBe('function');
    });

    it('should have a removeCsv function', function () {
        expect(CsvStorage.removeCsv).toBeDefined();
        expect(typeof CsvStorage.removeCsv).toBe('function');
    });

    it('should have a clear function', function () {
        expect(CsvStorage.clear).toBeDefined();
        expect(typeof CsvStorage.clear).toBe('function');
    });

    it('should store a csv in csvList', function () {
        expect(CsvStorage.storeCsv('key', { name: 'bar' })).toBe(true);
        expect(CsvStorage.getCsv('key')).toEqual({ name: 'bar' });
        expect(CsvStorage.data.csvList.length).toBe(1);
    });

    it('should remove a csv from csvList', function () {
        expect(CsvStorage.storeCsv('key', { name: 'bar' })).toBe(true);
        expect(CsvStorage.getCsv('key')).toEqual({ name: 'bar' });
        expect(CsvStorage.data.csvList.length).toBe(1);

        expect(CsvStorage.removeCsv('key')).toBe(true);
        expect(CsvStorage.getCsv('key')).toBe(null);
        expect(CsvStorage.data.csvList.length).toBe(0);
    });

    it('should store a temporal csv', function () {
        expect(CsvStorage.storeTempCsv('key2', { name: 'bar' })).toBe(true);
        expect(CsvStorage.getCsv('key2')).toEqual({ name: 'bar' });
        expect(CsvStorage.data.csvList.length).toBe(0);
    });

});

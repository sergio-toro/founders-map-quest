'use strict';

describe('Service: CsvParser', function () {

    // load the service's module
    beforeEach(module('foundersMapQuestApp'));

    // instantiate service
    var CsvParser;
    var csvSample = 'Id,Company Name,Founder,City,Country,Postal Code, Street,Photo,Home Page,Garage Latitude,Garage Longitude'+'\n'+
        '1,Google,Larry Page & Sergey Brin,Mountain View,USA,CA 94043,1600 Amphitheatre Pkwy,http://interviewsummary.com/wp-content/uploads/2013/07/larry-page-and-sergey-brin-of-google-620x400.jpg,http://google.com,37.457674,-122.163452'+'\n'+
        '2,Apple,Steve Jobs & Steve Wozniak,Cupertino,USA,CA 95014,1 Infinite Loop,http://i.dailymail.co.uk/i/pix/2013/02/08/article-2275512-172E13BB000005DC-732_634x505.jpg,http://apple.com,37.3403188,-122.0581469'+'\n'+
        '3,Microsoft,Bill Gates,Redmond,USA,WA 98052-7329,One Microsoft Way,http://postdefiance.com/wp-content/uploads/2013/02/bill-gates-microsoft-young.jpg,http://microsoft.com,37.472189,-122.190191'
    ;
    beforeEach(inject(function (_CsvParser_) {
        CsvParser = _CsvParser_;
    }));

    it('should have a parse function', function () {

        expect(CsvParser.parse).toBeDefined();
        expect(typeof CsvParser.parse).toBe('function');
    });

    it('should parse a csv', function () {
        expect(typeof CsvParser.parse(csvSample)).toBe('object');
    });

    it('should have a heading variable', function () {
        var result = CsvParser.parse(csvSample);
        expect(result.heading).toBeDefined();
        expect(result.heading).toEqual(['Id', 'Company Name', 'Founder', 'City', 'Country', 'Postal Code', 'Street', 'Photo', 'Home Page', 'Garage Latitude', 'Garage Longitude']);
    });

    it('should have a data variable', function () {
        var result = CsvParser.parse(csvSample);

        expect(result.data).toBeDefined();
        expect(result.data).toEqual([['1', 'Google', 'Larry Page & Sergey Brin', 'Mountain View', 'USA', 'CA 94043', '1600 Amphitheatre Pkwy', 'http://interviewsummary.com/wp-content/uploads/2013/07/larry-page-and-sergey-brin-of-google-620x400.jpg', 'http://google.com', '37.457674', '-122.163452'], ['2', 'Apple', 'Steve Jobs & Steve Wozniak', 'Cupertino', 'USA', 'CA 95014', '1 Infinite Loop', 'http://i.dailymail.co.uk/i/pix/2013/02/08/article-2275512-172E13BB000005DC-732_634x505.jpg', 'http://apple.com', '37.3403188', '-122.0581469'], ['3', 'Microsoft', 'Bill Gates', 'Redmond', 'USA', 'WA 98052-7329', 'One Microsoft Way', 'http://postdefiance.com/wp-content/uploads/2013/02/bill-gates-microsoft-young.jpg', 'http://microsoft.com', '37.472189', '-122.190191']]);
    });

    it('should have a heading variable (delimiter `;`)', function () {
        var result = CsvParser.parse(csvSample, ';');
        expect(result.heading).toBeDefined();
        expect(result.heading).toEqual([ 'Id,Company Name,Founder,City,Country,Postal Code, Street,Photo,Home Page,Garage Latitude,Garage Longitude' ]);
    });

    it('should have a data variable (delimiter `tab`)', function () {
        var result = CsvParser.parse(csvSample, '\t');

        expect(result.data).toBeDefined();
        expect(result.data).toEqual([ [ '1,Google,Larry Page & Sergey Brin,Mountain View,USA,CA 94043,1600 Amphitheatre Pkwy,http://interviewsummary.com/wp-content/uploads/2013/07/larry-page-and-sergey-brin-of-google-620x400.jpg,http://google.com,37.457674,-122.163452' ], [ '2,Apple,Steve Jobs & Steve Wozniak,Cupertino,USA,CA 95014,1 Infinite Loop,http://i.dailymail.co.uk/i/pix/2013/02/08/article-2275512-172E13BB000005DC-732_634x505.jpg,http://apple.com,37.3403188,-122.0581469' ], [ '3,Microsoft,Bill Gates,Redmond,USA,WA 98052-7329,One Microsoft Way,http://postdefiance.com/wp-content/uploads/2013/02/bill-gates-microsoft-young.jpg,http://microsoft.com,37.472189,-122.190191' ] ]);
    });

    it('should have a heading variable (delimiter `tab`)', function () {
        var result = CsvParser.parse(csvSample, '\t');
        expect(result.heading).toBeDefined();
        expect(result.heading).toEqual([ 'Id,Company Name,Founder,City,Country,Postal Code, Street,Photo,Home Page,Garage Latitude,Garage Longitude' ]);
    });

    it('should have a data variable (delimiter `;`)', function () {
        var result = CsvParser.parse(csvSample, ';');

        expect(result.data).toBeDefined();
        expect(result.data).toEqual([ [ '1,Google,Larry Page & Sergey Brin,Mountain View,USA,CA 94043,1600 Amphitheatre Pkwy,http://interviewsummary.com/wp-content/uploads/2013/07/larry-page-and-sergey-brin-of-google-620x400.jpg,http://google.com,37.457674,-122.163452' ], [ '2,Apple,Steve Jobs & Steve Wozniak,Cupertino,USA,CA 95014,1 Infinite Loop,http://i.dailymail.co.uk/i/pix/2013/02/08/article-2275512-172E13BB000005DC-732_634x505.jpg,http://apple.com,37.3403188,-122.0581469' ], [ '3,Microsoft,Bill Gates,Redmond,USA,WA 98052-7329,One Microsoft Way,http://postdefiance.com/wp-content/uploads/2013/02/bill-gates-microsoft-young.jpg,http://microsoft.com,37.472189,-122.190191' ] ]);
    });

});

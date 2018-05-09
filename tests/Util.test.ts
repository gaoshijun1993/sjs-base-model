import {Util} from '../src/Util';
import {ConversionTypeEnum, IConversionOption} from '../src';

describe('Util', () => {

    let json: any = null;

    beforeEach(() => {
        json = {
            make: 'Tesla',
            model: 'Model S',
            YeAr: 2014,
            feature: {
                abs: true,
                airbags: true
            },
            colors: [{id: 'red', name: 'Red'}, {id: 'white', name: 'White'}]
        };
    });


    it('Util.uniqueId()', () => {
        const expected: number = 1;
        const actual: number = Util.uniqueId();

        expect(expected).toEqual(actual);
    });

    it('Util.deletePropertyFromObject()', () => {
        const obj: any = { name: 'Robert', gender: 'male', phone: '555-555-5555' };
        const expected: any = {name: 'Robert'};
        const actual: any = Util.deletePropertyFromObject(obj, ['phone', 'gender']);

        expect(expected).toEqual(actual);
    });

    it('Util.clone()', () => {
        const expected: any = json;
        const actual: any = Util.clone(json);

        expect(expected).toEqual(actual);
    });

    it('Util.clone() and rename', () => {
        const expected: any = {
            the_make: 'Tesla',
            the_model: 'Model S',
            the_YeAr: 2014,
            the_feature: {
                the_abs: true,
                the_airbags: true
            },
            the_colors: [{the_id: 'red', the_name: 'Red'}, {the_id: 'white', the_name: 'White'}]
        };
        const actual: any = Util.clone(json, (propertyName: string) => {
            return `the_${propertyName}`;
        });

        expect(expected).toEqual(actual);
    });

    it('Util.toBoolean()', () => {
        expect(Util.toBoolean(1)).toBeTruthy();
        expect(Util.toBoolean('1')).toBeTruthy();
        expect(Util.toBoolean(true)).toBeTruthy();
        expect(Util.toBoolean('true')).toBeTruthy();
        expect(Util.toBoolean('text')).toBeTruthy();
        expect(Util.toBoolean('null')).toBeTruthy();
        expect(Util.toBoolean('undefined')).toBeTruthy();

        expect(Util.toBoolean('FALSE')).toBeFalsy();
        expect(Util.toBoolean('false')).toBeFalsy();
        expect(Util.toBoolean('off')).toBeFalsy();
        expect(Util.toBoolean(0)).toBeFalsy();
        expect(Util.toBoolean('0')).toBeFalsy();
        expect(Util.toBoolean(null)).toBeFalsy();
        expect(Util.toBoolean(undefined)).toBeFalsy();
        expect(Util.toBoolean(false)).toBeFalsy();
    });

    it('Util.convertDataToType()', () => {
        expect(Util.convertDataToType(1.02323, ConversionTypeEnum.Number)).toEqual(1);
        expect(Util.convertDataToType(1, ConversionTypeEnum.Number)).toEqual(1);
        expect(Util.convertDataToType('1', ConversionTypeEnum.Number)).toEqual(1);

        expect(Util.convertDataToType('1', ConversionTypeEnum.Boolean)).toEqual(true);
        expect(Util.convertDataToType(0, ConversionTypeEnum.Boolean)).toEqual(false);
        expect(Util.convertDataToType('0', ConversionTypeEnum.Boolean)).toEqual(false);
        expect(Util.convertDataToType('FALSE', ConversionTypeEnum.Boolean)).toEqual(false);

        expect(Util.convertDataToType('01.02', ConversionTypeEnum.Float)).toEqual(1.02);
        expect(Util.convertDataToType(1, ConversionTypeEnum.Float)).toEqual(1);
        expect(Util.convertDataToType(2222.22222222, ConversionTypeEnum.Float)).toEqual(2222.22222222);
    });

    it('Util.convertDataUsingOptions()', () => {
        let data: object = {
            stringToFloat: '23.345',
            stringToNumber: '23.345',
            stringToFalse: '0',
            stringToTrue: '1',
            noChange: '8',
        };
        const conversionOptions: IConversionOption = {
            stringToFloat: ConversionTypeEnum.Float,
            stringToNumber: ConversionTypeEnum.Number,
            stringToFalse: ConversionTypeEnum.Boolean,
            stringToTrue: ConversionTypeEnum.Boolean,
        };

        Util.convertDataUsingOptions(data, conversionOptions);

        expect(data).toEqual({
            stringToFloat: 23.345,
            stringToNumber: 23,
            stringToFalse: false,
            stringToTrue: true,
            noChange: '8',
        });
    });

});

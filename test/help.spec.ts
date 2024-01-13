import {matchDate} from '../src/utils/help.functions';
import {expect} from 'chai';

describe('Testing regex',() => {
    it('See if input is date', () => {
        let str = "2023-03-28T00:45:00Z";
        let ret = matchDate(str)
        expect(ret).to.equal(str)
    });

    it('See if fails when non date string is passed', () => {
        let str = "30ssdfs";

        try
        {
            matchDate(str)
            expect.fail()
        } catch(e){}
    });

    it('See if 0 passes as 0', () => {
        let val = "0";
        let ret = matchDate(val)
        expect(ret).to.equal("0");
    });

    it('See if a bigger date than today\'s fails', () => {
        let str = "9999-03-28T00:45:00Z"
        try
        {
            matchDate(str)
            expect.fail()
        } catch(e){}
    });

    it('See if integer value is transformed', () => {
        let val = "15";
        let ret = matchDate(val)
        expect(ret).to.equal("-15m");
    });

});
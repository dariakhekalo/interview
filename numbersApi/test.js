const env = "http://numbersapi.com";
const request = require('supertest');
const expect = require('chai').expect;

const hostHeader = ['Host', 'numbersapi.com'];
let listOfDates = [];

describe('create and check Array with date and month', () => {

    it('get responses and create an array ', done => {
            for (let i = 0; i < 100; i++) {
                request(env)
                    .get('/random/year')
                    .set('content-type', 'application/x-www-form-urlencoded')
                    .set(hostHeader)
                    .end((err, res) => {
                        let getDates = res.text.match(/(January | February | March | April | May | June | July | August | September | October | November | December)(\d+[a-z]+)/ig);
                        let getDatesString = (getDates == null) ? '' : getDates.join(" ")
                        listOfDates.push(getDatesString)
                        listOfDates = listOfDates.filter(Boolean)
                    })
            }
        }
    );

    it('assertions: check that array has more than 5 elements', function () {
        console.log("newArray=", listOfDates)
        expect(listOfDates).to.have.length.above(5);
    });

    it('assertions: check that array is empty', function () {
        expect(listOfDates).to.have.length(0);
    });


    it('assertions: check that array is not empty', function () {
        expect(listOfDates).to.be.not.empty;
    });

    it('assertions: check that array element has >=10 symbols', function () {
        for (let i = 0; i < listOfDates.length; i++) {
            expect(listOfDates[i]).to.have.length.above(10)
        }
    });
});


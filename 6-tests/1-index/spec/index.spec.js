const calculator = require('../index');


describe("Calculator module", function () {

    it("should know how to add", function () {
        expect(calculator.add(4, 3)).toBe(7);
        expect(calculator.add(3, 2)).toBe(5);
        expect(calculator.add(-2, 2)).toBe(0);
    });

    it("should know how to multiply", function () {
        expect(calculator.multiply(4, 4)).toBe(16);
        expect(calculator.multiply(3, 2)).toBe(6);
        expect(calculator.multiply(-2, 2)).toBe(-4);
    });


    it("should know how to add async", function (next) {
        calculator.addAsync(4, 3).then(res=> {
            expect(res).toBe(2);
            next();
        });
    });

});
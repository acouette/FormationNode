const {play} = require('../hanged');

describe("Hanged test suite", function () {
    it("should discover 2 missing letter", function () {

        const state = {
            wordToGuess: 'maisons',
            currentProgress: 'm******',
            errors: 4
        };

        const newState = play(state, 'o');

        expect(newState).toEqual({
            wordToGuess: 'maisons',
            currentProgress: 'm***o**',
            errors: 4
        });
    });

    it("should discover a missing letter", function () {

        const state = {
            wordToGuess: 'maisons',
            currentProgress: 'm******',
            errors: 4
        };

        const newState = play(state, 's');

        expect(newState).toEqual({
            wordToGuess: 'maisons',
            currentProgress: 'm**s**s',
            errors: 4
        });
    });

    it("should discover increment the error count if the letter does not match", function () {

        const state = {
            wordToGuess: 'maisons',
            currentProgress: 'm******',
            errors: 4
        };

        const newState = play(state, 'z');

        expect(newState).toEqual({
            wordToGuess: 'maisons',
            currentProgress: 'm******',
            errors: 5
        });
    });
});
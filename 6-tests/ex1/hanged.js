const play = (state, letter) => {

    let newCurrentProgress = '';
    let match = false;
    for (let i = 0; i < state.wordToGuess.length; i++) {
        if (state.wordToGuess.charAt(i) === letter && state.currentProgress.charAt(i) === '*') {
            newCurrentProgress += letter;
            match = true;
        } else {
            newCurrentProgress += state.currentProgress.charAt(i);
        }
    }


    return {
        wordToGuess: state.wordToGuess,
        currentProgress: newCurrentProgress,
        errors: !match ? state.errors + 1 : state.errors
    };
};

exports.play = play;


let state = {
    wordToGuess: 'maisons',
    currentProgress: '*******'
};


const readline = require('readline');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});


let iteration = 0;

rl.on('line', (input) => {
    iteration++;

    if (iteration === 1) {
        state = {
            wordToGuess: input,
            currentProgress: input.split('').map(c=> '*').join(''),
            errors: 0,
        }
    }else{
        state = play(state, input);
        if (state.wordToGuess === state.currentProgress) {
            console.log('you win');
            process.exit(0);
        }else if(state.errors === 8){
            console.log('you lose');
            process.exit(1);
        }
    }

    console.log('current word : ' + state.currentProgress);

});


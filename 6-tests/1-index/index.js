module.exports = {

    add: (a, b)=> {
        return a + b;
    },
    multiply: (a, b)=>a * b,
    addAsync: (a, b)=> new Promise((resolve, reject)=> {
        setTimeout(()=> resolve(a + b), 1000);
    })
};



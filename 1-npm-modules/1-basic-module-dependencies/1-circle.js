//export 2 functions

//methode 1
exports.area = r => Math.PI * r ** 2;
exports.circumference = r => Math.PI * 2 * r;


//méthode 2
module.exports = {
    area: r => Math.PI * r ** 2,
    circumference:  r => Math.PI * 2 * r
}
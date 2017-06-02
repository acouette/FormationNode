/*(function(exports, require, module, __filename, __dirname) {
 // Module code actually lives in here
 });*/

//export only on function

//cela ne fait rien car modifie le parametre
exports = width => width ** 2;

//faire cela pour modifier la propriété du module
module.exports = width => width ** 2;


